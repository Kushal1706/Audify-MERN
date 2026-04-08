import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000,
});

API.interceptors.request.use((config) => {
    console.log("Interceptor running for:", config.url);
    const token = localStorage.getItem("audify_token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
   },
   (error) =>{
    console.log("Interceptor error:", error);
    return Promise.reject(error);
   }
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("Response error:", error.message);
      console.log("Response error details:", error.response?.data);
      console.log("Response status:", error.response?.status);
      return Promise.reject(error);
    }
);

export async function fetchBooks(search="", category=""){
    const params = {};
    if(search) params.search = search;
    if(category) params.category = category;
    const response = await API.get("/books", { params });
    return response.data.books;
}

export async function toggleLikeBook(bookId){
    const response = await API.put(`/books/${bookId}/like`);
    return response.data;
}

export async function uploadFile(file, type){
    console.log("uploadFile called:", type, file.name, file.size);

    const formData = new FormData();
    const fieldName = type === "cover" ? "coverImage" : "audioFile";
    formData.append(fieldName,file);

    console.log("Sending to:", `/upload/${type}`);

    const response = await API.post(`/upload/${type}`, formData, {
        headers: {
            "content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function createBook(bookData){
    const response = await API.post("/books",bookData);
    return response.data;
}

export async function fetchLikedBooks(){
    const response = await API.get("/books/liked");
    return response.data;
}

export async function fetchMyBooks(){
    const response=await API.get("/books/my-books");
    return response.data;
}
