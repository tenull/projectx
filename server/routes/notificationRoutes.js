import express from 'express';
import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';
import { protectRoute, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET – Értesítés lekérése
router.get('/', asyncHandler(async (req, res) => {
    const notification = await Notification.findOne();
    if (notification) {
        res.json(notification);
    } else {
        res.status(404).json({ message: 'Nincs értesítés beállítva.' });
    }
}));


router.post('/', protectRoute, admin, asyncHandler(async (req, res) => {
    const { message, isVisible } = req.body;

    let notification = await Notification.findOne();

    if (notification) {
        notification.message = message;
        notification.isVisible = isVisible;
    } else {
        notification = new Notification({ message, isVisible });
    }

    await notification.save();
    res.json({ message: 'Értesítés frissítve.', notification });
}));

export default router;
