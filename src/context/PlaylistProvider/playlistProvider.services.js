import axios from "axios";
import { catchAxiosErr } from "utils";

export const getUserPlaylist = async () => {
  try {
    const res = await axios.get("/playlists");
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
