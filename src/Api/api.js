import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// // Authentication APIs
// export const registerUser = (userData) => API.post("/student/register", userData);
// export const OtpVerification = (credentials) => API.post("/student/verify-otp", credentials);
// export const loginUser = (credentials) => API.post("/student/login", credentials);

// // Post APIs
// export const getPosts = () => API.get("/posts/getPosts");
// export const getPostById = (id) => API.get(`/posts/${id}`);
// export const createPost = (postData) =>
//   API.post("/posts/createPost", postData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
// // Comment APIs
// export const getComments = (postId) => API.get(`/comment/${postId}`);
// export const createComment = (postId, commentData) => API.post(`/comment/${postId}`, commentData);

// export const getConversations = (userId) => API.get(`/conversations/${userId}`);

// Authentication APIs
export const registerUser = (userData) => API.post("/student/register", userData);
export const otpVerification = (credentials) => API.post("/student/verify-otp", credentials);
export const loginUser = (credentials) => API.post("/student/login", credentials);

// Post APIs
export const getPosts = () => API.get("/post/getPosts");
export const getPostById = (id) => API.get(`/post/getPostbyMe`);
export const createPost = (postData) =>
  API.post("/post/createPost", postData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deletePost = (postId) => API.delete(`/post/deletePost/${postId}`);

// Comment APIs
export const getComments = (postId) => API.get(`/comment/${postId}`);
export const createComment = (postId, commentData) => API.post(`/comment/${postId}`, commentData);

// Conversations (if needed)
export const getConversations = (userId) => API.get(`/conversations/${userId}`);
