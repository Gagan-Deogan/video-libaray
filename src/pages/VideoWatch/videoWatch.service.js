import axios from "axios";
import { catchAxiosErr } from "utils";

export const getVideoDetails = async (videoId) => {
  try {
    const res = await axios.get(`videos/${videoId}`);
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
