import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		energy: { type: String, required: true, default: '1644 kJ / 389 kcal' },
		fat: { type: String, required: true, default: '4,62g' },
		saturedFat: { type: String, required: true, default: '1,48g' },
		carbohydrates: { type: String, required: true, default: '70,48g' },
		sugar: { type: String, required: true, default: '2,74g'},
		protein: { type: String, required: true, default: '14,67g'},
		salt: { type: String, required: true, default: '0,153g'},
	},
	{ timestamps: true }
);

const productSchema = new mongoose.Schema(
	{	
		brand: {
		    type: String,
			required:true
		},
		name: {
			type: String,
			required: true,
		},
		images: {
			type: Array,
			required: true,
			default: [],
		},
		packingOf: {
			type: Number,
			required: true,
		},
		packing: {
			type: String,
			required: true,
		},
		ingredients: {
			type: String,
			required: true,
		},
		nutrionalValue: [reviewSchema],
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		productIsNew: {
			type: Boolean,
			required: true,
		},
		stripeId: {
			type: String,
			default: 0,
		},
		packaking: {
			type: Number,
			required:true,
		},	
		type:{
			type:String,
			required:true
		}
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
