import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLayout from '../components/AdminLayout';
const AdminScreen = () => {

    const { userInfo } = useSelector((state) => state.user);
    const {  loading, orders } = useSelector((state) => state.admin);
    const location = useLocation();


    return userInfo && userInfo.isAdmin ? (
        <AdminLayout orders={orders} loading={loading} />
    ) : (
        <Navigate to="/" replace state={{ from: location }} />
    );
};

export default AdminScreen;
