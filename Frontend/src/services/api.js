import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headrs: {
    "Content-Type": "application/json",
  },
});

export const signupAPI = async (userData)=>{
    const response =  await api.post('/auth/signup', userData);
    return response
}

export const loginAPI = async (credintials)=>{
    const response =  await api.post('/auth/login', credintials);
    return response
}
