import axios from 'axios';

export const api_url = process.env.REACT_APP_API_URL || "http://localhost:8000"
export const client_url = process.env.REACT_APP_CLIENT_URL || "http://localhost:3000"
export const login_url = process.env.REACT_APP_LOGIN_URL || "api/login"
export const logout_url = process.env.REACT_APP_LOGOUT_URL || "api/logout"
export const csrf_token_url = process.env.REACT_APP_CSRF_TOKEN_URL || "/sanctum/csrf-cookie"
export const book_url = process.env.REACT_APP_BOOK_URL || "/api/book"

// IF axios.create not used, we set default config for axio, axios.defaults.withCredentials = true

const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Origin" : client_url
    },
    baseURL: api_url,
    withCredentials: true,
})

export default apiClient