import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import { sendPasswordResetEmail } from '../middleware/sendPasswordResetEmail.js';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id) => {
	return jwt.sign({ id }, 'secret', { expiresIn: '1d' });
};

// login
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await user.matchPasswords(password))) {
		user.firstLogin = false;
		await user.save();
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			goodleId: user.googleId,
			isAdmin: user.isAdmin,
			token: genToken(user._id),
			active: user.active,
			firstLogin: user.firstLogin,
			created: user.createdAt,
			favorites: user.favorites
		});
	} else {
		res.status(401).send('Hibás e-mail vagy jelszó.');
		throw new Error('Felhasználó nem található.');
	}
});

console.log(loginUser)

// register
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400).send('Már van egy fiókunk ezzel az e-mail címmel.');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	const newToken = genToken(user._id);

	sendVerificationEmail(newToken, email, name);

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			googleImage: user.googleImage,
			googleId: user.googleId,
			firstLogin: user.firstLogin,
			isAdmin: user.isAdmin,
			token: newToken,
			active: user.active,
			createdAt: user.createdAt,
			favorites: user.favorites
		});
	} else {
		res.status(400).send('Nem tudtuk regisztrálni Önt.');
		throw new Error('Valami hiba történt.Kérjük, ellenőrizze az adatait és próbálja újra.');
	}
});

// verify email
const verifyEmail = asyncHandler(async (req, res) => {
	const user = req.user;
	user.active = true;
	await user.save();
	res.json('Köszönjük, hogy aktiválta fiókját. Most bezárhatja ezt az ablakot.');
});

// password reset request
const passwordResetRequest = asyncHandler(async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email: email });
		if (user) {
			const newToken = genToken(user._id);
			sendPasswordResetEmail(newToken, user.email, user.name);
			res.status(200).send(`Küldtünk Önnek egy helyreállítási e-mailt a ${email}`);
		}
	} catch (error) {
		res.status(401).send('Nincs fiók ilyen e-mail címmel');
	}
});

// password reset
const passwordReset = asyncHandler(async (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	try {
		const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findById(decoded.id);

		if (user) {
			user.password = req.body.password;
			await user.save();
			res.json('Jelszava sikeresen frissült.');
		} else {
			res.status(404).send('Felhasználó nem található.');
		}
	} catch (error) {
		res.status(401).send('A jelszó visszaállítása sikertelen.');
	}
});

//google login
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, name, googleImage } = req.body;
	console.log(googleId, email, name, googleImage);

	try {
		const user = await User.findOne({ googleId: googleId });
		if (user) {
			user.firstLogin = false;
			await user.save();
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
				firstLogin: user.firstLogin,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
				active: user.active,
				createdAt: user.createdAt,
				favorites: user.favorites
			});
		} else {
			const newUser = await User.create({
				name,
				email,
				googleImage,
				googleId,
			});

			const newToken = genToken(newUser._id);

			sendVerificationEmail(newToken, newUser.email, newUser.name, newUser._id);
			res.json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				firstLogin: newUser.firstLogin,
				isAdmin: newUser.isAdmin,
				token: genToken(newUser._id),
				active: newUser.active,
				createdAt: newUser.createdAt,
				favorites: newUser.favorites
			});
		}
	} catch (error) {
		res.status(404).send('Valami hiba történt,kérjük próbálja meg később újra.');
	}
});

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.params.id });
	if (orders) {
		res.json(orders);
	} else {
		res.status(404).send('Nem találtak megrendelést.');
		throw new Error('Nem található rendelés.');
	}
});

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Felhasználó nem található" });
        }

        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await user.save();

        res.json({
            message: "Felhasználó frissítve",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Hiba történt", error: error.message });
    }
};




const deleteUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findByIdAndRemove(req.params.id);
		res.json(user);
	} catch (error) {
		res.status(404).send('Ez a felhasználó nem található.');
		throw new Error('Ez a felhasználó nem található.');
	}
});

userRoutes.get('/favorites', protectRoute, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites');
    
    if (!user) {
        return res.status(404).json({ message: "Felhasználó nem található" });
    }

    res.json(user.favorites);
}));

userRoutes.post('/favorites/:productId', protectRoute, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ message: "Felhasználó nem található" });
    }

    const productId = req.params.productId;
    if (!user.favorites.includes(productId)) {
        user.favorites.push(productId);
    }

    await user.save();
    res.json(user.favorites);
	console.log(user.favorites)
}));


userRoutes.delete('/favorites/:productId', protectRoute, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    
    if (!user) {
        return res.status(404).json({ message: "Felhasználó nem található" });
    }

    user.favorites = user.favorites.filter(fav => fav.toString() !== req.params.productId);
    await user.save();

    res.json(user.favorites);
	console.log(user.favorites)
}));




userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(protectRoute, verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(protectRoute, passwordReset);
userRoutes.route('/google-login').post(googleLogin);
userRoutes.route('/:id').get(protectRoute, getUserOrders);
userRoutes.route('/').get(protectRoute, admin, getUsers);
userRoutes.route('/:id').delete(protectRoute, admin, deleteUser);
userRoutes.route('/:id').put(protectRoute, admin, updateUser);


export default userRoutes;
