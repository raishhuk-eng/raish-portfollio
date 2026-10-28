import { motion } from 'framer-motion';
import { 
  BsHeadset, 
  BsTerminal, 
  BsHddNetwork, 
  BsGlobe2, 
  BsCheckCircleFill,
  BsShieldCheck
} from 'react-icons/bs';
import { skillsData } from '../data/portfolioData';
import TiltCard3D from './TiltCard3D';

export default function Skills() {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'it-support':
        return <BsHeadset />;
      case 'operating-systems':
        return <BsTerminal />;
      case 'hardware-networking':
        return <BsHddNetwork />;
      case 'additional-skills':
        return <BsGlobe2 />;
      default:
        return <BsShieldCheck />;
    }
  };

  return (
    <section id="skills" className="section-bg-alt">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Core Competencies</span>
          </div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Competencies directly grounded in IT infrastructure operations, OS maintenance, networking essentials, and user support.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="row g-4">
          {skillsData.map((category, index) => (
            <motion.div 
              className="col-md-6 col-lg-6"
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard3D maxTilt={7} className="h-100">
                <div className="skill-category-card h-100">
                  {/* Header */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="skill-category-icon">
                      {getCategoryIcon(category.id)}
                    </div>
                    <span className="badge rounded-pill bg-dark border border-secondary font-mono px-3 py-2 text-info" style={{ fontSize: '0.75rem' }}>
                      {category.badge}
                    </span>
                  </div>

                  <h3 className="fs-5 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {category.category}
                  </h3>
                  <p className="text-muted fs-8 mb-4" style={{ fontSize: '0.88rem' }}>
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, sIdx) => (
                      <div className="skill-item-pill" key={sIdx}>
                        <BsCheckCircleFill size={13} style={{ color: 'var(--accent-cyan)' }} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* Factual Note */}
        <div className="text-center mt-5">
          <div className="d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-dark border border-secondary text-muted fs-8" style={{ fontSize: '0.82rem' }}>
            <BsShieldCheck className="text-info" />
            <span>Strictly verified from CV &bull; Interactive 3D Cards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
