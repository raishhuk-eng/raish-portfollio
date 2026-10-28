import { motion } from 'framer-motion';
import { 
  BsShieldCheck, 
  BsShieldLock, 
  BsSearch, 
  BsShare,
  BsCheckCircleFill,
  BsPatchCheck
} from 'react-icons/bs';
import { certificationsData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Certifications() {
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

  return (
    <section id="certifications">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Professional certifications completed in cybersecurity, penetration testing, cyber forensics, and digital communication.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="row g-4 justify-content-center">
          {certificationsData.map((cert, index) => (
            <motion.div 
              className="col-md-6 col-lg-4"
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard3D maxTilt={9} className="h-100">
                <div className="cert-card h-100">
                  <div className="cert-icon-box">
                    {getCertIcon(cert.id)}
                  </div>

                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono" style={{ fontSize: '0.72rem' }}>
                        {cert.category}
                      </span>
                      <BsCheckCircleFill size={14} style={{ color: 'var(--accent-emerald)' }} title="CV Verified" />
                    </div>

                    <h3 className="fs-6 fw-bold mb-1 lh-base" style={{ color: 'var(--text-primary)' }}>
                      {cert.title}
                    </h3>
                    
                    <div className="text-muted font-mono" style={{ fontSize: '0.78rem' }}>
                      Documented Certification
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
