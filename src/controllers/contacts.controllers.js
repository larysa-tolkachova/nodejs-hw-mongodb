import {
  getContacts,
  getContactsById,
  creatContacts,
  updateContacts,
  deleteContacts,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

//===================
const getContactsController = async (req, res) => {
  const data = await getContacts();

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

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};
//========================

const createContactsController = async (req, res) => {
  const data = await creatContacts(req.body);

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
