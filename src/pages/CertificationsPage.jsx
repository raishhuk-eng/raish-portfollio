import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsShieldCheck, 
  BsShieldLock, 
  BsSearch, 
  BsShare, 
  BsCheckCircleFill, 
  BsPatchCheck,
  BsArrowRight,
  BsFileEarmarkCheck
} from 'react-icons/bs';
import { certificationsData } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function CertificationsPage() {
  const [filter, setFilter] = useState('all');

  const getCertIcon = (id) => {
    switch (id) {
      case 'cert-vapt':
        return <BsShieldCheck />;
      case 'cert-eh':
        return <BsShieldLock />;
      case 'cert-cf':
        return <BsSearch />;
      case 'cert-safe':
        return <BsShieldCheck />;
      case 'cert-sm':
        return <BsShare />;
      default:
        return <BsPatchCheck />;
    }
  };

  const categories = ['all', ...new Set(certificationsData.map(c => c.category))];

  const filteredCerts = certificationsData.filter(cert => {
    if (filter === 'all') return true;
    return cert.category === filter;
  });

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Certifications</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-5">
          <div>
            <div className="section-badge mb-2">
              <span>Verified Qualifications</span>
            </div>
            <h1 className="section-title">Professional Certifications</h1>
            <p className="section-subtitle ms-0 text-start">
              Technical credentials documented in curriculum vitae spanning cybersecurity, VAPT, cyber forensics, and digital media.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap gap-2 align-self-start">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${filter === cat ? 'btn-info text-dark fw-bold' : 'btn-brand-outline'}`}
                style={{ fontSize: '0.78rem' }}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? `All (${certificationsData.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4 mb-5">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div 
                className="col-md-6 col-lg-4"
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <TiltCard3D maxTilt={8} className="h-100">
                  <div className="cert-card h-100 flex-column justify-content-between">
                    <div className="w-100">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="cert-icon-box">
                          {getCertIcon(cert.id)}
                        </div>
                        <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono" style={{ fontSize: '0.75rem' }}>
                          {cert.category}
                        </span>
                      </div>

                      <h2 className="fs-5 fw-bold mb-2 lh-base" style={{ color: 'var(--text-primary)' }}>
                        {cert.title}
                      </h2>
                    </div>

                    <div className="pt-3 border-top w-100 mt-4 d-flex align-items-center justify-content-between" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="d-flex align-items-center gap-1 text-muted fs-8 font-mono" style={{ fontSize: '0.78rem' }}>
                        <BsFileEarmarkCheck className="text-info" />
                        <span>Curriculum Vitae</span>
                      </div>
                      <div className="d-flex align-items-center gap-1 text-emerald font-mono fs-8" style={{ color: 'var(--accent-emerald)', fontSize: '0.78rem' }}>
                        <BsCheckCircleFill />
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Strict Verification Note */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-dark border border-secondary text-muted fs-8" style={{ fontSize: '0.82rem' }}>
            <BsShieldCheck className="text-info" />
            <span>Adheres strictly to CV &bull; Zero fabricated dates, issuing organizations, or fake URLs</span>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Review candidate language proficiencies?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>Check English, Hindi, and Gujarati communication profile.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/languages" className="btn btn-brand-primary">
              <span>View Languages</span>
              <BsArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn btn-brand-outline">
              <span>Contact Me</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
