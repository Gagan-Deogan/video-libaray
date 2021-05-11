import "./watch.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStatus } from "../../Context/LoaderContext";
import { NotesBox } from "../../Components/NotesBox";
import { Loader } from "../../Components/Loader";
import { useRequest } from "../../utils";
import { VidoeDetailsContainer } from "../../Components/VidoeDetailsContainer";

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
              <VidoeDetailsContainer
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
