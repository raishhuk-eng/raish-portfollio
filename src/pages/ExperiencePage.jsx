import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsBuilding, 
  BsCalendar3, 
  BsGeoAlt, 
  BsArrowRight,
  BsFilter
} from 'react-icons/bs';
import { experienceData } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function ExperiencePage() {
  const [filter, setFilter] = useState('all');

  const filteredExperience = experienceData.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'nif-india') return item.id === 'nif-india';
    if (filter === 'linics-enterprise') return item.id === 'linics-enterprise';
    if (filter === 'nk-cyber') return item.id === 'nk-cyber';
    return true;
  });

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Experience</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="d-flex flex-column flex-md-row md-align-items-center justify-content-between gap-3 mb-5">
          <div>
            <div className="section-badge mb-2">
              <span>Career History</span>
            </div>
            <h1 className="section-title">Work Experience</h1>
            <p className="section-subtitle ms-0 text-start">
              Verified professional roles and responsibilities documented in curriculum vitae and experience certification.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="d-flex align-items-center gap-2 align-self-start">
            <span className="text-muted fs-8 font-mono d-none d-sm-inline">
              <BsFilter size={16} /> Filter:
            </span>
            <div className="btn-group p-1 rounded-pill bg-dark border border-secondary" role="group">
              <button
                type="button"
                className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${filter === 'all' ? 'btn-info text-dark fw-bold' : 'text-secondary'}`}
                style={{ fontSize: '0.78rem', border: 'none' }}
                onClick={() => setFilter('all')}
              >
                All ({experienceData.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${filter === 'nif-india' ? 'btn-info text-dark fw-bold' : 'text-secondary'}`}
                style={{ fontSize: '0.78rem', border: 'none' }}
                onClick={() => setFilter('nif-india')}
              >
                Network Engineer
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${filter === 'linics-enterprise' ? 'btn-info text-dark fw-bold' : 'text-secondary'}`}
                style={{ fontSize: '0.78rem', border: 'none' }}
                onClick={() => setFilter('linics-enterprise')}
              >
                IT Service
              </button>
              <button
                type="button"
                className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${filter === 'nk-cyber' ? 'btn-info text-dark fw-bold' : 'text-secondary'}`}
                style={{ fontSize: '0.78rem', border: 'none' }}
                onClick={() => setFilter('nk-cyber')}
              >
                Cybersecurity Intern
              </button>
            </div>
          </div>
        </div>

        {/* Timeline List */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-container">
              <AnimatePresence mode="popLayout">
                {filteredExperience.map((item, index) => (
                  <motion.div 
                    className="timeline-item"
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="timeline-dot" aria-hidden="true" />

                    <TiltCard3D maxTilt={5}>
                      <div className="glass-card">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                          <div className="timeline-date-badge font-mono">
                            <BsCalendar3 className="me-2" size={12} />
                            {item.period}
                          </div>
                          <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono px-3 py-1" style={{ fontSize: '0.75rem' }}>
                            {item.type}
                          </span>
                        </div>

                        <div className="mb-3">
                          <h2 className="fs-4 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {item.role}
                          </h2>
                          <div className="d-flex flex-wrap align-items-center gap-3 text-secondary fw-semibold">
                            <div className="d-flex align-items-center gap-2">
                              <BsBuilding size={14} className="text-info" />
                              <span>{item.company}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-muted fs-8 font-mono">
                              <BsGeoAlt size={13} />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-secondary fs-8 mb-4" style={{ fontSize: '0.92rem' }}>
                          {item.summary}
                        </p>

                        <div className="mb-4">
                          <div className="fw-semibold fs-8 text-uppercase font-mono mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--accent-cyan)' }}>
                            Documented Responsibilities (CV Exact)
                          </div>
                          <ul className="responsibility-list">
                            {item.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                          <div className="fw-semibold fs-8 text-muted font-mono mb-2" style={{ fontSize: '0.75rem' }}>
                            Core Disciplines:
                          </div>
                          <div className="d-flex flex-wrap">
                            {item.tags.map((tag, tIdx) => (
                              <span className="tag-badge font-mono" key={tIdx}>
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TiltCard3D>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="mt-5 p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Interested in technical skills breakdown?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>View all 4 core technical disciplines including IT Support and Operating Systems.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/skills" className="btn btn-brand-primary">
              <span>View Skills</span>
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
