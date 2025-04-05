import express from 'express';
import { sendOrderConfirmationEmail, sendEmailContactEmail } from '../models/emailController.js';

const emailRoutes = express.Router();

emailRoutes.route('/sendorder').post(sendOrderConfirmationEmail);
emailRoutes.route('/send-email').post(sendEmailContactEmail);

export default emailRoutes;
