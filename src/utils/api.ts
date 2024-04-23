import { apiKey, apiUrl } from "@src/Config";
import axios from "axios";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "x-api-key": apiKey,
  }
});

export default api;
