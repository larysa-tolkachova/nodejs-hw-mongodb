import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UserModel } from '../models/user.js';

export const registrUser = async (payload) => {
  const user = await UserModel.findOne({ email: payload.email });
  //перевіряє чи є такий email в db
  if (user !== null) {
    throw new createHttpError.Conflict('Email in use');
  }

  //hash-password
  payload.password = await bcrypt.hash(payload.password, 10);

  return UserModel.create(payload);
};
