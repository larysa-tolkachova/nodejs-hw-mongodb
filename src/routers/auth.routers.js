import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { registrSchema, loginSchema } from '../validation/auth.schema.js';
import {
  registerController,
  loginController,
  logoutCotroller,
  refreshCotroller,
} from '../controllers/auth.controller.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registrSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutCotroller));

router.post('/refresh', ctrlWrapper(refreshCotroller));

export default router;
