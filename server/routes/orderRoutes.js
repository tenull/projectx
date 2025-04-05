import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { admin, protectRoute } from '../middleware/authMiddleware.js';
import { checkPaymentStatus } from '../middleware/orderController.js';

const orderRoutes = express.Router();

const getOrders = async (req, res) => {
	const orders = await Order.find({});
	res.json(orders);
};

const getOrder = async (req, res) => {
	try {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return res.status(404).json({ message: 'Rendelés nem található' });
	}

	res.json(order);
} catch (error) {
	console.error('Hiba az order lekérdezésekor:', error);
	res.status(500).json({ message: 'Szerverhiba' });
};

}

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id);

	if (order) {
		res.json(order);
	} else {
		res.status(404).send('Rendelés nem található.');
		throw new Error('Rendelés nem található.');
	}
});

const setDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404).send('Rendelést nem lehetett frissíteni.');
		throw new Error('Rendelést nem lehetett frissíteni.');
	}
});

const setPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = new Date();
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404).send('Rendelést nem lehetett feltölteni.');
		throw new Error('Rendelést nem lehetett frissíteni.');
	}
});



orderRoutes.route('/').get(protectRoute, admin, getOrders);
orderRoutes.route('/:id').get(protectRoute, admin, getOrder);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route('/:id/paid').put(protectRoute, admin, setPaid);
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);

export default orderRoutes;