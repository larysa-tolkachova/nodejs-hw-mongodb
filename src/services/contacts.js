import { ContactModel } from '../models/contact.js';

export const getContacts = () => ContactModel.find();

export const getContactsById = (contactId) => ContactModel.findById(contactId);

export const creatContacts = (payload) => ContactModel.create(payload);

export const updateContacts = (contactId, payload) =>
  ContactModel.findByIdAndUpdate(contactId, payload, { new: true });

export const deleteContacts = (contactId) =>
  ContactModel.findByIdAndDelete(contactId);
