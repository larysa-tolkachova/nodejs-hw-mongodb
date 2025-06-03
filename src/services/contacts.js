import { ContactModel } from '../models/contact.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) => {
  //пагінація, сортування, фільтр
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactModel.find();

  contactQuery.where('userId').equals(userId); //користувачу тільки його контакти

  if (typeof filter.type !== 'undefined') {
    contactQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, data] = await Promise.all([
    ContactModel.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPage = Math.ceil(totalItems / perPage);
  //===========================================

  return {
    data,
    totalItems,
    page,
    perPage,
    totalPage,
    hasNextPage: totalPage > page,
    hasPreviousPage: page > 1,
  };
};

export const getContactsById = (contactId, userId) =>
  ContactModel.findOne({ _id: contactId, userId }); // ContactModel.findOne({_id: contactId})  ContactModel.findById(contactId);

export const creatContacts = (payload) => ContactModel.create(payload);

export const updateContacts = (contactId, userId, payload) =>
  ContactModel.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
  });

export const deleteContacts = (contactId, userId) =>
  ContactModel.findOneAndDelete({ _id: contactId, userId });
