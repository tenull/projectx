import Order from '../models/Order.js';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import axios from 'axios';
import Product from '../models/Product.js';
import { protectRoute } from '../middleware/authMiddleware.js';


export const checkPaymentStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Rendelés nem található.' });
        }

        if (order.isPaid) {
            return res.json({ isPaid: true });
        }

        const response = await axios.get(`https://api.test.barion.com/v2/Payment/GetPaymentState`, {
            params: {
                POSKey: process.env.BARION_POS_KEY,
                PaymentId: order.paymentId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const paymentStatus = response.data.Status;
        console.log(`Barion fizetési státusz: ${paymentStatus}`);

        if (paymentStatus === 'Succeeded') {
            order.isPaid = true;
            order.paidAt = new Date();
            await order.save();
            return res.json({ isPaid: true });
        }

        return res.json({ isPaid: false });
    } catch (error) {
        console.error('Hiba a fizetési státusz ellenőrzésekor:', error);
        res.status(500).json({ message: 'Szerverhiba a fizetési státusz ellenőrzésekor.' });
    }
};
