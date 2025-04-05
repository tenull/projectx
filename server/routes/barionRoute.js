import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import axios from 'axios';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { protectRoute } from '../middleware/authMiddleware.js';
import { sendBarionEmailController } from '../models/emailController.js';
const barionRoute = express.Router();

const barionPayment = async (req, res) => {
  try {
    const data = req.body;

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

    // console.log('Saving order:', order);
    const newOrder = await order.save();
    let orderId = newOrder._id.toString();

    // Készlet frissítése
    for (let cartItem of data.cartItems) {
      let product = await Product.findById(cartItem.id);
      product.stock = product.stock - cartItem.qty;
      await product.save();
    }

    const redirectBase = 'http://localhost:3000/payment-result';
    const redirectUrl = `${redirectBase}?orderId=${orderId}`;


    // Barion fizetési kérés előkészítése
    const paymentData = {
      POSKey: process.env.BARION_POS_KEY,
      PaymentType: 'Immediate',
      GuestCheckOut: true,
      FundingSources: ['All'],
      PaymentRequestId: orderId,
      Currency: 'HUF',
      Transactions: [
        {
          POSTransactionId: orderId,
          Payee: process.env.BARION_MERCHANT_EMAIL,
          Total: totalAmount + Number(data.selectedShippingMethod) + Number(data.paymentMethodCost),
          Items: items
        }
      ],
      RedirectUrl: redirectUrl,
      CallbackUrl: 'https://7231-84-2-238-164.ngrok-free.app/api/checkout/callback'
    };

    const barionResponse = await axios.post(
      'https://api.test.barion.com/v2/Payment/Start',
      paymentData, // A fizetési adatok request body-ban mennek
      {
        params: {
          POSKey: process.env.BARION_POS_KEY, // API kulcs query paraméterként
        },
        headers: {
          'Content-Type': 'application/json', // Barion JSON adatokat vár
        },
      }
    );

    // console.log(barionResponse.data,'response')
    

    if (barionResponse.data && barionResponse.data.PaymentId) {
      return res.json({
        orderId: orderId,
        url: barionResponse.data.GatewayUrl,
        paidAt: order.paidAt
      });
    } else {
      return res.status(500).json({ message: 'Barion fizetés sikertelen!' });
    }
  } catch (error) {
    console.error('Hiba a Barion fizetésnél:', error);
    res.status(500).json({ message: 'Szerverhiba a Barion fizetésnél.' });
  }
};



barionRoute.post('/callback', async (req, res) => {
  try {
    const { PaymentId } = req.body; // 🔹 Kivesszük a PaymentId-t a requestből
    if (!PaymentId) {
      return res.status(400).json({ message: 'Hiányzó PaymentId' });
    }

    console.log(`🔹 Barion callback érkezett. PaymentId: ${PaymentId}`);

    // 🔹 Lekérdezzük a fizetési állapotot a Barion API-tól
    const response = await axios.get(`https://api.test.barion.com/v2/Payment/GetPaymentState`, {
      params: {
        POSKey: process.env.BARION_POS_KEY,
        PaymentId: PaymentId,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const paymentStatus = response.data.Status;
    console.log(`🔹 Barion Payment Status: ${paymentStatus}`);

    // 🔹 Ha a fizetés sikeres, frissítjük a rendelést az adatbázisban
    if (paymentStatus === 'Succeeded') {
      const order = await Order.findById(response.data.PaymentRequestId);
     
      if (!order) {
        console.error(`❌ Hiba: A rendelés nem található. Order ID: ${response.data.PaymentRequestId}`);
        return res.status(404).json({ message: 'Rendelés nem található.' });
      }

      // 👉 Ha a rendelés már kifizetett, akkor ne küldjük újra az e-mailt
      if (order.isPaid) {
        console.log(`⚠️ A rendelés már kifizetve. Order ID: ${order._id}`);
        return res.status(200).json({ message: 'A rendelés már kifizetve. Duplikált callback.' });
      }

      // ✅ Ha még nem volt fizetve
      order.isPaid = true;
      order.paidAt = new Date();
      order.PaidStatus = paymentStatus;
      
      await order.save();
      await sendBarionEmailController(order); // E-mail csak egyszer küldésre kerül!

      console.log(`✅ Order ${order._id} sikeresen fizetettként megjelölve.`);
    } else {
      // Ha nem sikerült a fizetés
      const order = await Order.findById(response.data.PaymentRequestId);
      order.PaidStatus = paymentStatus;
      
      await order.save();
      console.log(`🔹 A rendelés státusza frissítve: ${paymentStatus}`);
    }

    return res.status(200).json({ message: 'Callback feldolgozva.' });

  } catch (error) {
    console.error('❌ Hiba a Barion callback kezelésében:', error);
    res.status(500).json({ message: 'Szerverhiba a Barion callback kezelésében.' });
  }
});


barionRoute.route('/').post(protectRoute, barionPayment);

export default barionRoute;
