import {
  registrUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestResetPassword,
  resetPassword,
} from '../services/auth.service.js';

// creat user
export const registerController = async (req, res) => {
  const data = await registrUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data,
  });
};

//  login user
export const loginController = async (req, res) => {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

//logout user
export const logoutController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).end();
};

//refresh
export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

// скидання паролю
export const requestResetPasswordController = async (req, res) => {
  const { email } = req.body;

  await requestResetPassword(email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

//заміна паролю
export const resetPasswordController = async (req, res) => {
  const { password, token } = req.body;

  await resetPassword(password, token);

  res.send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
