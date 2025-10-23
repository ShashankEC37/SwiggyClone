import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headrs: {
    "Content-Type": "application/json",
  },
});

export const signupAPI = async (userData) => {
  const data = await api.post("/auth/signup", userData);
  return data;
};

export const loginAPI = async (credintials) => {
  const response = await api.post("/auth/login", credintials);
  return response;
};

export const getRestaurantsAPI = async () => {
  const response = await api.get("/restaurants");
  return response.data.restaurants;
};

export const getRestaurantByIdAPI = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data.restaurant;
};
