import axios from 'axios';
import { setLoading, setNotification, setError } from '../slices/notification';

export const fetchNotification = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.get('/api/notifications');
        dispatch(setNotification(data));
    } catch (error) {
            dispatch(
                setError(
                  error.response && error.response.data
                    ? error.response.data
                    : error.message
                    ? error.message
                    : 'Egy ismeretlen hiba történt.'
                )
              );
        }
};

export const updateNotification = (message, isVisible) => async (dispatch, getState) => {
    dispatch(setLoading());

    try {
        const { user } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.userInfo.token}`,
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/notifications', { message, isVisible }, config);
        dispatch(setNotification(data.notification));
    } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Nem sikerült frissíteni az értesítést.'));
    }
};
