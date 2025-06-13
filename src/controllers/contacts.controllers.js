import * as fs from 'node:fs/promises';
import path from 'node:path';

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
import { getEnvVar } from '../utils/getEnvVar.js';

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
  console.log("'req.file'", req.file);

  //перемикач
  let avatar = null;

  if (getEnvVar('UPLOAD_TO_CLOUDINARY') === 'true') {
    const result = await uploadToCloudinary(req.file.path); //завантаження foto на Cloudinar
    await fs.unlink(req.file.path); //видаляємо картинку

    avatar = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve('src', 'uploads', 'avatars', req.file.filename),
    ); //перемістили file на постійне збереження

    avatar = `http://localhost:3000/avatars/${req.file.filename}`;
  } //

  const data = await creatContacts({
    ...req.body,
    userId: req.user.id, //user до якого належить конкретний contact
    avatar,
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

  const data = await updateContacts(contactId, userId, req.body);

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
