import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';

const ProtectedAdminRoute = () => {
    const { authUser, loading } = useAuth();

    if (loading) return null; // Atau spinner/loading bar

    // Jika tidak ada user, tendang ke login
    if (!authUser) {
        return <Navigate to="/admin/login" replace />;
    }

    // Jika ada user, tampilkan komponen anak (nested routes)
    return <Outlet />;
};

export default ProtectedAdminRoute;