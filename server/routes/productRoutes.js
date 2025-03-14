import express from 'express';
import Product from '../models/Product.js';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const page = parseInt(req.params.page) || 1;
	const perPage = parseInt(req.params.perPage) || 10;
	
	const keyword = req.query.keyword
	  ? { name: { $regex: req.query.keyword, $options: 'i' } }
	  : {};  // Ha nincs keresőszó, üres objektum marad
  
	try {
	  const count = await Product.countDocuments(keyword);
	  const products = await Product.find(keyword)
		.skip((page - 1) * perPage)
		.limit(perPage);
  
	  res.json({ products, pagination: { currentPage: page, totalPages: Math.ceil(count / perPage) } });
	} catch (error) {
	  res.status(500).json({ message: "Hiba történt a termékek lekérésekor" });
	}
  };

const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found');
	}
};


const createNewProduct = asyncHandler(async (req, res) => {
	const { name, stock, price, images, productIsNew, description, packing,packingOf, stripeId,nutrionalValue } = req.body;

	const newProduct = await Product.create({
		name,
		description,
		stock,
		price,
		images,
		productIsNew,
		stripeId,
		packing,
		packingOf,
		nutrionalValue
	});

	await newProduct.save();

	const products = await Product.find({});

	if (newProduct) {
		res.json(products);
	} else {
		res.status(404).send('Product could not be uploaded.');
		throw new Error('Product could not be uploaded.');
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, stock, price, imageOne,imageTwo, productIsNew, description, packing,packingOf, stripeId,nutrionalValue } =
		req.body;

	const product = await Product.findById(id);

	if (product) {
		product.name = name;
		product.packing = packing;
		product.packingOf = packingOf;
		product.price = price;
		product.description = description;
		product.brand = brand;
		product.category = category;
		product.stock = stock;
		product.productIsNew = productIsNew;
		product.stripeId = stripeId;
		product.images = [imageOne, imageTwo];

		await product.save();

		const products = await Product.find({});

		res.json(products);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});


const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});

productRoutes.route('/:page/:perPage').get(getProducts);
productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/:id').delete(protectRoute, admin, deleteProduct);
productRoutes.route('/').put(protectRoute, admin, updateProduct);
productRoutes.route('/').post(protectRoute, admin, createNewProduct);

export default productRoutes;
