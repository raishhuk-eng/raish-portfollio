import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BsArrowDownRight, 
  BsEnvelope, 
  BsShieldCheck, 
  BsHddNetwork, 
  BsGeoAltFill
} from 'react-icons/bs';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {

  return (
    <section id="home" className="hero-section">
      <div className="hero-grid-bg" aria-hidden="true" />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-5">
          {/* Left Column: Introductions & CTAs */}
          <motion.div 
            className="col-lg-7 text-center text-lg-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Status Badge */}
            <div className="hero-badge-available">
              <span className="status-dot" aria-hidden="true"></span>
              <span>Available for UK Opportunities &bull; Birmingham</span>
            </div>

            {/* Candidate Name */}
            <h1 className="hero-headline">
              Hello, I'm <br />
              <span style={{ 
                background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent-cyan) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {personalInfo.name}
              </span>
            </h1>

            {/* Professional Headline */}
            <div className="hero-role-badge font-mono">
              {personalInfo.headline}
            </div>

            {/* Concise CV-based Lead Paragraph */}
            <p className="hero-lead">
              Computer Engineering graduate specializing in IT infrastructure, system support, networking fundamentals, and cybersecurity practices including vulnerability assessment and penetration testing. Dedicated to delivering secure, reliable, and scalable technology environments.
            </p>

            {/* Key Buttons: View Experience, Contact Me */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 pt-2">
              <Link to="/experience" className="btn btn-brand-primary">
                <span>View My Experience</span>
                <BsArrowDownRight size={16} />
              </Link>

              <Link to="/contact" className="btn btn-brand-outline">
                <BsEnvelope size={16} />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Quick Micro Credentials Bar */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-4 mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="d-flex align-items-center gap-2 text-muted fs-8" style={{ fontSize: '0.86rem' }}>
                <BsShieldCheck className="text-info" size={16} />
                <span>VAPT & Security Exposure</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted fs-8" style={{ fontSize: '0.86rem' }}>
                <BsHddNetwork className="text-info" size={16} />
                <span>Network & OS Administration</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted fs-8" style={{ fontSize: '0.86rem' }}>
                <BsGeoAltFill className="text-info" size={15} />
                <span>Birmingham, UK</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Portrait */}
          <motion.div 
            className="col-lg-5 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="hero-image-wrapper">
              <div className="hero-image-frame">
                <img 
                  src={personalInfo.profileImage || "/raish-portfolio.jpg"} 
                  alt={personalInfo.name}
                  className="hero-image"
                  onError={(e) => {
                    if (e.currentTarget.src.indexOf('raish-portfolio.jpg') !== -1) {
                      e.currentTarget.src = '/raish-portfollio.png';
                    } else {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.tech-avatar-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'tech-avatar-fallback d-flex flex-column align-items-center justify-content-center p-5 text-center';
                        fallback.style.aspectRatio = '1 / 1';
                        fallback.style.background = 'linear-gradient(135deg, #070d19 0%, #0f1d33 100%)';
                        fallback.style.borderRadius = '20px';
                        fallback.innerHTML = `
                          <div style="font-size: 3.5rem; color: var(--accent-cyan); font-weight: 800;">RM</div>
                          <div style="font-weight: 600; color: var(--text-primary); margin-top: 10px;">Raish Mansuri</div>
                          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">IT Support &bull; Network &bull; Cyber</div>
                        `;
                        parent.appendChild(fallback);
                      }
                    }
                  }}
                />
              </div>

              {/* Floating Tech Badge 1: Network & Systems */}
              <motion.div 
                className="hero-floating-card hero-floating-badge-top"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="cert-icon-box" style={{ width: 38, height: 38, fontSize: '1.1rem' }}>
                  <BsHddNetwork />
                </div>
                <div className="text-start">
                  <div className="fw-bold fs-8" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    Network & Systems
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                    Govt. of India (NIF) Experience
                  </div>
                </div>
              </motion.div>

              {/* Floating Tech Badge 2: Cybersecurity & VAPT */}
              <motion.div 
                className="hero-floating-card hero-floating-badge-bottom"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="cert-icon-box" style={{ width: 38, height: 38, fontSize: '1.1rem', color: 'var(--accent-emerald)', borderColor: 'rgba(var(--accent-emerald-rgb), 0.3)' }}>
                  <BsShieldCheck />
                </div>
                <div className="text-start">
                  <div className="fw-bold fs-8" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    Cybersecurity Focus
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                    Pen Testing & Vulnerability Assessment
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
