import axios from "axios";

// Create an Axios instance
export const Axios = axios.create({
  baseURL: "http://localhost:5000/",
});

// Add a request interceptor to include the token from localStorage
Axios.interceptors.request.use(
  (config) => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem("token");

    // If the token is found, add it to the request headers
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Now, you can use the Axios instance for your requests, and the token will be included automatically if it exists in localStorage.

