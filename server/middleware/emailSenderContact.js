import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmailContact = async (firstName, lastName, email, tphone, message) => {
    const html = `
  <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3 style="color: #4CAF50;">Tisztelt ${firstName} ${lastName}!</h3>
          <p style="font-size: 16px;">Köszönjük az üzeneted! Hamarosan válaszolunk.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${tphone}</p>
          <p><strong>Üzenet:</strong> ${message}</p>
      </body>
  </html>
  `;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,  
      to: process.env.EMAIL_USER,  
      subject: "LaskodiTészta : Kapcsolat",
      html: html,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email elküldve: ${info.response}`);
    } catch (error) {
      console.error("Hiba történt az e-mail küldésekor:", error);
    }
  };
  