import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; 
import { v4 as uuidv4 } from 'uuid';   

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notesInput, setNotesInput] = useState('');
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem('notes')) || []
  );
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  // Initial mode based on localStorage
  const initialDarkMode = localStorage.getItem('theme') === 'D';
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const handleInputChange = (event) => {
    setNotesInput(event.target.value);
  };

  const handleSaveNote = () => {
    if (notesInput.trim() !== '') {
      let updatedNotes;

      if (editingNoteId) {
        updatedNotes = notes.map((note) =>
          note.id === editingNoteId ? { ...note, text: notesInput } : note
        );
      } else {
        const newNote = {
          id: uuidv4(),
          text: notesInput,
        };
        updatedNotes = [...notes, newNote];
      }

      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotesInput('');
      setEditingNoteId(null);
      setIsInputVisible(false);
    }
  };

  const handleCardClick = (note) => {
    setNotesInput(note.text);
    setEditingNoteId(note.id);
    setIsInputVisible(true);
  };

  const handleNewNote = () => {
    setNotesInput('');
    setEditingNoteId(null);
    setIsInputVisible(true);
  };

  const handleDeleteNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleBack = () => {
    setNotesInput('');
    setEditingNoteId(null);
    setIsInputVisible(false);
  };

  useEffect(() => {
    // Apply the correct theme based on the stored value on mount
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'D');
  }, []);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <nav className="navbar">
        <div className="app-name">Local Notes</div>
        <ul className="nav-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <button onClick={() => navigate('/')}>Home</button>
          </li>
          <li className={location.pathname === '/about' ? 'active' : ''}>
            <button onClick={() => navigate('/about')}>Settings</button>
          </li>
        </ul>
      </nav>

      <div className="container">
        <div className="card_plus" onClick={handleNewNote}>
          <span className="plus-sign">+</span>
        </div>

        {notes.map((note) => (
          <div key={note.id} className="card" onClick={() => handleCardClick(note)}>
            <div className="card-text">{note.text}</div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNote(note.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {isInputVisible && (
        <div className="note-input-container">
          <textarea
            value={notesInput}
            onChange={handleInputChange}
            placeholder="Enter your notes..."
          />
          <button className='save-button' onClick={handleSaveNote}>
            {editingNoteId ? 'Update Note' : 'Save Note'}
          </button>
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
