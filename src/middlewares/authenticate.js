import createHttpError from 'http-errors';

import { UserModel } from '../models/user.js';
import { SessionModel } from '../models/sessions.js';

export const authenticate = async (req, res, next) => {
  //зчитуємо token з authorization - Перевірка заголовка авторизації
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    next(createHttpError(401, 'Please provide access token'));
    return;
  }
  //Перевірка типу заголовка та наявності токена з authorization
  const [bearer, accessToken] = authorization.split(' ', 2);

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    next(createHttpError(401, 'Please provide access token'));
    return;
  }

  //знаходимо session по accessToken - Перевірка наявності сесії
  const session = await SessionModel.findOne({ accessToken });

  if (session === null) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  //  якщо session є - Перевірка терміну дії токена
  const expiredAccessToken =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (expiredAccessToken) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  //Пошук користувача якому належить ця session
  const user = await UserModel.findOne({ _id: session.userId });

  if (user === null) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  //Додавання користувача до запиту,  всі перевірки успішні

  req.user = { id: user._id, name: user.name };

  next();
};
