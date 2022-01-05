import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL
if (typeof baseURL !== "string") {
  throw new Error("API_BASE_URL is not set");
}

const client = axios.create({
  baseURL
});

export default client;
