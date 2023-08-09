import { useState } from "react";

const NoteInput = ({ onAddNote }) => {
 const [newNote, setNewNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.trim() !== '') {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ajouter une note..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default NoteInput;
