import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} from '../controllers/contacts.controllers.js';

const router = express.Router();

const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', jsonParser, ctrlWrapper(createContactsController));

router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(updateContactsController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

export default router;
