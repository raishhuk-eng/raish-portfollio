import { motion } from 'framer-motion';
import { BsTranslate, BsCheck2 } from 'react-icons/bs';
import { languagesData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Languages() {
  return (
    <section id="languages" className="section-bg-alt py-5">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="section-badge mb-2">
                <BsTranslate size={14} className="me-1" />
                <span>Communication</span>
              </div>
              <h2 className="section-title fs-3 mb-2">Languages</h2>
              <p className="text-muted fs-8 mb-0" style={{ fontSize: '0.92rem' }}>
                Languages listed in curriculum vitae for cross-functional communication and user support.
              </p>
            </div>

            {/* Language Cards */}
            <div className="row g-3 justify-content-center">
              {languagesData.map((lang, index) => (
                <motion.div 
                  className="col-md-4 col-sm-6"
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <TiltCard3D maxTilt={10}>
                    <div className="language-card">
                      <div className="language-circle font-mono">
                        {lang.code}
                      </div>
                      <h3 className="fs-5 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                        {lang.name}
                      </h3>
                      <div className="text-muted fs-8 d-inline-flex align-items-center gap-1 font-mono" style={{ fontSize: '0.78rem' }}>
                        <BsCheck2 className="text-info" />
                        <span>CV Verified</span>
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
