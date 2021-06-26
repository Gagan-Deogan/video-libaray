import React from "react";
import { Card } from "components/Card";
import { useSaveVideosContext } from "context/SaveVideosProvider";
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
