// import crypto from 'node:crypto'; //модуль для роботи з криптографією

import * as fs from 'node:fs';
import path from 'node:path';

import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendMail.js';

import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/sessions.js';

import {
  FIFTEEN_MINUTES,
  THIRTY_DAY,
  cryptoAccessToken,
  cryptoRefreshToken,
} from '../constsnts/session.js';

//registr user
export const registrUser = async (payload) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (user !== null) {
    throw new createHttpError.Conflict('Email in use'); //перевіряє чи є такий email в db
  }

  payload.password = await bcrypt.hash(payload.password, 10); //hash-password

  return UserModel.create(payload);
};

//login user
export const loginUser = async (email, password) => {
  //перевірка наявності користувача в базі
  const user = await UserModel.findOne({ email });
  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  const isEqual = await bcrypt.compare(password, user.password); // Порівнюємо хеші паролів від користувача та з db

  if (isEqual !== true) {
    throw createHttpError(401, 'Email or password is incorrect'); //Unauthorized
  }

  await SessionModel.deleteOne({ userId: user._id });

  // const accessToken = crypto.randomBytes(30).toString('base64');
  // const refreshToken = crypto.randomBytes(30).toString('base64');

  //створення session
  return SessionModel.create({
    userId: user._id,
    accessToken: cryptoAccessToken,
    refreshToken: cryptoRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};

// logout user
export const logoutUser = async (sessionId) => {
  await SessionModel.deleteOne({ _id: sessionId });
};

// refresh
export const refreshSession = async (sessionId, refreshToken) => {
  const session = await SessionModel.findOne({ _id: sessionId }); //по id шукаємо

  if (session === null) {
    throw new createHttpError.Unauthorized('Session not found'); //сессію перевіряємо
  }

  if (session.refreshToken !== refreshToken) {
    throw new createHttpError.Unauthorized('Refresh token is invalid'); //перевіряємо токен
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw new createHttpError.Unauthorized('Refresh token is expired'); //перевіряємо термін дії токена
  }

  await SessionModel.deleteOne({ _id: session._id }); //видаляємо поточну сесію

  // const newAccessToken = crypto.randomBytes(30).toString('base64');
  // const newRefreshToken = crypto.randomBytes(30).toString('base64');

  //створення new session
  return SessionModel.create({
    userId: session.userId,
    accessToken: cryptoAccessToken,
    refreshToken: cryptoRefreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
};

//=========================================================================

//запит скидання паролю
const RESET_PASSWORD_TEMPLATE = fs.readFileSync(
  path.resolve('src', 'templates', 'reset-password.hbs'),
  'UTF-8',
); // зчитали файл шаблону

export const requestResetPassword = async (email) => {
  const user = await UserModel.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const html = Handlebars.compile(RESET_PASSWORD_TEMPLATE); //створення повідомлення за шаблоном

  const token = jwt.sign(
    { sub: user._id, name: user.name },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '5m' },
  ); //створення внутрішнього token - підписує дані які йому передають

  //формуємо повідомлення
  await sendEmail(
    user.email,
    'Reset password',
    html({ link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${token}` }),
  );
};
// link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${token}`;   // `http://localhost:3000/auth/reset-password?token=${token}`

//заміна паролю
export const resetPassword = async (password, token) => {
  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));

    const user = await UserModel.findById(decoded.sub);

    if (user === null) {
      throw createHttpError(404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10); //hash-password new

    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }); //змінюємо пароль в DB
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw createHttpError(401, 'Token is unauthorized');
    }

    if (error.name === 'TokenExpiredError') {
      throw createHttpError(401, 'Token is expired');
    }

    throw error;
  }
};
