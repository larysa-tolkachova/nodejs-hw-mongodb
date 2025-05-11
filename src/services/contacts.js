import { Contact } from '../models/contact.js';

export const getContacts = () => Contact.find();

export const getContactsById = (id) => Contact.findOne({ _id: id });
