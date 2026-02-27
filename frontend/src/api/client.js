import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/* ─── Categories & Topics ─── */

export const getCategories = () => api.get('/categories/');

export const getCategoryBySlug = (slug) => api.get(`/categories/${slug}/`);

export const getTopicBySlug = (slug) => api.get(`/topics/${slug}/`);

/* ─── Concepts (Editorial) ─── */

export const getConceptBySlug = (slug) => api.get(`/concepts/${slug}/`);

/* ─── Visualization ─── */

export const getVisualizationConfig = (conceptSlug) =>
    api.get(`/concepts/${conceptSlug}/visualization/`);

/* ─── Code Execution ─── */

export const executeCode = (payload) => api.post('/execute/', payload);

export default api;

