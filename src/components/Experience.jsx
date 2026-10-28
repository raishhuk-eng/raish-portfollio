import { motion } from 'framer-motion';
import { BsBuilding, BsCalendar3, BsGeoAlt } from 'react-icons/bs';
import { experienceData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Experience() {
  return (
    <section id="experience">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Career History</span>
          </div>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Professional track record spanning network engineering, IT service support, and specialized cybersecurity internship experience.
          </p>
        </div>

        {/* Timeline */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-container">
              {experienceData.map((item, index) => (
                <motion.div 
                  className="timeline-item"
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot" aria-hidden="true" />

                  {/* 3D Tilt Experience Card */}
                  <TiltCard3D maxTilt={5}>
                    <div className="glass-card">
                      {/* Top Row: Date badge and role type */}
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <div className="timeline-date-badge font-mono">
                          <BsCalendar3 className="me-2" size={12} />
                          {item.period}
                        </div>
                        <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono px-3 py-1" style={{ fontSize: '0.75rem' }}>
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Company & Location */}
                      <div className="mb-3">
                        <h3 className="fs-4 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                          {item.role}
                        </h3>
                        <div className="d-flex flex-wrap align-items-center gap-3 text-secondary fw-semibold">
                          <div className="d-flex align-items-center gap-2">
                            <BsBuilding size={14} className="text-info" />
                            <span>{item.company}</span>
                          </div>
                          {item.location && (
                            <div className="d-flex align-items-center gap-1 text-muted fs-8 font-mono">
                              <BsGeoAlt size={13} />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-secondary fs-8 mb-3" style={{ fontSize: '0.92rem' }}>
                        {item.summary}
                      </p>

                      {/* Responsibilities list */}
                      <div className="mb-4">
                        <div className="fw-semibold fs-8 text-uppercase font-mono mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--accent-cyan)' }}>
                          Core Responsibilities (CV Verified)
                        </div>
                        <ul className="responsibility-list">
                          {item.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="pt-2 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
