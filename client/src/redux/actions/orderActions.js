import axios from 'axios';
import { setError, setShippingAddress, setBillingAddress, clearOrder } from '../slices/order';

export const setAddress = (data) => (dispatch) => {
	dispatch(setShippingAddress(data));
};

export const setBillAddress = (data) => (dispatch) => {
	dispatch(setBillingAddress(data));
};

export const setPayment = () => async (dispatch, getState) => {
	const {
	  cart: { cartItems, subtotal, shipping, packaking, paymentMethod, selectedShippingMethod, paymentMethodCost },
	  order: { shippingAddress },
	  user: { userInfo },
	} = getState();
  
	const newOrder = { subtotal, shipping, shippingAddress, cartItems, userInfo, paymentMethod, packaking, selectedShippingMethod, paymentMethodCost };
	
	try {
	  const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
	  
	  // Ha bankkártyás fizetést választottak, akkor Barion API hívás
	  if (paymentMethod === 'credit_card') {
		const { data } = await axios.post('/api/checkout', newOrder, config);
  
		// Itt irányítjuk a felhasználót a Barion oldalra
		window.location.assign(data.url);
	  } else {
		// Ha banki átutalás, akkor a siker oldalra irányítunk
		const { data } = await axios.post('/api/successpayment', newOrder, config);
  
		// Az adatot itt lehetne validálni, például a sikeres rendelés megerősítésére
		window.location.assign('/sikeres');
	  }
	} catch (error) {
		console.error("Hiba a checkout hívásnál:", error.response?.data || error);
	  dispatch(setError(
		error.response && error.response.data
		  ? error.response.data
		  : error.message
		  ? error.message
		  : 'An unexpected error has occured. Please try again later.'
	  ));
	}
  };
  