import axios from "axios";
export const setupAxiosDefaultHeaders = (token) => {
  axios.defaults.baseURL = "http://localhost:8080";
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};
