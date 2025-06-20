import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import path from 'node:path';

import { getEnvVar } from '../src/utils/getEnvVar.js';
import router from './routers/index.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { notFoundHandler } from '../src/middlewares/notFoundHandler.js';

export const setupServer = async () => {
  try {
    const app = express();

    app.use(
      '/photos',
      express.static(path.resolve('src', 'uploads', 'photos')),
    );

    app.use(cookieParser());
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

    app.use(router);

    app.use(notFoundHandler); //Error 404

    app.use(errorHandler); //Error 500

    const PORT = Number(getEnvVar('PORT'));

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
