export const initial = { likedVideos: [], disLikedVideos: [] };

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_LIKE_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.concat([action.payload]),
      };
    case "REMOVE_FROM_LIKE_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (video) => video._id !== action.payload
        ),
      };
    case "ADD_TO_DISLIKE_VIDEOS":
      return {
        ...state,
        disLikedVideos: state.disLikedVideos.concat([action.payload]),
      };
    case "REMOVE_FROM_DISLIKE_VIDEOS":
      return {
        ...state,
        disLikedVideos: state.disLikedVideos.filter(
          (video) => video._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
