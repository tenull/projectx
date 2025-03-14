import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../components/AdminLayout';

const AdminScreen = () => {
    const { userInfo } = useSelector((state) => state.user);
    const { error, loading, orders, deliveredFlag, orderRemoval } = useSelector((state) => state.admin);
    const location = useLocation();

    return userInfo && userInfo.isAdmin ? (
        <AdminLayout />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default AdminScreen;
