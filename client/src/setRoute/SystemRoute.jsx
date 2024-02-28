import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function SystemRoute() {
    const { currentUser } = useSelector((state) => state.user);
    if (!currentUser || !currentUser.role) {
        // Handle the case where currentUser or currentUser.role is null
        return <Navigate to="/" />;
    }
    return <>{currentUser.role === 'Admin' || currentUser.role === 'User' ? <Outlet /> : <Navigate to="*" />}</>;
}
