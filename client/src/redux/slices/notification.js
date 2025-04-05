import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    message: null,
    isVisible: false,
    loading: false, 
    error: true, 
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setNotification: (state, {payload}) => {
            state.message = payload; 
            state.loading = false; 
        },
        setError: (state, {payload}) => {
            state.error = payload 
            state.loading = false; 
        },
        setIsVisible: (state) => {
            state.isVisible = false; 
        },
    },
});

export const { setLoading, setNotification, setError,setIsVisible } = notificationSlice.actions;
export default notificationSlice.reducer;
export const notificationSelector = (state) => state.notification
