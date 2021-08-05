import "./watch.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NotesBox } from "./components/NotesBox";
import { VideoDetailsContainer } from "./components/VideoDetailsContainer";
import { useVideo } from "hooks/videoDetails.hook";
import { GenricSection } from "common-components/GenricSection";

export const VideoWatch = () => {
  const { videoId } = useParams();
  const [videoPlayed, setVideoPlayed] = useState("00:00:00");
  const { data, isLoading, isSuccess } = useVideo(videoId);
  return (
    <>
      <GenricSection isLoading={isLoading} isSuccess={isSuccess}>
        <div className="row sm-warp">
          {data && (
            <>
              <section className="padding-8 w8 sm-w12">
                <VideoDetailsContainer
                  videoDetails={data}
                  setVideoPlayed={setVideoPlayed}
                />
              </section>
              <NotesBox videoPlayed={videoPlayed} videoDetails={data} />
            </>
          )}
        </div>
      </GenricSection>
    </>
  );
};
