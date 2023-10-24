import axios from "axios";

// Define your Axios instance
export const Axios = axios.create({
  baseURL: "https://sdp-back.onrender.com/",
  // baseURL: "http://localhost:5000/",
});
