import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export async function registerUser(userData){
    const response = await API.post("/auth/register", userData);
    return response.data;
}

export async function loginUser(userData){
    const response = await API.post("/auth/login", userData);
    return response.data;
}