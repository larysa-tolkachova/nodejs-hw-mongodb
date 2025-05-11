import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  const USER = getEnvVar('MONGODB_USER');
  const PASSWORD = getEnvVar('MONGODB_PASSWORD');
  const URL = getEnvVar('MONGODB_URL');
  const DB = getEnvVar('MONGODB_DB');

  const uri = `mongodb+srv://${USER}:${PASSWORD}@${URL}/${DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    throw error;
  }
};
