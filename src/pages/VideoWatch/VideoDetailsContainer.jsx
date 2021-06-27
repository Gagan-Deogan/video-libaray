import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { AddToPlaylistModal } from "common-components/AddToPlaylistModal";
import {
  hhmmss,
  updatePlaylist,
  selectPlaylistandFindVideoPresent,
} from "utils";
import { SaveIcon, PlaylistAddIcon, LikeIcon } from "assests/icons";
import { usePlaylist } from "context/PlaylistProvider";
import { debounce } from "utils";
export const VideoDetailsContainer = ({ videoDetails, setVideoPlayed }) => {
  const {
    _id,
    ytId,
    title,
    description,
    publishedAt,
    views,
    thumbnails,
  } = videoDetails;
  const [videoToPlaylist, setVideoToPlaylist] = useState();
  const {
    playlists,
    savedVideosPlaylistId,
    likeVideosPlaylistId,
    playlistDispatch,
  } = usePlaylist();

  const isAlreadySaved = selectPlaylistandFindVideoPresent(
    playlists,
    savedVideosPlaylistId,
    _id
  );
  const isAlreadyLiked = selectPlaylistandFindVideoPresent(
    playlists,
    likeVideosPlaylistId,
    _id
  );
  const handleToogleVideoFromPlaylist = async (playlistId) => {
    playlistDispatch({
      type: "TOOGLE_VIDEO_FROM_PLAYLIST",
      payload: {
        playlistId,
        video: { _id, ytId, title, description, thumbnails },
      },
    });
    const res = await updatePlaylist(playlistId, videoDetails._id);
    if (!("data" in res)) {
      playlistDispatch({
        type: "TOOGLE_VIDEO_FROM_PLAYLIST",
        payload: {
          playlistId,
          video: { ytId, title, description, thumbnails },
        },
      });
    }
  };
  const betterHandleToogleVideoFromPlaylist = debounce(
    handleToogleVideoFromPlaylist,
    500
  );

  return (
    <>
      <div className="card bor-rad-8 video-container ">
        <div className="video-player w12 bor-rad-8 ovr-flw-hide">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${ytId}`}
            controls={true}
            width="100%"
            height="100%"
            onProgress={(progress) => {
              setVideoPlayed(hhmmss(progress.played));
            }}
          />
        </div>
        <h3 className="margin-t-16 margin-l-8">{title}</h3>
        <div className="row w12">
          <div className="row w6 justify-start align-center">
            <h6 className="gry margin-l-8">
              {views} views • {publishedAt}
            </h6>
          </div>
          <div className="row w6 justify-end">
            <button
              className="btn-link margin-8"
              onClick={() => setVideoToPlaylist(videoDetails)}>
              <PlaylistAddIcon />
            </button>
            <button
              className={`btn-link margin-8 ${
                isAlreadySaved && "text-primary"
              }`}
              onClick={() =>
                betterHandleToogleVideoFromPlaylist(savedVideosPlaylistId)
              }>
              <SaveIcon />
            </button>
            <button
              className={`btn-link margin-8 ${
                isAlreadyLiked && "text-primary"
              }`}
              onClick={() =>
                betterHandleToogleVideoFromPlaylist(likeVideosPlaylistId)
              }>
              <LikeIcon />
            </button>
          </div>
        </div>
        <h6 className="padding-8 padding-b-16">{description}</h6>
      </div>
      {videoToPlaylist && (
        <AddToPlaylistModal
          videoToPlaylist={videoToPlaylist}
          setVideoToPlaylist={setVideoToPlaylist}
        />
      )}
    </>
  );
};
