import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "context/PlaylistProvider";
import { Card } from "common-components/Card";
import { EditIcon } from "assests/icons";
export const Playlist = () => {
  const { id } = useParams();
  const { playlists, playlistDispatch } = usePlaylist();
  const getPlaylistDetails = (playlists, id) => {
    return playlists.find((playlist) => playlist._id === id);
  };
  const playlistDetails = getPlaylistDetails(playlists, id);
  const [editdescription, setEditdescription] = useState(false);
  const [editeddescriptionText, setEditeddescriptionText] = useState("");
  const descriptionWord = () => {
    return editeddescriptionText.slice().length;
  };
  const handleEditsIndescription = (e) => {
    if (descriptionWord() < 500) setEditeddescriptionText(e.target.value);
  };
  const handleDescriptionSave = () => {
    playlistDispatch({
      type: "EDIT_DESCRIPTION",
      payload: { description: editeddescriptionText, playlistId: id },
    });
    setEditdescription(false);
  };
  return (
    <section>
      {/* <div className="card padding-16 bor-rad-8">
        <h2 className="bold margin-b-16">{playlistDetails.name}</h2>
        {!editdescription && (
          <div className="row align-center margin-b-16">
            {!!playlistDetails.description && (
              <h5>{playlistDetails.description}</h5>
            )}
            {!!!playlistDetails.description && (
              <h5 className="gry ">No description</h5>
            )}
            <button
              className="btn-link margin-l-8"
              onClick={() => setEditdescription(true)}>
              {" "}
              <EditIcon />{" "}
            </button>
          </div>
        )}
        {editdescription && (
          <div className="column align-start margin-b-16">
            <input
              type="text"
              name="description"
              placeholder="description"
              value={editeddescriptionText}
              onChange={handleEditsIndescription}
            />
            <div className="text-help bold">{descriptionWord()}/500</div>
            <div className="row w12 justify-end margin-t-16">
              <button
                className="sm-btn-pry"
                onClick={() => setEditdescription(false)}>
                Cancel
              </button>
              <button
                className="sm-btn-pry-fil margin-l-16"
                onClick={() => handleDescriptionSave()}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
      <ul className="dis-grid videos-container margin-t-16">
        {playlistDetails.videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </ul> */}
    </section>
  );
};
