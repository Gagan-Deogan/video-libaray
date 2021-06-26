const DefaultPlaylists = ["Saved Videos", "Liked Videos"];

export const getAllPlaylistNameAndIsVideoAlreadyIncluded = (
  playlists,
  videoToPlaylist
) => {
  const reducer = (acc, val) => {
    if (DefaultPlaylists.includes(val.name)) {
      return acc;
    }
    const isAlreadyIncluded = !!val.videos.find(
      (video) => video._id === videoToPlaylist._id
    );
    return [].concat(acc, [
      { _id: val._id, name: val.name, isAlreadyIncluded },
    ]);
  };
  return playlists.reduce(reducer, []);
};
