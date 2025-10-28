import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headrs: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const signupAPI = async (userData) => {
  const data = await api.post("/auth/signup", userData);
  return data;
};

export const loginAPI = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data; // Make sure this returns response.data, not just response
};

export const getRestaurantsAPI = async () => {
  const response = await api.get("/restaurants");
  return response.data.restaurants;
};

export const getRestaurantByIdAPI = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data.restaurant;
};

export const getMenuItemsAPI = async (restaurantId) => {
  const response = await api.get(`/menu-items/restaurant/${restaurantId}`);
  return response.data;
};

// Order APIs
export const createOrderAPI = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getUserOrdersAPI = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};

export const getOrderByIdAPI = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};
