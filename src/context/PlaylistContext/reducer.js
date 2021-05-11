import { uuidv4 } from "../../utils";
export const initialPlaylist = [
  { _id: uuidv4(), name: "My playlist", description: "", videos: [] },
];

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_VIDEO_TO_PLAYLIST":
      return state.map((playlist) =>
        playlist._id === action.payload.playlistId
          ? {
              ...playlist,
              videos: playlist.videos.concat(action.payload.video),
            }
          : playlist
      );
    case "REMOVE_VIDEO_FROM_PLAYLIST":
      return state.map((playlist) =>
        playlist._id === action.payload.playlistId
          ? {
              ...playlist,
              videos: playlist.videos.filter(
                (video) => video._id !== action.payload.video._id
              ),
            }
          : playlist
      );
    case "CREATE_PLAYLIST":
      return state.concat([{ name: action.payload, id: uuidv4(), videos: [] }]);
    case "EDIT_DESCRIPTION":
      return state.map((playlist) =>
        playlist._id === action.payload.playlistId
          ? { ...playlist, description: action.payload.description }
          : playlist
      );
    default:
      return state;
  }
};
