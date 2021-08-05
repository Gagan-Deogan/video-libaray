import axios from "axios";
import { catchAxiosErr } from "utils";

export const updateDescriptions = async (description, playlistId) => {
  try {
    const res = await axios.put(`/playlists/${playlistId}`, {
      description,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
