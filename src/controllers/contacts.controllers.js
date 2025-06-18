import fs from 'node:fs';

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
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

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
    userId: req.user.id,
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
  const userId = req.user.id;

  const data = await getContactsById(contactId, userId);

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
  let photo = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path); //видаляємо картинку
    photo = result.secure_url; // шлях до картинки на Cloudinar
  }

  //req.file.path - передаємо повний шлях до фото. завантаження foto на Cloudinar

  //

  const data = await creatContacts({
    ...req.body,
    userId: req.user.id, //user до якого належить конкретний contact
    photo,
  });
  //req.body - отримуємо, userId: req.user.id - самі визначаємо

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};
//========================

const updateContactsController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user.id;
  let photo = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.path);
    await fs.unlink(req.file.path); //видаляємо картинку .
    photo = result.secure_url; // шлях до картинки на Cloudinar
  }

  const updateData = { ...req.body };
  if (photo) updateData.photo = photo;

  const data = await updateContacts(contactId, userId, updateData);

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
  const userId = req.user.id;

  const data = await deleteContacts(contactId, userId);

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
