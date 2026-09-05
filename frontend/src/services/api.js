import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-expired'));
    }
    return Promise.reject(error);
  }
);

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';

export const authService = {
  async register(data) {
    try {
      const res = await api.post('/auth/register', data);
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async login(data) {
    try {
      const res = await api.post('/auth/login', data);
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async getMe() {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export const recipeService = {
  async getRecipes(params = {}) {
    try {
      const res = await api.get('/recipes', { params });
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async getRecipeById(id) {
    try {
      const res = await api.get(`/recipes/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async getMyRecipes() {
    try {
      const res = await api.get('/recipes/mine');
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async createRecipe(data) {
    try {
      const res = await api.post('/recipes', data);
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async deleteRecipe(id) {
    try {
      const res = await api.delete(`/recipes/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
  async rateRecipe(id, value) {
    try {
      const res = await api.post(`/recipes/${id}/rate`, { value });
      return res.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default api;