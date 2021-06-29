import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "context/PlaylistsProvider";
import { Card } from "common-components/Card";
import { EditIcon } from "assests/icons";
import { EditDescription } from "./EditDescription";
import { commonPlaylist } from "constants/index";
import { Loader } from "common-components/Loader";

import { getPlaylistIdByName, getPlaylistById } from "utils";
export const Playlist = () => {
  const { playlistName } = useParams();
  const { playlists, loading } = usePlaylist();
  const [showEditdescription, setShowEditdescription] = useState(false);
  if (loading) {
    return <Loader />;
  }
  const playlistId = getPlaylistIdByName(playlists, playlistName);
  const { name, _id, videos, description } = getPlaylistById(
    playlists,
    playlistId
  );
  return (
    <section>
      <div className="card padding-16 bor-rad-8">
        <h2 className="bold margin-b-16">{playlistName}</h2>
        {!showEditdescription && !commonPlaylist.includes(name) && (
          <div className="row align-center margin-b-16">
            {!!description && <h5>{description}</h5>}
            {!!!description && <h5 className="gry ">No description</h5>}
            <button
              className="btn-link margin-l-8"
              onClick={() => setShowEditdescription(true)}>
              {" "}
              <EditIcon />{" "}
            </button>
          </div>
        )}
        {showEditdescription && !commonPlaylist.includes(name) && (
          <EditDescription
            setShowEditdescription={setShowEditdescription}
            playlistId={_id}
          />
        )}
      </div>
      <ul className="dis-grid videos-container margin-t-16">
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </ul>
    </section>
  );
};
