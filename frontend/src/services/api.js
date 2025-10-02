import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ensure this matches your backend port
  withCredentials: true,
});

// --- PUBLIC API FUNCTIONS ---
export const getEvents = () => api.get('/events');
export const getEventBySlug = (slug) => api.get(`/events/${slug}`);
export const getGalleryMedia = () => api.get('/gallery');

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