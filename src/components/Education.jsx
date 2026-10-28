import { motion } from 'framer-motion';
import { BsMortarboard, BsCalendar3, BsBuilding, BsGeoAlt } from 'react-icons/bs';
import { educationData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Education() {
  return (
    <section id="education" className="section-bg-alt">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal qualifications in Postgraduate Data &amp; Artificial Intelligence, Computer Engineering, and secondary education.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="timeline-container">
              {educationData.map((item, index) => (
                <motion.div 
                  className="timeline-item"
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {/* Timeline Dot */}
                  <div className="timeline-dot" aria-hidden="true" />

                  {/* 3D Tilt Card */}
                  <TiltCard3D maxTilt={6}>
                    <div className="glass-card">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <div className="timeline-date-badge font-mono">
                          <BsCalendar3 className="me-2" size={12} />
                          {item.period}
                        </div>
                        <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono px-3 py-1" style={{ fontSize: '0.75rem' }}>
                          {item.level}
                        </span>
                      </div>

                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="cert-icon-box" style={{ width: 44, height: 44, fontSize: '1.2rem' }}>
                          <BsMortarboard />
                        </div>
                        <div>
                          <h3 className="fs-5 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {item.degree}
                          </h3>
                          <div className="d-flex flex-wrap align-items-center gap-3 text-secondary fw-semibold">
                            <div className="d-flex align-items-center gap-2">
                              <BsBuilding size={14} className="text-info" />
                              <span>{item.institution}</span>
                            </div>
                            {item.location && (
                              <div className="d-flex align-items-center gap-1 text-muted fs-8 font-mono">
                                <BsGeoAlt size={13} />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.92rem' }}>
                        {item.description}
                      </p>
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
