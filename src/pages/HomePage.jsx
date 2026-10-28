import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BsArrowRight,
  BsShieldCheck,
  BsHddNetwork,
  BsMortarboard,
  BsHeadset,
  BsTranslate,
  BsEnvelopeFill
} from 'react-icons/bs';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Certifications from '../components/Certifications';
import TiltCard3D from '../components/TiltCard3D';

export default function HomePage({ theme }) {
  const portalRoutes = [
    {
      title: "About Me",
      desc: "Computer Engineering background & career goals.",
      path: "/about",
      icon: <BsMortarboard size={20} className="text-info" />,
      badge: "Profile"
    },
    {
      title: "Work History",
      desc: "Network Engineer at NIF-India & Cyber Security Intern.",
      path: "/experience",
      icon: <BsHddNetwork size={20} className="text-info" />,
      badge: "Experience"
    },
    {
      title: "Technical Skills",
      desc: "IT Support, Windows/Linux, Hardware & Network protocols.",
      path: "/skills",
      icon: <BsHeadset size={20} className="text-info" />,
      badge: "4 Disciplines"
    },
    {
      title: "Certifications",
      desc: "VAPT, Ethical Hacking, Forensics & Cyber Awareness.",
      path: "/certifications",
      icon: <BsShieldCheck size={20} className="text-info" />,
      badge: "5 Verified"
    },
    {
      title: "Languages",
      desc: "English, Hindi, and Gujarati .",
      path: "/languages",
      icon: <BsTranslate size={20} className="text-info" />,
      badge: "Multilingual"
    },
    {
      title: "Direct Contact",
      desc: "UK telephone, verified email, and inquiry form.",
      path: "/contact",
      icon: <BsEnvelopeFill size={20} className="text-info" />,
      badge: "Birmingham, UK"
    }
  ];

  return (
    <div className="home-page-container">
      {/* 3D Hero Section */}
      <Hero theme={theme} />

      {/* Quick Navigation Hub with 3D Tilt Cards */}
      <section className="py-5 border-top border-bottom" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-badge mb-2">
              <span>Direct Routing</span>
            </div>
            <h2 className="fs-3 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Explore Specific Sections
            </h2>
            <p className="text-muted fs-8 mb-0" style={{ fontSize: '0.9rem' }}>
              Jump straight into distinct, dedicated route pages designed for recruiters and hiring managers.
            </p>
          </div>

          <div className="row g-3">
            {portalRoutes.map((route, idx) => (
              <motion.div
                className="col-md-4 col-sm-6"
                key={route.path}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <TiltCard3D maxTilt={8} className="h-100">
                  <Link to={route.path} className="glass-card text-decoration-none d-flex flex-column h-100 p-4">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="cert-icon-box" style={{ width: 42, height: 42 }}>
                        {route.icon}
                      </div>
                      <span className="badge rounded-pill bg-dark border border-secondary text-info font-mono" style={{ fontSize: '0.72rem' }}>
                        {route.badge}
                      </span>
                    </div>

                    <h3 className="fs-6 fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {route.title}
                    </h3>
                    <p className="text-secondary fs-8 mb-3" style={{ fontSize: '0.84rem' }}>
                      {route.desc}
                    </p>

                    <div className="mt-auto d-flex align-items-center gap-2 fw-semibold fs-8" style={{ color: 'var(--accent-cyan)', fontSize: '0.82rem' }}>
                      <span>View Route</span>
                      <BsArrowRight size={13} />
                    </div>
                  </Link>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Overview */}
      <About />

      {/* Core Technical Skills */}
      <Skills />

      {/* Experience Timeline */}
      <Experience />

      {/* Certifications */}
      <Certifications />

      {/* Recruiter Call To Action Banner */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, rgba(0, 180, 216, 0.12) 0%, rgba(30, 58, 138, 0.18) 100%)' }}>
        <div className="container text-center">
          <div className="max-w-700 mx-auto">
            <h2 className="fs-3 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Looking for an IT Support or Network Specialist in the UK?
            </h2>
            <p className="text-secondary mb-4" style={{ fontSize: '0.95rem' }}>
              Raish Mansuri is based in Birmingham, UK, with documented hands-on expertise in network engineering, OS administration, hardware deployment, and cybersecurity.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/contact" className="btn btn-brand-primary">
                <BsEnvelopeFill size={15} />
                <span>Contact Raish Mansuri</span>
              </Link>
              <Link to="/experience" className="btn btn-brand-outline">
                <span>View Work Experience</span>
                <BsArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
