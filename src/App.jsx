import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import NetworkBackground3D from './components/NetworkBackground3D';

// Route Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import SkillsPage from './pages/SkillsPage';
import CertificationsPage from './pages/CertificationsPage';
import LanguagesPage from './pages/LanguagesPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('raish_portfolio_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('raish_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="portfolio-app-root min-vh-100 d-flex flex-column position-relative">
        {/* 3D Three.js Interactive Network Topology Canvas */}
        <NetworkBackground3D theme={theme} />

        {/* Ambient Cyber Light Layer */}
        <div className="ambient-glow-layer" aria-hidden="true">
          <div className="cyber-orb cyber-orb-1" />
          <div className="cyber-orb cyber-orb-2" />
          <div className="cyber-orb cyber-orb-3" />
        </div>

        {/* Sticky Navbar with Route Navigation & Theme Switcher */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Dynamic Route Switching */}
        <main className="flex-grow-1 position-relative" style={{ zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage theme={theme} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/languages" element={<LanguagesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Dynamic Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
