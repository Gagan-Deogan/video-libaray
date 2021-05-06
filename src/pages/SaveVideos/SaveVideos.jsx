import React from "react";
import { Card } from "../../Components/Card";
import { useSaveVideosContext } from "../../Context/SaveVideosContext";
export const SaveVideos = () => {
  const { saveVideos } = useSaveVideosContext();
  return (
    <>
      <section>
        <div className="card padding-16 bor-rad-8 ">
          <h1 className="bold">Save Videos</h1>
        </div>
        <ul className="dis-grid videos-container margin-t-16">
          {saveVideos.map((video) => (
            <Card key={video.id} video={video} />
          ))}
        </ul>
      </section>
    </>
  );
};
