import axios from "axios";
import { useAppContext } from "../context/appContext";

const { token } = useAppContext();
const authRequest = axios.create({
  baseURL: "/api/av1",
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 401) {
      console.log("AUTH ERROR");
    }
    return Promise.reject(error);
  }
);

export { authRequest };
