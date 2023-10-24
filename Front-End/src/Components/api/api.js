import axios from "axios";

// Define your Axios instance
export const Axios = axios.create({
  baseURL: "https://sdp-project-three.vercel.app/",
//   baseURL: "http://localhost:5000/",
});
