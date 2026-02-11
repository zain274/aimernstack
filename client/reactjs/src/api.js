import axios from "axios";

// Yeh line check karti hai ke aap localhost par hain ya internet (AWS) par
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const api = axios.create({
  // Agar localhost hai toh 127.0.0.1 use hoga, warna jo bhi AWS ka current IP hai wo use hoga
  baseURL: isLocalhost 
    ? "http://localhost:8000/api" 
    : `http://${window.location.hostname}:8000/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;