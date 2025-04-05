import dotenv from 'dotenv';
dotenv.config();
import connectToDatabase from './db.js';
import express from 'express';
import cors from 'cors';
import path from 'path';

// Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import stripeRoute from './routes/stripeRoute.js';
import orderRoutes from './routes/orderRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'
import barionRoute from './routes/barionRoute.js';
import successPaymentRoute from './routes/succesPayment.js';
import emailRoutes from './routes/emailRoutes.js';
connectToDatabase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const allowedOrigins = ['https://7231-84-2-238-164.ngrok-free.app/'];  // Az ngrok URL itt
app.use(cors({
    origin: allowedOrigins,  // Engedélyezett domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/checkout', barionRoute);
app.use('/api/successpayment', successPaymentRoute); 
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/sendorderconfirmationemail', emailRoutes);

app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID));

app.get("/api/pickup-points", async (req, res) => {
    const pickupPoints = await fetch("https://api.csomagszallito.hu/pickup-points") // Külső API hívás
        .then(response => response.json());

    res.json(pickupPoints);
});


const port = 5000;

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.get('/', (req, res) => {
	res.send('Api is running...');
});

app.listen(port, () => {
	console.log(`Server runs on port ${port}`);
});