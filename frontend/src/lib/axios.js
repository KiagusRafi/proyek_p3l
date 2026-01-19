import axios from "axios"

// in production, there's no localhost so we have to make this dynamic.
const BASE_URL  = import.meta.env.MODE === "development" ? "http://localhost:6767/api" : `${import.meta.env.API_URL}/api`
// const BASE_URL  = "http://localhost:6767/api";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // Aktifkan global untuk domain Anda
});

export default api;