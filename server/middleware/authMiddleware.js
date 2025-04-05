import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protectRoute = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; 
            const decoded = jwt.verify(token, 'secret'); 
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                res.status(404);
                throw new Error('User not found');
            }

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed.');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token.');
    }
});


const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403); 
        throw new Error('Not authorized as an admin.');
    }
};




export { protectRoute, admin };
