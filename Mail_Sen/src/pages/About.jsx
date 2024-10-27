import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the initial mode from localStorage or default to light mode
  const initialMode = localStorage.getItem('theme') === 'D';
  const [darkMode, setDarkMode] = useState(initialMode);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'D' : 'L');
  };

  useEffect(() => {
    // Set the initial theme class based on the stored mode in localStorage
    const savedMode = localStorage.getItem('theme');
    setDarkMode(savedMode === 'D');
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

      <div className="dark-mode-toggle-container">
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default About;
