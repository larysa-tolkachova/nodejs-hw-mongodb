import express from 'express';

import contactsRoutes from '../routers/contacts.routers.js';
import authRoutes from '../routers/auth.routers.js';

const router = express.Router();

router.use('/', contactsRoutes);
router.use('/auth', authRoutes);

export default router;
