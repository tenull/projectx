import axios from 'axios';
import { setProducts, setProductUpdateFlag, setReviewRemovalFlag } from '../slices/product';
import {
	setDeliveredFlag,
	setError,
	setLoading,
	resetError,
	getOrders,
	getUsers,
	userDelete,
	orderDelete,
	setOrderFlag,
	userIsAdmin,
	setPaidFlag
} from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
	try {
		const { data } = await axios.get('/api/users', config);
		console.log(data)
		dispatch(getUsers(data));
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		const { data } = await axios.delete(`/api/users/${id}`, config);
		dispatch(userDelete(data));
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const getAllOrders = () => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		const { data } = await axios.get('/api/orders', config);
		dispatch(getOrders(data));
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const deleteOrder = (id) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		const { data } = await axios.delete(`/api/orders/${id}`, config);
		dispatch(orderDelete(data));
		dispatch(setOrderFlag())
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const setDelivered = (id) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		await axios.put(`/api/orders/${id}`, {}, config);
		dispatch(setDeliveredFlag());
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};
export const setPaid = (id) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		await axios.put(`/api/orders/${id}/paid`, {}, config);
		dispatch(setPaidFlag());
	} catch (error) {
		setError(
			error.response && error.response
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const resetErrorAndRemoval = () => async (dispatch) => {
	dispatch(resetError());
};

export const updateProduct =
	(
		name,
		price,
		brand,
		stock,
		description,
		ingredients,
		image,
		packingOf,
		cookingTime,
		packaking,
		packing,
		productIsNew,
		nutrionalValue,
		type,
		productId
	) => async (dispatch, getState) => {
		setLoading();
		const {
			user: { userInfo },
		} = getState();

		const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

		try {
			const { data } = await axios.put(
				`/api/products/${productId}`,
				{
					name,
					price,
					brand,
					stock,
					description,
					ingredients,
					image,
					packingOf,
					cookingTime,
					packaking,
					packing,
					productIsNew,
					nutrionalValue, 
					type,
					productId
				},
				config
			);
			dispatch(setProducts(data));
			dispatch(setProductUpdateFlag());
		} catch (error) {
			dispatch(setError(
				error.response && error.response.data
					? error.response.data
					: error.message
					? error.message
					: 'An expected error has occurred. Please try again later.'
			));
		}
	};

export const deleteProduct = (id) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		const { data } = await axios.delete(`/api/products/${id}`, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());
		dispatch(resetError());
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

	try {
		const { data } = await axios.post(`/api/products`, newProduct, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
	setLoading();
	const {
		user: { userInfo },
	} = getState();

	const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
	console.log('asdfdsaf');
	try {
		const { data } = await axios.put(`/api/products/${productId}/${reviewId}`, {}, config);
		dispatch(setProducts(data));
		dispatch(setReviewRemovalFlag());
	} catch (error) {
		setError(
			error.response && error.response.data
				? error.response.data
				: error.message
				? error.message
				: 'An expected error has occured. Please try again later.'
		);
	}
};


export const updateUser = (id, updatedData) => async (dispatch, getState) => {
    try {
        dispatch(setLoading());

        const {
            user: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(`/api/users/${id}`, updatedData, config);

        dispatch(userIsAdmin(data.user)); 
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data
                ? error.response.data
                : error.message || 'Ismeretlen hiba történt.'
        ));
    }
};


export const checkAndSetPaid = (orderId) => async (dispatch, getState) => {
    setLoading();
    const {
        user: { userInfo },
    } = getState();

    const config = {
        headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' }
    };

    try {
        // Lekérdezzük a rendelés státuszát a backendből (ami ellenőrzi a Barion státuszát)
        const { data } = await axios.get(`/api/orders/${orderId}`, config);

        if (data.isPaid) {
            dispatch(setPaidFlag());
        } else {
            alert('A rendelés még nincs kifizetve Barion szerint.');
        }
    } catch (error) {
        setError(
            error.response && error.response.data
                ? error.response.data
                : error.message
                ? error.message
                : 'Hiba történt a fizetési státusz ellenőrzésekor.'
        );
    }
};
