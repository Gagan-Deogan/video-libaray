import "./watch.css";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useStatus } from "../../Context/LoaderContext";
import { AddToPlaylistModel } from "../../Components/AddToPlaylistModel";
import { NotesBox } from "../../Components/NotesBox";
import { Loader } from "../../Components/Loader";
import { useRequest } from "../../utils";
import { VidoeDetailsContainer } from "../../Components/VidoeDetailsContainer";

export const VideoWatch = () => {
  const { videoId } = useParams();
  const { request } = useRequest();
  const { status, setStatus } = useStatus();
  const [vidoeToPlaylist, setVideoToPlaylist] = useState();
  const [videoDetails, setVideoDetails] = useState();
  const [videoPlayed, setVideoPlayed] = useState("00:00:00");

  useEffect(() => {
    setStatus("PENDING");
    (async () => {
      const { items } = await request({
        endpoint: "videos?part=snippet&part=statistics&id=" + videoId,
        method: "GET",
      });
      if (items) {
        setStatus("IDLE");
        setVideoDetails(items[0]);
      }
    })();
  }, []);
  return (
    <>
      {status !== "IDLE" && <Loader />}
      {status === "IDLE" && (
        <div className="row sm-warp">
          <section className="padding-8 w8 sm-w12">
            {videoDetails && (
              <VidoeDetailsContainer
                videoId={videoId}
                videoDetails={videoDetails}
                setVideoPlayed={setVideoPlayed}
              />
            )}
          </section>
          <NotesBox videoPlayed={videoPlayed} />
        </div>
      )}
    </>
  );
};
