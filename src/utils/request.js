import axios from "axios";
const { REACT_APP_API_KEY } = process.env;
const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: { "content-type": "application/json" },
});
export const useRequest = () => {
  const getCancelToken = () => axios.CancelToken.source();
  const request = async ({ method, endpoint, body = {}, cancelToken }) => {
    try {
      switch (method) {
        case "GET": {
          const res = await instance.get(
            "videos?part=snippet&part=statistics&id=" +
              endpoint +
              REACT_APP_API_KEY,
            body,
            {
              cancelToken: cancelToken,
            }
          );
          return res.data;
        }
        case "POST": {
          const res = await instance.post(endpoint, body);
          return res.data;
        }
        case "PUT": {
          const res = await instance.put(endpoint, body);
          return res.data;
        }
        case "DELETE": {
          const res = await instance.delete(endpoint);
          return res.data;
        }
        default:
          return null;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { request, getCancelToken };
};