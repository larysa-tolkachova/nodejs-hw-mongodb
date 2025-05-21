import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.controllers.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/students.schema.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

router.post(
  '/contacts',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactsController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactsController),
);

export default router;
