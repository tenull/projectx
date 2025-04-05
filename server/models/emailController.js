import { sendEmail } from '../middleware/emailSender.js';
import { sendEmailContact } from '../middleware/emailSenderContact.js';

const sendOrderConfirmationEmail = async (req, res) => {
    try {
        const { userInfo, shipping, packing, cartItems, shippingAddress, PaymentMethodCost, subtotal, firstName, lastName, email, tphone, message } = req.body;

        console.log('Sending order confirmation email with:', {
            userInfo, shipping, packing, cartItems, shippingAddress, PaymentMethodCost, subtotal, firstName, lastName, email, tphone, message
        });

        const result = await sendEmail(
            userInfo, shipping, packing, cartItems, shippingAddress, PaymentMethodCost, subtotal, firstName, lastName, email, tphone, message
        );

        return res.status(200).json({ message: "Order confirmation email sent successfully", result });
    } catch (error) {
        console.error('Hiba történt a rendelés visszaigazoló e-mail küldésekor:', error);
        return res.status(500).json({ message: 'Hiba történt a vezérlőben' });
    }
};

const sendEmailContactEmail = async (req, res) => {
    try {
        const { firstName, lastName, email, tphone, message } = req.body;

        console.log('Email küldése a következő adatokkal:', { firstName, lastName, email, tphone, message });

        await sendEmailContact(firstName, lastName, email, tphone, message);

        res.status(200).json({ message: 'Email sikeresen elküldve!' });
    } catch (error) {
        console.error('Hiba történt a vezérlőben:', error);
        res.status(500).json({ message: 'Hiba történt a vezérlőben' });
    }
};

const sendBarionEmailController  = async (order) => {
    try {
        if (!order) {
          console.error("❌ Nincs order adat!");
          return;
        }
    
        const userInfo = {
          name: order.username,
          email: order.email,
          orderId: order._id,
        };
    
        console.log("📦 Barion e-mail küldése ezekkel:", userInfo);
  
      const shipping = order.shipping;
      const packing = order.packing || "";
      const cartItems = order.orderItems;
      const shippingAddress = order.shippingAddress;
      const paymentMethod = order.paymentMethod;
      const paymentMethodCost = order.paymentMethodCost;
      const subtotal = order.subtotal;
      const totalPrice = order.totalPrice;
  
      console.log("sendBarionEmail adatok:", {
        userInfo,
        shipping,
        packing,
        cartItems,
        shippingAddress,
        paymentMethod,
        paymentMethodCost,
        subtotal,
        totalPrice,
      });
  
      const result = await sendEmail(
        userInfo,
        shipping,
        packing,
        cartItems,
        shippingAddress,
        paymentMethod,
        paymentMethodCost,
        subtotal,
        totalPrice
      );
  
      return res
        .status(200)
        .json({ message: "Barionos rendelés e-mail sikeresen elküldve", result });
    } catch (error) {
      console.error("Hiba történt a Barion e-mail küldésekor:", error);
      return res.status(500).json({ message: "Hiba történt a vezérlőben" });
    }
  };
  


export { sendOrderConfirmationEmail, sendEmailContactEmail,sendBarionEmailController  };
