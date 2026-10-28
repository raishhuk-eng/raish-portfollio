import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  BsSun, 
  BsMoonStars, 
  BsList, 
  BsX, 
  BsTelephone, 
  BsEnvelope,
  BsTranslate,
  BsSend
} from 'react-icons/bs';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);

  // Scroll detection for sticky shadow & backdrop blur enhancement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener to close mobile menu automatically
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavOpen]);

  const closeNav = () => setIsNavOpen(false);

  return (
    <header 
      ref={navRef}
      className={`site-navbar sticky-top ${isScrolled ? 'navbar-scrolled' : ''}`}
      style={{ position: 'sticky', top: 0, zIndex: 1050 }}
    >
      <nav className="navbar navbar-expand-lg py-2 py-lg-3" aria-label="Main Navigation">
        <div className="container-fluid px-3 px-md-4 px-xl-5">
          {/* Brand Logo with Initials "RM" */}
          <Link 
            to="/" 
            className="navbar-brand d-flex align-items-center gap-2 text-decoration-none py-0 me-3"
            onClick={closeNav}
            aria-label={`${personalInfo.name} - Home`}
          >
            <div className="brand-monogram">
              {personalInfo.initials}
            </div>
            <div className="d-flex flex-column text-start">
              <span className="fw-bold fs-6 lh-1" style={{ color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                {personalInfo.name}
              </span>
              <span className="text-muted lh-1 mt-1 font-mono d-none d-sm-block" style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                IT Support &bull; Network &bull; Cyber
              </span>
            </div>
          </Link>

          {/* Right Mobile Controls: Theme Switcher + Hamburger */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <BsSun size={17} /> : <BsMoonStars size={16} />}
            </button>

            <button
              className="btn btn-brand-outline p-0 d-flex align-items-center justify-content-center"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation menu"
              style={{ width: '40px', height: '40px' }}
            >
              {isNavOpen ? <BsX size={26} /> : <BsList size={22} />}
            </button>
          </div>

          {/* Navigation Links & Action Controls */}
          <div 
            className={`collapse navbar-collapse ${isNavOpen ? 'show navbar-collapse-custom' : ''}`} 
            id="navbarContent"
          >
            {/* Nav Links */}
            <ul className="navbar-nav mx-auto mb-3 mb-lg-0 align-items-lg-center gap-1">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                      `nav-link-custom d-block ${isActive ? 'active' : ''}`
                    }
                    onClick={closeNav}
                    end={link.path === '/'}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Action Controls */}
            <div className="d-none d-lg-flex align-items-center gap-2 flex-shrink-0">
              {/* Theme Switcher */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <BsSun size={18} /> : <BsMoonStars size={17} />}
              </button>

              {/* Contact Button */}
              <Link
                to="/contact"
                className="btn btn-brand-primary py-2 px-3 d-inline-flex align-items-center gap-1"
                style={{ fontSize: '0.84rem', whiteSpace: 'nowrap' }}
                title="Get In Touch"
              >
                <BsSend size={13} />
                <span>Contact</span>
              </Link>
            </div>

            {/* Mobile Menu Extended Drawer Content */}
            <div className="d-lg-none pt-3 mt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
              {/* Extra Mobile Links */}
              <div className="d-flex flex-column gap-2 mb-3">
                <NavLink
                  to="/languages"
                  className={({ isActive }) => 
                    `nav-link-custom d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                  }
                  onClick={closeNav}
                >
                  <BsTranslate size={14} className="text-info" />
                  <span>Languages & Communication</span>
                </NavLink>
              </div>

              {/* Mobile Action Buttons */}
              <div className="d-grid gap-2 mb-3">
                <Link
                  to="/contact"
                  className="btn btn-brand-primary py-2 d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: '0.9rem' }}
                  onClick={closeNav}
                >
                  <BsSend size={14} />
                  <span>Contact Raish</span>
                </Link>
              </div>

              {/* Mobile Quick Contact Strip */}
              <div className="p-2 rounded bg-dark border border-secondary text-center font-mono fs-8" style={{ fontSize: '0.78rem' }}>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <a href={`tel:${personalInfo.phoneClean}`} className="text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <BsTelephone size={12} className="text-info" />
                    <span>{personalInfo.phone}</span>
                  </a>
                  <span className="text-muted">&bull;</span>
                  <a href={`mailto:${personalInfo.email}`} className="text-secondary text-decoration-none d-flex align-items-center gap-1">
                    <BsEnvelope size={12} className="text-info" />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
