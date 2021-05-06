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
      const { items } = await request({
        method: "GET",
        endpoint:
          "/videos?part=snippet&part=statistics&chart=mostPopular&maxResults=50",
      });
      if (items.length) {
        setVideosList(items);
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
