import { Contact } from '../models/contact.js';

export const getContacts = () => Contact.find();

export const getContactsById = (id) => Contact.findOne({ _id: id });

export const creatContacts = (payload) => Contact.create(payload);

export const updateContacts = (contactId, payload) => Contact.findOneAndUpdate(contactId, payload, { new: true });

export const deleteContacts = (id) => Contact.findOneAndDelete({ _id: id });
