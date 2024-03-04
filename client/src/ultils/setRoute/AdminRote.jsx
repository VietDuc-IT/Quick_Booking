import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function AdminRoute() {
    const { currentUser } = useSelector((state) => state.user);
    if (!currentUser || !currentUser.role) {
        // Handle the case where currentUser or currentUser.role is null
        return <Navigate to="/" />;
    }
    return currentUser.role === 'Admin' ? <Outlet /> : <Navigate to="*" />;
}
