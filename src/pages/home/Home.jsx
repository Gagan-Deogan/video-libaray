import React, { useState, useEffect } from "react";
import { Card } from "common-components/Card";
import { Loader } from "common-components/Loader";
import { AddToPlaylistModal } from "common-components/AddToPlaylistModal";
import { gethomeVideo } from "./home.service";
import { Error } from "common-components/Error";
import "./home.css";
export const Home = () => {
  const [status, setStatus] = useState("IDLE");
  const [videosList, setVideosList] = useState();
  const [videoToPlaylist, setVideoToPlaylist] = useState();

  useEffect(() => {
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const res = await gethomeVideo();
        if ("data" in res) {
          setStatus("FUllFILLED");
          setVideosList(res.data);
        } else {
          setStatus("ERROR");
        }
      })();
    }
  }, [setStatus, status]);
  return (
    <>
      {status === "PENDING" && <Loader />}
      {status === "FUllFILLED" && (
        <section>
          <ul className="dis-grid videos-container">
            {videosList &&
              videosList.map((video) => (
                <Card
                  video={video}
                  setVideoToPlaylist={setVideoToPlaylist}
                  cardFor="EXPLORE_PAGE"
                  key={video._id}
                />
              ))}
          </ul>
          {videoToPlaylist && (
            <AddToPlaylistModal
              videoToPlaylist={videoToPlaylist}
              setVideoToPlaylist={setVideoToPlaylist}
            />
          )}
        </section>
      )}
      {status === "ERROR" && <Error setStatus={setStatus} />}
    </>
  );
};
