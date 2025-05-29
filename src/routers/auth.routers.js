import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { registrSchema } from '../validation/auth.schema.js';
import { registerController } from '../controllers/auth.controller.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registrSchema),
  ctrlWrapper(registerController),
);

export default router;
