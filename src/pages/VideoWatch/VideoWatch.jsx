import "./watch.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NotesBox } from "./NotesBox";
import { Loader } from "common-components/Loader";
import { VideoDetailsContainer } from "./VideoDetailsContainer";
import { getVideoDetails } from "./videoWatch.service";
import { Error } from "common-components/Error";
export const VideoWatch = () => {
  const { videoId } = useParams();
  const [status, setStatus] = useState("IDLE");
  const [videoDetails, setVideoDetails] = useState();
  const [videoPlayed, setVideoPlayed] = useState("00:00:00");

  useEffect(() => {
    if (status === "IDLE") {
      (async () => {
        setStatus("PENDING");
        const res = await getVideoDetails(videoId);
        if ("data" in res) {
          setStatus("FULFILLED");
          setVideoDetails(res.data);
        } else {
          setStatus("ERROR");
        }
      })();
    }
  }, [status, setStatus, videoId]);
  return (
    <>
      {status === "PENDING" && <Loader />}
      {status === "FULFILLED" && (
        <div className="row sm-warp">
          {videoDetails && (
            <>
              <section className="padding-8 w8 sm-w12">
                <VideoDetailsContainer
                  videoDetails={videoDetails}
                  setVideoPlayed={setVideoPlayed}
                />
              </section>
              <NotesBox videoPlayed={videoPlayed} videoDetails={videoDetails} />
            </>
          )}
        </div>
      )}
      {status === "ERROR" && <Error setStatus={setStatus} />}
    </>
  );
};
