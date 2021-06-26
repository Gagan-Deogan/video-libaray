import "./watch.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStatus } from "context/LoaderProvider";
import { NotesBox } from "components/NotesBox";
import { Loader } from "components/Loader";
import { useRequest } from "utils";
import { VideoDetailsContainer } from "components/VideoDetailsContainer";

export const VideoWatch = () => {
  const { videoId } = useParams();
  const { request } = useRequest();
  const { status, setStatus } = useStatus();
  const [videoDetails, setVideoDetails] = useState();
  const [videoPlayed, setVideoPlayed] = useState("00:00:00");

  useEffect(() => {
    setStatus("PENDING");
    (async () => {
      const { success, data } = await request({
        endpoint: `videos/${videoId}`,
        method: "GET",
      });
      if (success) {
        setStatus("IDLE");
        setVideoDetails(data);
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
              <VideoDetailsContainer
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
