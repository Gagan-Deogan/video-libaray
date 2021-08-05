import React, { useState } from "react";
import { Card } from "common-components/Card";
import "./home.css";
import { useRequest } from "hooks/request.hook";
import { GenricSection } from "common-components/GenricSection";
import { AddToPlaylistModal } from "common-components/AddToPlaylistModal";

export const Home = () => {
  const { data, isLoading, isSuccess } = useRequest("videos");
  const [videoToPlaylist, setVideoToPlaylist] = useState();

  return (
    <>
      <GenricSection isLoading={isLoading} isSuccess={isSuccess}>
        <section>
          <ul className="dis-grid videos-container">
            {data &&
              data.map((video) => (
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
      </GenricSection>
    </>
  );
};
