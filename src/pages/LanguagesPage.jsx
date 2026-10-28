import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BsCheckCircleFill, 
  BsArrowRight,
  BsChatDots,
  BsShieldCheck
} from 'react-icons/bs';
import { languagesData } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function LanguagesPage() {
  const communicationHighlights = [
    {
      title: "User Technical Support",
      desc: "Clear verbal and written explanation of IT concepts to end-users with varying technical fluency."
    },
    {
      title: "Incident Documentation",
      desc: "Accurate logging, ticket updates, and resolution write-ups in structured corporate environments."
    },
    {
      title: "Multilingual Versatility",
      desc: "Effective communication across multilingual and multicultural technical teams."
    }
  ];

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Languages</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <div className="section-badge mb-2">
            <span>Communication & Interpersonal</span>
          </div>
          <h1 className="section-title">Languages & Communication</h1>
          <p className="section-subtitle ms-0 text-start">
            Languages listed in curriculum vitae for cross-functional collaboration and user technical support.
          </p>
        </div>

        {/* Language Cards */}
        <div className="row g-4 justify-content-center mb-5">
          {languagesData.map((lang, index) => (
            <motion.div 
              className="col-md-4 col-sm-6"
              key={lang.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard3D maxTilt={9} className="h-100">
                <div className="language-card h-100 d-flex flex-column justify-content-between p-4">
                  <div>
                    <div className="language-circle font-mono mb-3">
                      {lang.code}
                    </div>
                    <h2 className="fs-4 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {lang.name}
                    </h2>
                    <p className="text-secondary fs-8 mb-3" style={{ fontSize: '0.86rem' }}>
                      Documented language capability from CV profile for clear interpersonal communication.
                    </p>
                  </div>

                  <div className="pt-3 border-top d-flex align-items-center justify-content-center gap-2 font-mono fs-8" style={{ borderColor: 'var(--border-subtle)', color: 'var(--accent-emerald)', fontSize: '0.8rem' }}>
                    <BsCheckCircleFill />
                    <span>Curriculum Vitae Verified</span>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* Communication in IT Support Context */}
        <div className="mb-5">
          <h2 className="fs-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Communication in IT & Network Engineering
          </h2>
          <div className="row g-4">
            {communicationHighlights.map((item, idx) => (
              <div className="col-md-4" key={idx}>
                <TiltCard3D maxTilt={7} className="h-100">
                  <div className="glass-card h-100">
                    <div className="cert-icon-box mb-3">
                      <BsChatDots size={20} />
                    </div>
                    <h3 className="fs-6 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h3>
                    <p className="text-secondary fs-8 mb-0" style={{ fontSize: '0.88rem' }}>
                      {item.desc}
                    </p>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </div>

        {/* Factual Note */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-dark border border-secondary text-muted fs-8" style={{ fontSize: '0.82rem' }}>
            <BsShieldCheck className="text-info" />
            <span>Strict CV Adherence &bull; Zero assigned arbitrary percentages or unverified CEFR scores</span>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Ready to get in touch?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>Direct phone, email, and inquiry form are available on the Contact route.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/contact" className="btn btn-brand-primary">
              <span>Go to Contact Page</span>
              <BsArrowRight size={14} />
            </Link>
            <Link to="/skills" className="btn btn-brand-outline">
              <span>View Skills</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
