import React, { useState, useEffect } from "react";
import { Card } from "../../Components/Card";
import { useRequest } from "../../utils/request";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel/";
import "./home.css";
import { useSaveVideosContext } from "../../Context";

export const Home = () => {
  const { request, getCancelToken } = useRequest();
  const [videosList, setVideosList] = useState();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  useEffect(() => {
    const cancelToken = getCancelToken();
    (async () => {
      const { items } = await request({
        method: "GET",
        endpoint:
          "/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50",
      });
      if (items.length) {
        setVideosList(items);
      }
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
