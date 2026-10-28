import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BsMortarboard, 
  BsHddNetwork, 
  BsShieldCheck, 
  BsCheckCircleFill,
  BsChevronRight
} from 'react-icons/bs';
import { personalInfo } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function AboutPage() {
  const credentials = [
    {
      title: "Postgraduate Degree",
      value: "M.Sc. Data & Artificial Intelligence",
      subtext: "University of Wales Trinity Saint David (Sep 2026 – Present)",
      icon: <BsMortarboard size={24} className="text-info" />
    },
    {
      title: "Undergraduate Degree",
      value: "B.E. in Computer Engineering",
      subtext: "Arrdekta Institute of Technology (2019 – 2023)",
      icon: <BsMortarboard size={24} className="text-info" />
    },
    {
      title: "Network Experience",
      value: "Network Engineer",
      subtext: "National Innovation Foundation-India, GoI (June 2024 – July 2026)",
      icon: <BsHddNetwork size={24} className="text-info" />
    },
    {
      title: "Security Exposure",
      value: "VAPT & Penetration Testing",
      subtext: "NK Cyber Security Pvt. Ltd. (Jan 2023 – May 2023)",
      icon: <BsShieldCheck size={24} className="text-info" />
    }
  ];

  const corePillars = [
    {
      title: "Operating System Administration",
      desc: "Proficient deployment and maintenance of Windows and Linux client and server environments.",
      skills: ["Windows OS", "Linux Environments", "OS Configuration", "Routine Updates"]
    },
    {
      title: "IT Support & Troubleshooting",
      desc: "Fast, structured incident diagnosis, ticket management, and dedicated user technical support.",
      skills: ["Technical Troubleshooting", "Incident & Ticket Management", "System Setup", "User Assistance"]
    },
    {
      title: "Hardware & Networking",
      desc: "Hands-on installation of physical IT assets, local area networks, TCP/IP setup, and Wi-Fi configurations.",
      skills: ["Hardware Installation", "LAN Protocols", "TCP/IP Fundamentals", "Wi-Fi Connectivity"]
    },
    {
      title: "Cybersecurity & VAPT",
      desc: "Practical exposure to vulnerability assessment, penetration testing methodologies, and cyber forensics.",
      skills: ["Vulnerability Assessment", "Penetration Testing Exposure", "Ethical Hacking Basics", "Cyber Forensics"]
    }
  ];

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">About</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-5">
          <div className="section-badge mb-2">
            <span>Candidate Profile</span>
          </div>
          <h1 className="section-title">About Raish Mansuri</h1>
          <p className="section-subtitle ms-0 text-start">
            Detailed overview of professional background, qualifications, core strengths, and UK job market readiness.
          </p>
        </div>

        {/* Foundation Statement Box */}
        <motion.div 
          className="about-quote-box mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge rounded-pill bg-info text-dark font-mono px-3 py-2">
              Official CV Summary
            </span>
            <span className="text-muted fs-8 font-mono" style={{ fontSize: '0.8rem' }}>
              Single Source of Truth
            </span>
          </div>

          <blockquote className="fs-5 lh-lg mb-4" style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
            "{personalInfo.aboutSummary}"
          </blockquote>

          <div className="pt-3 border-top mt-auto" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="row g-3">
              <div className="col-sm-4">
                <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>Direct Email</div>
                <a href={`mailto:${personalInfo.email}`} className="fw-semibold text-break" style={{ color: 'var(--accent-cyan)' }}>
                  {personalInfo.email}
                </a>
              </div>
              <div className="col-sm-4">
                <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>Telephone</div>
                <a href={`tel:${personalInfo.phoneClean}`} className="fw-semibold" style={{ color: 'var(--accent-cyan)' }}>
                  {personalInfo.phone}
                </a>
              </div>
              <div className="col-sm-4">
                <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>Location</div>
                <span className="fw-semibold" style={{ color: 'var(--text-primary)' }}>
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="mb-5">
          <h2 className="fs-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Core Operational Pillars
          </h2>
          <div className="row g-4">
            {corePillars.map((pillar, idx) => (
              <div className="col-md-6" key={idx}>
                <TiltCard3D maxTilt={6} className="h-100">
                  <div className="glass-card h-100">
                    <h3 className="fs-5 fw-bold mb-2" style={{ color: 'var(--accent-cyan)' }}>
                      {pillar.title}
                    </h3>
                    <p className="text-secondary fs-8 mb-3" style={{ fontSize: '0.9rem' }}>
                      {pillar.desc}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mt-auto">
                      {pillar.skills.map((s, sIdx) => (
                        <span className="skill-item-pill" key={sIdx}>
                          <BsCheckCircleFill size={12} style={{ color: 'var(--accent-cyan)' }} />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </div>

        {/* Key Credentials Grid */}
        <div className="mb-5">
          <h2 className="fs-4 fw-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Verified Milestones
          </h2>
          <div className="row g-3">
            {credentials.map((item, idx) => (
              <div className="col-md-6 col-lg-3" key={idx}>
                <TiltCard3D maxTilt={8} className="h-100">
                  <div className="highlight-stat-card d-flex flex-column h-100">
                    <div className="cert-icon-box mb-3">
                      {item.icon}
                    </div>
                    <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                      {item.title}
                    </div>
                    <div className="fw-bold fs-6 mt-1 mb-1" style={{ color: 'var(--text-primary)' }}>
                      {item.value}
                    </div>
                    <div className="text-secondary fs-8 mt-auto" style={{ fontSize: '0.8rem' }}>
                      {item.subtext}
                    </div>
                  </div>
                </TiltCard3D>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Ready to review verified career history?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>Examine roles at National Innovation Foundation-India and NK Cyber Security.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/experience" className="btn btn-brand-primary">
              <span>View Experience</span>
              <BsChevronRight size={14} />
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
