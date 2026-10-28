import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BsMortarboard, 
  BsCalendar3, 
  BsBuilding, 
  BsArrowRight,
  BsCheckCircleFill,
  BsAward,
  BsGeoAlt
} from 'react-icons/bs';
import { educationData } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function EducationPage() {
  const academicPillars = [
    {
      title: "Data & Artificial Intelligence (M.Sc.)",
      desc: "Postgraduate curriculum in data mining, advanced analytics, machine learning fundamentals, and intelligent systems design at UWTSD Birmingham."
    },
    {
      title: "Computer Engineering Core (B.E.)",
      desc: "Structured 4-year engineering curriculum covering systems programming, hardware architectures, computer networks, and data management."
    },
    {
      title: "Networking & System Fundamentals",
      desc: "In-depth theoretical and laboratory exposure to LAN setups, protocol hierarchies (TCP/IP), and OS internals."
    }
  ];

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Education</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <div className="section-badge mb-2">
            <span>Academic Qualifications</span>
          </div>
          <h1 className="section-title">Education & Academic History</h1>
          <p className="section-subtitle ms-0 text-start">
            Documented postgraduate master's degree, computer engineering degree, and academic foundations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="timeline-container">
              {educationData.map((item, index) => (
                <motion.div 
                  className="timeline-item"
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="timeline-dot" aria-hidden="true" />

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
                        <div className="cert-icon-box" style={{ width: 48, height: 48, fontSize: '1.3rem' }}>
                          <BsMortarboard />
                        </div>
                        <div>
                          <h2 className="fs-4 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                            {item.degree}
                          </h2>
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

                      <p className="text-secondary fs-8 mb-3" style={{ fontSize: '0.92rem' }}>
                        {item.description}
                      </p>

                      {item.modules && (
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {item.modules.map((mod, mi) => (
                            <span 
                              key={mi} 
                              className="badge rounded-pill bg-dark border border-secondary text-secondary font-mono px-2 py-1"
                              style={{ fontSize: '0.74rem' }}
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 border-top d-flex align-items-center gap-2 text-muted fs-8 font-mono" style={{ borderColor: 'var(--border-subtle)', fontSize: '0.78rem' }}>
                        <BsCheckCircleFill className="text-info" size={12} />
                        <span>Documented & Verified Qualification</span>
                      </div>
                    </div>
                  </TiltCard3D>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Focus Cards */}
        <div className="mb-5">
          <h2 className="fs-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Academic Pillars & Technical Grounding
          </h2>
          <div className="row g-4">
            {academicPillars.map((pillar, idx) => (
              <div className="col-md-4" key={idx}>
                <TiltCard3D maxTilt={8} className="h-100">
                  <div className="glass-card h-100">
                    <div className="cert-icon-box mb-3">
                      <BsAward size={20} />
                    </div>
                    <h3 className="fs-6 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {pillar.title}
                    </h3>
                    <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.88rem' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Interested in verified certifications?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>Explore certifications in VAPT, Ethical Hacking, and Cyber Forensics.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/certifications" className="btn btn-brand-primary">
              <span>View Certifications</span>
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
