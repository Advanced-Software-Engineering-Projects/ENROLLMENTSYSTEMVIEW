import axios from "axios";
 
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:7043",
});
 
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};
 
export default axiosInstance;