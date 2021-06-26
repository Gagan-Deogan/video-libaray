import React from "react";
import { Card } from "common-components/Card";
import { usePrefrenced } from "context/PrefrenceProvider";
export const LikeVideos = () => {
  const { prefrenceVideos } = usePrefrenced();
  return (
    <>
      <section>
        <div className="card padding-16 bor-rad-8">
          <h1 className="bold">Liked Videos</h1>
        </div>
        <ul className="dis-grid videos-container margin-t-16">
          {prefrenceVideos.map(
            (prefrence) =>
              prefrence.feels === "LIKE" && (
                <Card key={prefrence.video._Id} video={prefrence.video} />
              )
          )}
        </ul>
      </section>
    </>
  );
};
