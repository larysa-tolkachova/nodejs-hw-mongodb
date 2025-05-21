import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (error) {
      //   const errors = error.detais.map((detail) => detail.message);
      console.log(error);

      return next(createHttpError.BadRequest(error));
    }
  };
}
