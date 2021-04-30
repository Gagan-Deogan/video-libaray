import React, { useState, useEffect } from "react";
import { Card } from "../../Components/Card";
import axios from "axios";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel/";
import "./home.css";
import { useSaveVideosContext } from "../../Context";

export const Home = () => {
  const [videosList, setVideosList] = useState();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    (async () => {
      const {
        data: { items },
      } = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50&key=AIzaSyBsZof6jxUT9CDKHcp4QVQWOcB-95uDKxg"
      );
      setVideosList(items);
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);
  const { saveDispatch } = useSaveVideosContext();
  const handleAddTOSave = (video) => {
    saveDispatch({ type: "ADD_TO_SAVE", payload: video });
  };
  return (
    <>
      <section>
        <ul className="dis-grid videos-container">
          {videosList &&
            videosList.map((video) => (
              <Card
                video={video}
                setVideoToPlaylist={setVideoToPlaylist}
                cardFor="EXPLORE_PAGE"
                handleAddTOSave={handleAddTOSave}
                key={video.id}
              />
            ))}
        </ul>
      </section>
      {vidoeToPlaylist && (
        <AddToPlaylistModel
          vidoeToPlaylist={vidoeToPlaylist}
          setVideoToPlaylist={setVideoToPlaylist}
        />
      )}
    </>
  );
};
