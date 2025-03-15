import {
	setProducts,
	setLoading,
	setError,
	setPagination,
	setFavorites,
	setFavoritesToggle,
	setProduct,
	productReviewed,
	resetError,
	setProductDetails
} from '../slices/product';
import axios from 'axios';

export const getProducts = (page, favouriteToggle, keyword = '') => async (dispatch) => {
	dispatch(setLoading());
	try {
	  const { data } = await axios.get(`/api/products/${page}/${10}`, {
		params: { keyword }, // Itt adjuk át helyesen a keyword paramétert
	  });
	  
	  const { products, pagination } = data;
	  dispatch(setProducts(products));
	  dispatch(setPagination(pagination));
	} catch (error) {
	  dispatch(
		setError(
		  error.response?.data?.message || error.message || 'An unexpected error has occurred. Please try again later.'
		)
	  );
	}
  };

export const addToFavorites = (id) => async (dispatch, getState) => {
	const {
		product: { favorites },
	} = getState();

	const newFavorites = [...favorites, id];
	localStorage.setItem('favorites', JSON.stringify(newFavorites));
	dispatch(setFavorites(newFavorites));
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
	const {
		product: { favorites },
	} = getState();

	const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
	localStorage.setItem('favorites', JSON.stringify(newFavorites));
	dispatch(setFavorites(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
	const {
		product: { favorites, products },
	} = getState();

	if (toggle) {
		const filteredProducts = products.filter((product) => favorites.includes(product._id));
		dispatch(setFavoritesToggle(toggle));
		dispatch(setProducts(filteredProducts));
	} else {
		dispatch(setFavoritesToggle(false));
		dispatch(getProducts(1));
	}
};

export const getProduct = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch(setProduct(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
};

export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();
	try {
		const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };

		await axios.post(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);
		dispatch(productReviewed(true));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'An expected error has occured. Please try again later.'
			)
		);
	}
};

export const resetProductError = () => async (dispatch) => {
	dispatch(resetError());
};



export const getProductDetails = (id) => async (dispatch, getState) => {
	dispatch(setLoading());

	try {
		const { data } = await axios.get(`/api/products/${id}`);
		dispatch(setProductDetails(data));
	} catch (error) {
		dispatch(setError(
			error.response && error.response.data.message
				? error.response.data.message
				: 'Failed to fetch product details'
		));
	}
};
