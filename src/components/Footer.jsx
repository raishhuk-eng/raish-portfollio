import { Link } from 'react-router-dom';
import { BsEnvelope, BsTelephone, BsArrowUp, BsShieldCheck } from 'react-icons/bs';
import { personalInfo, navLinks } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4 justify-content-between align-items-center mb-5">
          {/* Brand Info */}
          <div className="col-lg-5 text-center text-lg-start">
            <Link to="/" className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 mb-2 text-decoration-none">
              <div className="brand-monogram" style={{ width: 36, height: 36, fontSize: '0.95rem' }}>
                {personalInfo.initials}
              </div>
              <span className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>
                {personalInfo.name}
              </span>
            </Link>
            <p className="text-muted fs-8 mb-2 font-mono" style={{ fontSize: '0.85rem' }}>
              {personalInfo.headline}
            </p>
            <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.85rem', maxWidth: '420px' }}>
              Computer Engineering graduate based in Birmingham, UK. Committed to robust system infrastructure and secure operations.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="col-lg-4 text-center">
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-secondary text-decoration-none fs-8"
                  style={{ fontSize: '0.88rem' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Direct & Back to top */}
          <div className="col-lg-3 text-center text-lg-end">
            <div className="d-flex flex-column align-items-center align-items-lg-end gap-2">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="d-inline-flex align-items-center gap-2 text-decoration-none fs-8"
                style={{ color: 'var(--accent-cyan)', fontSize: '0.88rem' }}
              >
                <BsEnvelope size={14} />
                <span>{personalInfo.email}</span>
              </a>

              <a 
                href={`tel:${personalInfo.phoneClean}`}
                className="d-inline-flex align-items-center gap-2 text-secondary text-decoration-none fs-8"
                style={{ fontSize: '0.88rem' }}
              >
                <BsTelephone size={14} />
                <span>{personalInfo.phone}</span>
              </a>

              <button
                onClick={scrollToTop}
                className="btn btn-sm btn-brand-outline mt-2 d-inline-flex align-items-center gap-2"
                style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                aria-label="Back to top"
              >
                <BsArrowUp size={13} />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Verification Line */}
        <div className="pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-2" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </div>
          <div className="d-flex align-items-center gap-2 text-muted fs-8 font-mono" style={{ fontSize: '0.78rem' }}>
            <BsShieldCheck className="text-info" />
            <span>Strictly verified from CV &bull; React Router &bull; Three.js 3D &bull; Bootstrap 5.3</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
