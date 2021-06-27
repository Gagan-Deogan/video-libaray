import axios from "axios";
import { catchAxiosErr } from "utils";

export const gethomeVideo = async () => {
  try {
    const res = await axios.get("/videos");
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
