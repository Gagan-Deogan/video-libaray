import "./index.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesProvider";
import { Note } from "../Note";
export const NotesBox = ({ videoPlayed }) => {
  const { videoId } = useParams();
  const { findNotesByVideoId, AddNotes } = useNotesContext();
  const [note, setNote] = useState("");
  const VideoNotes = findNotesByVideoId({ videoId });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.length) {
      AddNotes({ videoId, newNote: { text: note, time: videoPlayed } });
      setNote("");
    }
  };
  return (
    <section className="w4 padding-8 sm-w12 ">
      <div className="card bor-rad-8 padding-8 notes-container column bor-sol">
        <h3 className="margin-b-8">Take Notes</h3>
        <div className="notes-box padding-8 bor-rad-4 bor-sol">
          {VideoNotes?.notes.map((note) => (
            <Note note={note} key={note.id}></Note>
          ))}
        </div>
        <form action="#" className="row margin-t-8" onSubmit={handleSubmit}>
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
