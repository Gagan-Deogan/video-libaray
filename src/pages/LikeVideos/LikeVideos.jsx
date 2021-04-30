import React from "react";
import { Card } from "../../Components/Card";
import { useLikedAndDisLikedVideosContext } from "../../Context";
export const LikeVideos = () => {
  const { likedVideos } = useLikedAndDisLikedVideosContext();

  return (
    <>
      <section>
        <div className="card padding-16 bor-rad-8">
          <h1 className="bold">Liked Videos</h1>
        </div>
        <ul className="dis-grid videos-container margin-t-16">
          {likedVideos.map((video) => (
            <Card key={video.id} video={video} />
          ))}
        </ul>
      </section>
    </>
  );
};
