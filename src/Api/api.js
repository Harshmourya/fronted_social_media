import axios from "axios";

const API = axios.create({
  baseURL: "http://34.133.240.60/",
  headers: { "Content-Type": "application/json" },

});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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


// Like API
export const addlike = (postId) => API.put('/post/addLike', { postId });

//Pofile APIs
export const userProfile = () => API.get("/student/getMyProfile");
export const updateProfile = (userData) => API.put("/student/updateProfile", userData, {
  headers: { "Content-Type": "multipart/form-data" },
});


// Comment APIs
export const getComments = (postId) => API.get(`/comment/getAllCommentbyPost/${postId}`);
export const createComment = ({ postId, text }) =>
  API.post(`/comment/addcomment`, { postId, text });

// Conversations (if needed)
export const getConversations = (userId) => API.get(`/conversations/${userId}`);
