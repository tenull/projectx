import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Order from '../models/Order.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const successPaymentRoute = express.Router();

const successPayment = async (req, res) => {
  try {
    const data = req.body;


    const existingOrder = await Order.findOne({ paymentMethod: data.paymentMethod, user: data.userInfo._id, totalPrice: data.totalPrice });
    let totalAmount = 0;
    let items = [];

    data.cartItems.forEach((item) => {
      totalAmount += item.price * item.qty;
      items.push({
        Name: item.name,
        Description: item.description || 'N/A',
        Quantity: item.qty,
        Unit: 'db',
        UnitPrice: item.price,
        ItemTotal: item.price * item.qty,
        Currency: 'HUF'
      });
    });

    if (!existingOrder) {
      const order = new Order({
        orderItems: data.cartItems,
      user: data.userInfo._id,
      username: data.userInfo.name,
      email: data.userInfo.email,
      shippingAddress: data.shippingAddress,
      shipping: data.shipping,
      subtotal: data.subtotal,
      paymentMethod: data.paymentMethod,
      paymentMethodCost: data.paymentMethodCost,
      selectedShippingMethod: data.selectedShippingMethod,
      pickupPoint: req.body.pickupPoint || null,
      paymentStatus: 'Pending' ,
      totalPrice: totalAmount + Number(data.selectedShippingMethod) + Number(data.paymentMethodCost)
      });

      const newOrder = await order.save();
      console.log(newOrder)
      return res.json({
        message: 'A rendelés sikeresen létrejött.',
        orderId: newOrder._id,
        totalPrice: newOrder.totalPrice
      });
    } else {
      return res.json({
        message: 'A rendelés már létezik.',
        orderId: existingOrder._id, 
      });
    }
  } catch (error) {
    console.error('Hiba a sikeres rendelésnél:', error);
    res.status(500).json({ message: 'Szerverhiba a rendelés leadásakor.' });
  }
};

// Route a sikeres rendeléshez
successPaymentRoute.route('/').post(protectRoute, successPayment);

export default successPaymentRoute;
