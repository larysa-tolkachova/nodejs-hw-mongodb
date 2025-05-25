import { ContactModel } from '../models/contact.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  //пагінація, сортування, фільтр
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactModel.find();

  if (typeof filter.type !== 'undefined') {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.favourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.favourite);
  }

  const [total, contacts] = await Promise.all([
    ContactModel.countDocuments(contactQuery),
    contactQuery
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
