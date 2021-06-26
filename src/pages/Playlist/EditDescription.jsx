import { useState } from "react";
import { updateDescriptions } from "./playlist.service";
import { usePlaylist } from "context/PlaylistProvider";
export const EditDescription = ({ setShowEditdescription, playlistId }) => {
  const { playlistDispatch } = usePlaylist();

  const [description, setDescription] = useState("");

  const handleEditsIndescription = (e) => {
    if (description.length < 500) {
      setDescription(e.target.value);
    }
  };
  const handleDescriptionSave = async () => {
    const res = await updateDescriptions(description, playlistId);
    console.log(res);
    if ("data" in res) {
      playlistDispatch({
        type: "EDIT_DESCRIPTION",
        payload: { description, playlistId },
      });
      setShowEditdescription(false);
    }
  };
  return (
    <div className="column align-start margin-b-16">
      <input
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={handleEditsIndescription}
      />
      <div className="text-help bold">{description.length}/500</div>
      <div className="row w12 justify-end margin-t-16">
        <button
          className="sm-btn-pry"
          onClick={() => setShowEditdescription(false)}>
          Cancel
        </button>
        <button
          className="sm-btn-pry-fil margin-l-16"
          onClick={() => handleDescriptionSave()}>
          Save
        </button>
      </div>
    </div>
  );
};
