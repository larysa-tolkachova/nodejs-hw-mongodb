import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, res, next) {
  const { contactId } = req.params;
  console.log(contactId);

  if (isValidObjectId(contactId) !== true) {
    //   throw createHttpError(400, 'Bad Request');
    return next(createHttpError.BadRequest('ID should be an ObjectId'));
  }

  next();
}
