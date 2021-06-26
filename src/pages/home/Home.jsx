import React, { useState, useEffect } from "react";
import { useSaveVideosContext } from "context/SaveVideosProvider";
import { useStatus } from "context/LoaderProvider";
import { Card } from "components/Card";
import { Loader } from "components/Loader";
import { AddToPlaylistModel } from "components/AddToPlaylistModel";
import { useRequest } from "utils";
import "./home.css";

export const Home = () => {
  const { request, getCancelToken } = useRequest();
  const { handleSaveVideoToggle } = useSaveVideosContext();
  const { status, setStatus } = useStatus();
  const [videosList, setVideosList] = useState();
  const [videoToPlaylist, setVideoToPlaylist] = useState();

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
                  key={video._id}
                />
              ))}
          </ul>
          {videoToPlaylist && (
            <AddToPlaylistModel
              videoToPlaylist={videoToPlaylist}
              setVideoToPlaylist={setVideoToPlaylist}
            />
          )}
        </section>
      )}
    </>
  );
};
