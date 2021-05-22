export const getUserfeels = ({ prefrenceVideos, videoId }) => {
  const selectedPrefrence = prefrenceVideos.length
    ? prefrenceVideos.find((prefrence) => prefrence.video._id === videoId)
    : null;
  return selectedPrefrence ? selectedPrefrence.feels : null;
};
