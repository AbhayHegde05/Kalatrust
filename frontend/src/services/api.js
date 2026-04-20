import axios from 'axios';

// Vite exposes environment variables on the `import.meta.env` object.
// This line correctly reads the variable from your .env.local file (for local)
// or from the Vercel environment variables (for production).
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Simple cache for GET requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 30000, // Reduced to 30 seconds
  headers: {
    'Accept': 'application/json',
    'Cache-Control': 'max-age=300', // 5 minute HTTP cache hint
  }
});

// Request interceptor for caching
api.interceptors.request.use((config) => {
  if (config.method === 'get') {
    const cacheKey = config.url;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      config.adapter = () => Promise.resolve({
        data: cached.data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    }
  }
  return config;
});

// Response interceptor to cache GET responses
api.interceptors.response.use((response) => {
  if (response.config.method === 'get') {
    cache.set(response.config.url, {
      data: response.data,
      timestamp: Date.now(),
    });
  }
  return response;
});

// --- PUBLIC API FUNCTIONS ---
export const getEvents = () => api.get('/events');
export const getEventBySlug = (slug) => api.get(`/events/${slug}`);
export const getGalleryMedia = () => api.get('/gallery');
export const submitReview = (slug, data) => api.post(`/events/${slug}/reviews`, data);
export const clearApiCache = () => cache.clear();

// --- ADMIN CRUD API FUNCTIONS ---
export const getAdminEvents = () => api.get('/admin/programs');
export const getAdminEvent = (id) => api.get(`/admin/programs/${id}`);
export const createAdminEvent = (data) => api.post('/admin/programs', data);
export const updateAdminEvent = (id, data) => api.put(`/admin/programs/${id}`, data);
export const deleteAdminEvent = (id) => api.delete(`/admin/programs/${id}`);

// --- ADMIN MEDIA API FUNCTIONS ---
export const uploadFile = (formData) => api.post('/admin/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const addMediaToEvent = (data) => api.post('/admin/media', data);
export const deleteMedia = (id) => api.delete(`/admin/media/${id}`);

export default api;