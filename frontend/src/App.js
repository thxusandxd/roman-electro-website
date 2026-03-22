import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import GalleryPage from './pages/GalleryPage';
import AIAssistantPage from './pages/AIAssistantPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
      </Routes>
    </Router>
  );
}

export default App;
