import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export async function registerUser(userData){
    const response = await API.post("/auth/register", userData);
    return response.data;
}

export async function loginUser(userData){
    const response = await API.post("/auth/login", userData);
    return response.data;
}