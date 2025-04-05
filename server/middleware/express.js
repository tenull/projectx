import express from 'express';
import { createPaymentRequest } from './controllers/simplepayController.js';

const router = express.Router();

router.post('/create-payment', createPaymentRequest);

export default router;