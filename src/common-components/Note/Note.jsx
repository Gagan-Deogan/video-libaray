export const Note = ({ note }) => {
  return (
    <div className="notes card bor-rad-4 padding-4 padding-l-8 padding-r-8 padding-t-4 margin-b-8">
      <h6> {note.text}</h6>
      <span className="font-xs text-grey">{note.time}</span>
    </div>
  );
};
