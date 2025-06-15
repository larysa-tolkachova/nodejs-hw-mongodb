import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.controllers.js';

import { upload } from '../middlewares/upload.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.schema.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post(
  '/',
  upload.single('photo'),
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactsController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactsController));

export default router;
