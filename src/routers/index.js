import express from 'express';

import contactsRoutes from '../routers/contacts.routers.js';
import authRoutes from '../routers/auth.routers.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/contacts', authenticate, contactsRoutes);
router.use('/auth', authRoutes);

export default router;
