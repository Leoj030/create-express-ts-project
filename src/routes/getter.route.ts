import express from 'express';
import getHello from '../controllers/getter.controller';

const router = express.Router();

// Defines a router with a GET endpoint.
router.get('', getHello);

export default router;