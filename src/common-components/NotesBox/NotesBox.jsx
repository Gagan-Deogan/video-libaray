import "./index.css";
import { useState } from "react";
import { usePlaylist } from "context/PlaylistProvider";
import { Note } from "../Note";
import {
  addNoteToPlaylist,
  getPlaylistById,
  getVideoNotesByVideoId,
} from "utils";

export const NotesBox = ({ videoPlayed, videoDetails }) => {
  const { _id, thumbnail, description, title } = videoDetails;
  const { playlists, notesVidoesPlaylistId, playlistDispatch } = usePlaylist();
  const notesPlaylist = getPlaylistById(playlists, notesVidoesPlaylistId);
  const videoNotes = getVideoNotesByVideoId(notesPlaylist, _id);
  const [note, setNote] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.length) {
      const res = await addNoteToPlaylist(_id, note, videoPlayed);
      if ("data" in res) {
        playlistDispatch({
          type: "ADD_NOTE",
          payload: {
            video: { _id, thumbnail, description, title },
            note: res.data,
          },
        });
      }
    }
  };

  return (
    <section className="w4 padding-8 sm-w12 ">
      <div className="card bor-rad-8 padding-8 notes-container column bor-sol">
        <h3 className="margin-b-8">Take Notes</h3>
        <div className="notes-box padding-8 bor-rad-4 bor-sol">
          {videoNotes?.map((note) => (
            <Note note={note} key={note._id}></Note>
          ))}
        </div>
        <form
          action="#"
          className="row margin-t-8"
          onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="margin-r-8"
          />
          <button className="sm-btn-pry-fil">Add</button>
        </form>
      </div>
    </section>
  );
};
