import NoteInput from "./NoteInput";


const TileContent = ({ date, notes, setNotes }) => {
  const formattedDate = date.toISOString().split('T')[0];
  const dayNotes = notes[formattedDate] || [];

  const handleAddNote = (note) => {
    const updatedNotes = { ...notes };
    updatedNotes[formattedDate] = [...dayNotes, note];
    setNotes(updatedNotes);
  };

  return (
    <div className="tile-content">
      {dayNotes.map((note, index) => (
        <div key={index} className="note">
          {note}
        </div>
      ))}
      <NoteInput onAddNote={handleAddNote} />
    </div>
  );
};

export default TileContent