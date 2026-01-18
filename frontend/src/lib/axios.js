import axios from "axios"

// in production, there's no localhost so we have to make this dynamic.
// const BASE_URL  = import.meta.env.MODE === "development" ? "http://localhost:6767/api" : "/api"
const BASE_URL  = "http://localhost:6767/api";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // Aktifkan global untuk domain Anda
});

// Pasang Interceptor hanya satu kali di sini
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Logika 401 Anda di sini
//         return Promise.reject(error);
//     }
// );

export default api;