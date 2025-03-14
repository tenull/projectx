import { createSlice } from '@reduxjs/toolkit';

const calculateSubtotal = (cartState) => {
    return cartState.reduce((acc, item) => acc + item.qty * item.price, 0);
};

export const initialState = {
    loading: false,
    error: null,
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ?? [],
    shipping: JSON.parse(localStorage.getItem('shipping')) ?? Number(4.99),
    paymentMethod: localStorage.getItem('paymentMethod') ?? null,
	paymentMethodCost: localStorage.getItem('paymentMethodCost') ?? null,
    subtotal: localStorage.getItem('cartItems') ? calculateSubtotal(JSON.parse(localStorage.getItem('cartItems'))) : 0,
	selectedShippingMethod: localStorage.getItem('selectedShippingMethod') ?? null,
};

const updateLocalStorage = (cart) => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('subtotal', JSON.stringify(calculateSubtotal(cart)));
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        cartItemAdd: (state, { payload }) => {
            const existingItem = state.cartItems.find((item) => item.id === payload.id);

            if (existingItem) {
                state.cartItems = state.cartItems.map((item) => (item.id === existingItem.id ? payload : item));
            } else {
                state.cartItems = [...state.cartItems, payload];
            }
            state.loading = false;
            state.error = null;
            updateLocalStorage(state.cartItems);
            state.subtotal = calculateSubtotal(state.cartItems);
        },
        cartItemRemoval: (state, { payload }) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== payload);
            updateLocalStorage(state.cartItems);
            state.subtotal = calculateSubtotal(state.cartItems);
            state.loading = false;
            state.error = null;
        },
        setShippingCosts: (state, { payload }) => {
            state.shipping = payload;
            localStorage.setItem('shipping', JSON.stringify(payload));
        },
        setPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload;
            localStorage.setItem('paymentMethod', payload);
        },
		setPaymentMethodCost: (state, { payload }) => {
            state.paymentMethodCost = payload;
            localStorage.setItem('paymentMethodCost', payload);
        },
		setSelectedShippingMethod: (state, { payload }) => {
            state.selectedShippingMethod = payload;
            localStorage.setItem('selectedShippingMethod', payload);
        },
        clearCart: (state) => {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('shipping');
            localStorage.removeItem('subtotal');
            localStorage.removeItem('paymentMethod');
			localStorage.removeItem('selectedShippingMethod');
            state.cartItems = [];
            state.shipping = Number(4.99);
            state.paymentMethod = null;
            state.subtotal = 0;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { 
    setError, 
    setLoading, 
    cartItemAdd, 
    cartItemRemoval, 
    setShippingCosts, 
    setPaymentMethod, 
	setPaymentMethodCost,
	setSelectedShippingMethod,
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
