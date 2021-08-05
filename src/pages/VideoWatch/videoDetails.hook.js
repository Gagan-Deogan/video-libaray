import axios from "axios";
import { useQuery } from "react-query";

const fetchVideoDetails = (videoId) =>
  axios
    .get(`https://utopian-splicer-314615.el.r.appspot.com/videos/${videoId}`)
    .then((res) => res.data.data);

export const useVideo = (videoId) => {
  return useQuery(["products", videoId], () => fetchVideoDetails(videoId));
};
