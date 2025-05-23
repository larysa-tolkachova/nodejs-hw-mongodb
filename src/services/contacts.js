import { ContactModel } from '../models/contact.js';

export const getContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  //пагінація
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [total, contacts] = await Promise.all([
    ContactModel.countDocuments(),
    ContactModel.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPage = Math.ceil(total / perPage);
  //===========================================
  return {
    contacts,
    total,
    page,
    perPage,
    totalPage,
    hasNextPage: totalPage > page,
    hasPreviousPage: page > 1,
  };
};

export const getContactsById = (contactId) => ContactModel.findById(contactId);

export const creatContacts = (payload) => ContactModel.create(payload);

export const updateContacts = (contactId, payload) =>
  ContactModel.findByIdAndUpdate(contactId, payload, { new: true });

export const deleteContacts = (contactId) =>
  ContactModel.findByIdAndDelete(contactId);
