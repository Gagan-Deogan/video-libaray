import { playlistNamesNotShowInAddTo } from "constants/index";

export const removeCommonPlaylist = (playlists) => {
  return playlists.filter(
    (playlist) => !playlistNamesNotShowInAddTo.includes(playlist.name)
  );
};

export const getPlaylistsWithIsIncludedFlag = (playlists, videoToPlaylist) => {
  const reducer = (acc, val) => {
    const isAlreadyIncluded = !!val.videos.find(
      (video) => video._id === videoToPlaylist._id
    );
    return [].concat(acc, [
      { _id: val._id, name: val.name, isAlreadyIncluded },
    ]);
  };
  return playlists.reduce(reducer, []);
};

export const getPlaylistById = (playlists, playlistId) => {
  return playlists.find((playlist) => playlist._id === playlistId);
};

export const getVideoNotesByVideoId = (playlist, videoId) => {
  const selectedVideo = playlist.videos.find((video) => video._id === videoId);
  return selectedVideo ? selectedVideo.notes : [];
};

export const getPlaylistIdByName = (playlists, name) => {
  const selectedPlaylist = playlists.find((playlist) => playlist.name === name);
  return selectedPlaylist?._id;
};

export const checkVideoPresentInPlaylist = (playlist, videoId) => {
  return !!playlist.videos.find((video) => video._id === videoId);
};

export const selectPlaylistandFindVideoPresent = (
  playlists,
  playlistId,
  videoId
) => {
  const selectedPlaylist = playlists.find(
    (playlist) => playlist._id === playlistId
  );
  return checkVideoPresentInPlaylist(selectedPlaylist, videoId);
};
