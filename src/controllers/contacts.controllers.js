import {
  getContacts,
  getContactsById,
  creatContacts,
  updateContacts,
  deleteContacts,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
//===================
const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};
//=====================
const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);
  console.log(data);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  if (data.userId.toString() !== req.userId.toString) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};
//========================

const createContactsController = async (req, res) => {
  const data = await creatContacts({ ...req.body, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
//========================

const updateContactsController = async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContacts(contactId, req.body);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};
//======================================

const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;

  const data = await deleteContacts(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).end();
};

export {
  getContactsController,
  getContactsByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
};
