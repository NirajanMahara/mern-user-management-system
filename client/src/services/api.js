import axios from 'axios';

/**
 * API Configuration
 * Sets up axios instance with base URL and interceptors
 */
const API_URL = 'http://localhost:5000/api/users';

// Create axios instance with custom config
const api = axios.create({
    baseURL: API_URL,
});

/**
 * Request Interceptor
 * Adds authorization token to requests if available
 */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/**
 * Response Interceptor
 * Handles API errors globally
 */
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

/**
 * Authentication APIs
 */
export const login = (credentials) => api.post('/login', credentials);
export const register = (userData) => api.post('/register', userData);

/**
 * User Management APIs
 */
export const getAllUsers = () => api.get('/all');
export const updateUser = (id, userData) => api.put(`/${id}`, userData);
export const deleteUser = (id) => api.delete(`/${id}`);
export const deleteBatchUsers = (ids) => api.post('/batch-delete', { ids });

export default api; 