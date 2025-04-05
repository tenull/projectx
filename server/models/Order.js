import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		username: {
			type: String,
			required: true,
			ref: 'User',
		},
		email: {
			type: String,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				packaking: { type: Number, required: true },
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			phone:{ type:String,required: true},
			comment:{type:String},
			billingAddress: { type: String, required: true },
			billingCity: { type: String, required: true },
			billingPostalCode: { type: String, required: true },
			billingPhone:{ type:String,required: true},
			billingName:{ type:String},
		},

		shipping: { type: String, default: 0.0 },
		totalPrice: { type: Number, default: 0.0 },
		subtotal: { type: Number, default: 0.0 },
		isDelivered: { type: Boolean, required: true, default: false },
		paymentMethod:{type:String,required:true},
		paymentMethodCost: { type: Number, required: true, default: 0 },
		selectedShippingMethod: { type: Number, required: true, default: 0 },
		deliveredAt: {
			type: Date,
		},
		isPaid: { type: Boolean, required: true, default: false },
		PaidStatus:{type:String},
		paidAt: {
			type: Date, 
		  },
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
