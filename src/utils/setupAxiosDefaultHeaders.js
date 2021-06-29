import axios from "axios";
const { REACT_APP_API_KEY } = process.env;
export const setupAxiosDefaultHeaders = (token) => {
  axios.defaults.baseURL = REACT_APP_API_KEY;
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  }
};
