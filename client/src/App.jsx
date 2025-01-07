import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ChatPage from './Pages/ChatPage'
import AnalyticsPage from './Pages/AnalyticsPage'

function AppContent() {
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigation} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigation} />} />
          <Route path="/about" element={<AboutPage onNavigate={handleNavigation} />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
