import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart,setPaymentMethod,setSelectedShippingMethod,setPaymentMethodCost } from '../slices/cart';


export const addCartItem = (id, qty) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		const itemToAdd = {
			id: data._id,
			name: data.name,
			brand: data.brand,
			image: data.image,
			price: data.price,
			stock: data.stock,
			packaking: data.packaking,
			qty,
		};

		dispatch(cartItemAdd(itemToAdd));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
};

export const removeCartItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(cartItemRemoval(id));
};

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const setPaymentMethodValue = (value) => async (dispatch) => {
	dispatch(setPaymentMethod(value));
};
export const setPaymentMethodCostValue = (value) => async (dispatch) => {
	dispatch(setPaymentMethodCost(value));
};


export const setSelectedShippingMethodPrice = (value) => async (dispatch) => {
	dispatch(setSelectedShippingMethod(value));
};


export const resetCart = () => (dispatch) => {
	dispatch(clearCart);
};
