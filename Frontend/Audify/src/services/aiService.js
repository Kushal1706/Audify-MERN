import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("audify_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function fetchBookSummary(title, author, description){
    const response = await API.post("/ai/summary",{
        title,
        author,
        description,
    });
    return response.data;
}

export async function fetchRecommendations(likedBooks){
    const response = await API.post("/ai/recommendations",{
        likedBooks,
    });
    return response.data;
}