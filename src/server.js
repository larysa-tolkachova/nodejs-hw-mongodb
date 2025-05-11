import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from '../src/utils/getEnvVar.js';
import { getContacts, getContactsById } from '../src/services/contacts.js';

export const setupServer = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.get('/', (req, res) => {
      res.json({ message: 'Server start successfully' });
    });

    app.get('/contacts', async (req, res) => {
      const data = await getContacts();

      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
      });
    });

    app.get('/contacts/:contactId', async (req, res) => {
      const contactId = req.params;

      const data = await getContactsById(contactId);

      if (data === null) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
      });
    });

    const PORT = Number(getEnvVar('PORT'));

    app.use((req, res) => {
      res.status(404).json({ message: 'Not found' });
    });

    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }

      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
