import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "context/PlaylistProvider";
import { Card } from "common-components/Card";
import { EditIcon } from "assests/icons";
import { EditDescription } from "./EditDescription";
export const Playlist = () => {
  const { playlistName } = useParams();
  const { playlists } = usePlaylist();
  const getPlaylistDetails = (playlists, playlistName) => {
    return playlists.find((playlist) => playlist.name === playlistName);
  };
  const { _id, name, description, videos } = getPlaylistDetails(
    playlists,
    playlistName
  );
  const [showEditdescription, setShowEditdescription] = useState(false);

  return (
    <section>
      <div className="card padding-16 bor-rad-8">
        <h2 className="bold margin-b-16">{name}</h2>
        {!showEditdescription && (
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
        {showEditdescription && (
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
