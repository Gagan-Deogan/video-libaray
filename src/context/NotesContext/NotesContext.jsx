import { useContext, createContext, useState } from "react";
import { uuidv4 } from "../../utils";
const NotesContext = createContext();

const initial = [
  {
    videoId: "vNtKVuVSsyk",
    notes: [
      {
        id: uuidv4(),
        text: "This is note",
        time: "5:40",
      },
    ],
  },
];

export const NotesProvider = ({ children }) => {
  const [videosNotes, setVideosNotes] = useState(initial);
  const findNotesByVideoId = ({ videoId }) => {
    return (
      videosNotes.find((videoNotes) => videoNotes.videoId === videoId) || null
    );
  };
  const AddNotes = ({ videoId, newNote }) => {
    if (findNotesByVideoId({ videoId })) {
      setVideosNotes((prev) =>
        prev.map((videoNotes) =>
          videoNotes.videoId === videoId
            ? {
                ...videoNotes,
                notes: videoNotes.notes.concat([{ id: uuidv4(), ...newNote }]),
              }
            : videoNotes
        )
      );
    } else {
      setVideosNotes((prev) =>
        prev.concat([{ videoId, notes: [{ id: uuidv4(), ...newNote }] }])
      );
    }
  };
  return (
    <NotesContext.Provider value={{ findNotesByVideoId, AddNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
export const useNotesContext = () => {
  return useContext(NotesContext);
};
