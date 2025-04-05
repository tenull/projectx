import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendVerificationEmail = (token, email, name) => {
    const html = `
    <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    color: white;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Kedves ${name}!</h2>
                <p>Köszönjük, hogy regisztráltál a LaskodiTészta oldalán!</p>
                <p>Kérjük, kattints az alábbi gombra az e-mail címed megerősítéséhez.</p>
                <a class="button" href="${process.env.FRONTEND_URL}/email-verify/${token}">Megerősítés</a>
                <p>Ha nem te regisztráltál, kérlek hagyd figyelmen kívül ezt az üzenetet.</p>
                <p>Üdvözlettel,<br/>LaskodiTészta</p>
            </div>
        </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'E-mail megerősítés - LaskodiTészta',
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Hiba történt az e-mail küldésekor:', error);
        } else {
            console.log(`E-mail elküldve: ${email}`);
        }
    });
};