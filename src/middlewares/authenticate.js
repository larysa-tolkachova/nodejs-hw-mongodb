import createHttpError from 'http-errors';

import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/sessions.js';

export const authenticate = async (req, res, next) => {
  //Перевірка заголовка авторизації
  const { authorization } = req.header;

  if (typeof authorization !== 'string') {
    next(createHttpError(401, 'Please provide access token'));
    return;
  }
  //Перевірка типу заголовка та наявності токена
  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    next(createHttpError(401, 'Please provide access token'));
    return;
  }

  //Перевірка наявності сесії
  const session = await SessionModel.findOne({ accessToken });

  if (session === null) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  // Перевірка терміну дії токена
  const expiredAccessToken =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (expiredAccessToken) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  //Пошук користувача
  const user = await UserModel.findById(session.userId);

  if (user === null) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  //Додавання користувача до запиту,  всі перевірки успішні

  req.user = { id: user._id, name: user.name };
  // req.user = user;

  next();
};
