import axios from "axios";
import { catchAxiosErr } from "utils";

export const updatePlaylist = async (playlistId, videoId) => {
  try {
    const res = await axios.post(`/playlists/${playlistId}/${videoId}`);
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};

export const createNewPlaylist = async (name) => {
  try {
    const res = await axios.post(`/playlists/create`, {
      name,
    });
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};

export const removePlaylist = async (playlistId) => {
  try {
    const res = await axios.delete(`/playlists/${playlistId}`);
    return res.data;
  } catch (err) {
    return catchAxiosErr(err);
  }
};
