import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendPasswordResetEmail = (token, email, name) => {
	const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
	const html = `
    <html>
        <head>
            <style>
                .container {
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: #fff;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Kedves ${name},</h2>
                <p>Jelszó-visszaállítási kérelmet kaptunk az Ön fiókjához.</p>
                <p>Kérjük, kattintson az alábbi gombra a jelszava visszaállításához:</p>
                <a class="button" href="${frontendUrl}/password-reset/${token}">Jelszó visszaállítása</a>
                <p>Ha nem Ön kérte a jelszó visszaállítását, hagyja figyelmen kívül ezt az e-mailt.</p>
                <div class="footer">
                    <p>&copy; 2025 LaskodiTészta. Minden jog fenntartva.</p>
                </div>
            </div>
        </body>
    </html>`;

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
		subject: 'LaskodiTészta: Jelszó visszaállítási kérelem',
		html: html,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log(`E-mail elküldve: ${email}`);
			console.log(info.response);
		}
	});
};