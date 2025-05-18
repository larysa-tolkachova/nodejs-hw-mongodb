import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
  console.log('HttpError', error);

  if (isHttpError(error) === true) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.name, data: error });
  }

  console.log(error);

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error.message,
  });
}
