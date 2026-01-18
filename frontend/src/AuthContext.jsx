import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

import api from "./lib/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Fungsi Cek Auth Saat Refresh
        const checkAuth = async () => {
            try {
                // Cek ke server apakah cookie token masih valid & belum ditendang
                // const res = await axios.get('http://localhost:6767/api/auth/me');
                const res = await api.get('/auth/me');
                setAuthUser(res.data);
            } catch (err) {
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();

        // 2. Setup Interceptor untuk menangkap error 401 di masa depan
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    setAuthUser(null); // Ini yang paling penting, memicu sistem proteksi React

                    // Cek apakah user TIDAK sedang di halaman login
                    const isAtLoginPage = window.location.pathname === '/admin/login';

                    if (!isAtLoginPage) {
                        alert("Sesi Anda berakhir atau Admin lain telah login.");
                        // Tidak perlu window.location.href di sini! 
                        // ProtectedAdminRoute akan menangani perpindahan halamannya.
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook untuk memudahkan pemanggilan
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider");
    }
    return context;
};