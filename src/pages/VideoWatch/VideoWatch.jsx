import "./watch.css";
import { useState, useEffect } from "react";
import {
  SaveIcon,
  PlaylistAddIcon,
  LikeIcon,
  DislikeIcon,
} from "../../assests/icons/";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useLikedAndDisLikedVideosContext } from "../../Context/LikedAndDislikeVideosProvider";
import { useSaveVideosContext } from "../../Context/SaveVideosProvider";
import { useStatus } from "../../Context/LoaderContext";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel";
import { Loader } from "../../Components/Loader";
import { useRequest, ddmmmyyyy } from "../../utils";

const options = {
  controls: true,
};

export const VideoWatch = () => {
  const { id } = useParams();
  const { request } = useRequest();
  const { status, setStatus } = useStatus();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  const [videoDetails, setVideoDetails] = useState();
  const {
    likedVideos,
    disLikedVideos,
    handleLikeToggle,
    handleDislikeToggle,
  } = useLikedAndDisLikedVideosContext();
  const { handleSaveVideoToggle } = useSaveVideosContext();

  useEffect(() => {
    setStatus("PENDING");
    (async () => {
      const { items } = await request({
        endpoint: "videos?part=snippet&part=statistics&id=" + id,
        method: "GET",
      });
      if (items) {
        setStatus("IDLE");
        setVideoDetails(items[0]);
      }
    })();
  }, []);

  const isInList = (videosList, videoId) => {
    return !!videosList.find((video) => video.id === videoId);
  };
  const isLiked = isInList(likedVideos, videoDetails?.id);
  const isDisLiked = isInList(disLikedVideos, videoDetails?.id);
  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && (
        <section className="column padding-8 w8 sm-w12">
          {videoDetails && (
            <div className="card bor-rad-8 video-container ">
              <div className="video-player w12 bor-rad-8 ovr-flw-hide">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  {...options}
                  width="100%"
                  height="100%"
                />
              </div>
              <h3 className="margin-t-16 margin-l-8">
                {videoDetails.snippet.title}
              </h3>
              <div className="row w12">
                <div className="row w6 justify-start align-center">
                  <h6 className="gry margin-l-8">
                    {videoDetails.statistics.viewCount} views •{" "}
                    {ddmmmyyyy(videoDetails.snippet.publishedAt)}
                  </h6>
                </div>
                <div className="row w6 justify-end">
                  <button
                    className="btn-link margin-8"
                    onClick={() => setVideoToPlaylist(videoDetails)}>
                    <PlaylistAddIcon />
                  </button>
                  <button
                    className="btn-link margin-8"
                    onClick={() => handleSaveVideoToggle({ videoDetails })}>
                    <SaveIcon />
                  </button>
                  <button
                    className="btn-link margin-8"
                    onClick={() =>
                      handleLikeToggle({ videoDetails, toggleType: !isLiked })
                    }>
                    <LikeIcon isActive={isLiked} />
                  </button>
                  <button
                    className="btn-link margin-8"
                    onClick={(e) =>
                      handleDislikeToggle({
                        videoDetails,
                        toggleType: !isDisLiked,
                      })
                    }>
                    <DislikeIcon isActive={isDisLiked} />
                  </button>
                </div>
              </div>
              <h6 className="margin-l-8">
                {videoDetails.snippet.description.slice(0, 250)}
              </h6>
            </div>
          )}
          {vidoeToPlaylist && (
            <AddToPlaylistModel
              vidoeToPlaylist={vidoeToPlaylist}
              setVideoToPlaylist={setVideoToPlaylist}
            />
          )}
        </section>
      )}
    </>
  );
};
