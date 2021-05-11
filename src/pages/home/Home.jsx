import React, { useState, useEffect } from "react";
import { useSaveVideosContext } from "../../Context/SaveVideosContext";
import { useStatus } from "../../Context/LoaderContext";
import { Card } from "../../Components/Card";
import { Loader } from "../../Components/Loader";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel";
import { useRequest } from "../../utils";
import "./home.css";

export const Home = () => {
  const { request, getCancelToken } = useRequest();
  const { handleSaveVideoToggle } = useSaveVideosContext();
  const { status, setStatus } = useStatus();
  const [videosList, setVideosList] = useState();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();

  useEffect(() => {
    const cancelToken = getCancelToken();
    setStatus("PENDING");
    (async () => {
      const { success, data } = await request({
        method: "GET",
        endpoint: "/videos",
      });
      if (success) {
        setVideosList(data);
        setStatus("IDLE");
      }
    })();
    return () => {
      cancelToken.cancel();
    };
  }, []);
  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && (
        <section>
          <ul className="dis-grid videos-container">
            {videosList &&
              videosList.map((video) => (
                <Card
                  video={video}
                  setVideoToPlaylist={setVideoToPlaylist}
                  cardFor="EXPLORE_PAGE"
                  handleSaveVideoToggle={handleSaveVideoToggle}
                  key={video.id}
                />
              ))}
          </ul>
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
