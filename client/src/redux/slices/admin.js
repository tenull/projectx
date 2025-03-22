import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	error: null,
	userList: null,
	userRemoval: false,
	orders: null,
	orderRemoval: false,
	deliveredFlag: false,
	orderUpdate:false,
	userAdmin:false
};

export const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = false;
		},
		setError: (state, { payload }) => {
			state.error = payload;
			state.loading = false;
		},
		getUsers: (state, { payload }) => {
			state.userList = payload;
			state.error = null;
			state.loading = false;
		},
		getOrders: (state, { payload }) => {
			state.orders = payload;
			state.error = null;
			state.loading = false;
		},
		userDelete: (state) => {
			state.error = null;
			state.loading = false;
			state.userRemoval = true;
		},
		userIsAdmin: (state, action) => {
			state.error = null;
			state.loading = false;
			state.userAdmin = action.payload.isAdmin;
		},
		
		orderDelete: (state) => {
			state.error = null;
			state.loading = false;
			state.orderRemoval = true;
		},
		resetError: (state) => {
			state.error = null;
			state.loading = false;
			state.userRemoval = false;
			state.deliveredFlag = false;
			state.orderRemoval = false;
		},
		setDeliveredFlag: (state) => {
			state.deliveredFlag = true;
			state.loading = false;
		},
		setOrderFlag:(state)=>{
			state.orderUpdate = true;
			state.loading=false;
		}
	},
});

export const { setDeliveredFlag, setError, setLoading, resetError, getOrders, getUsers, userDelete,userIsAdmin, orderDelete,setOrderFlag } =
	adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
