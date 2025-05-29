// import createHttpError from 'http-errors';
import { registrUser } from '../services/auth.service.js';

export const registerController = async (req, res) => {
  const data = await registrUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};
