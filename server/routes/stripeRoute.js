import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeRoute = express.Router();



const stripePayment = async (req, res) => {
  const data = req.body;
  console.log(data)

  let lineItems = [];
  let subtotal = 0;

  data.cartItems.forEach((item) => {
    subtotal += item.price * item.qty;
    lineItems.push({
      price: item.stripeId,
      quantity: item.qty,
    });
  });

  const order = new Order({
    orderItems: data.cartItems,
    user: data.userInfo._id,
    username: data.userInfo.name,
    email: data.userInfo.email,
    shippingAddress: data.shippingAddress,
    shipping: data.shipping,
	paymentMethod:data.paymentMethod,
	paymentMethodCost:data.paymentMethodCost,
	selectedShippingMethod:data.selectedShippingMethod,
	totalPrice: Number(data.subtotal) + Number(data.selectedShippingMethod) + (data.paymentMethodCost)
  });

  const newOrder = await order.save();

  let orderId = newOrder._id.toString();

  data.cartItems.forEach(async (cartItem) => {
    let product = await Product.findById(cartItem.id);
    product.stock = product.stock - cartItem.qty;
    product.save();
  });

 
  const successUrl = 'http://localhost:3000/sikeres'; 

  res.send(
    JSON.stringify({
      orderId: orderId,
      url: successUrl,
    })
  );
};

stripeRoute.route('/').post(protectRoute, stripePayment);

export default stripeRoute;
