import { motion } from 'framer-motion';
import { BsMortarboard, BsHddNetwork, BsShieldCheck } from 'react-icons/bs';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const highlights = [
    {
      title: "Postgraduate Degree",
      value: "M.Sc. Data & AI",
      subtext: "UWTSD, Birmingham (Sep 2026 – Present)",
      icon: <BsMortarboard size={22} className="text-info" />
    },
    {
      title: "Undergraduate Degree",
      value: "B.E. in Computer Engineering",
      subtext: "Arrdekta Institute of Technology (2019 – 2023)",
      icon: <BsMortarboard size={22} className="text-info" />
    },
    {
      title: "Work Experience",
      value: "Network Engineer",
      subtext: "National Innovation Foundation-India, GoI",
      icon: <BsHddNetwork size={22} className="text-info" />
    },
    {
      title: "Security Exposure",
      value: "VAPT & Pen Testing",
      subtext: "NK Cyber Security Pvt. Ltd.",
      icon: <BsShieldCheck size={22} className="text-info" />
    }
  ];

  return (
    <section id="about" className="section-bg-alt">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Profile Overview</span>
          </div>
          <h2 className="section-title">About Raish Mansuri</h2>
          <p className="section-subtitle">
            A committed Computer Engineering graduate combining practical network administration, system support, and cybersecurity exposure.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Main CV Foundation Statement */}
          <motion.div 
            className="col-lg-7"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-quote-box h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="badge rounded-pill bg-info text-dark font-mono px-3 py-2">
                    CV Profile
                  </span>
                  <span className="text-muted fs-8 font-mono" style={{ fontSize: '0.8rem' }}>
                    Candidate Summary
                  </span>
                </div>

                <blockquote className="fs-5 lh-lg mb-4" style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>
                  "{personalInfo.aboutSummary}"
                </blockquote>
              </div>

              <div className="pt-3 border-top mt-auto" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>Direct Email</div>
                    <a href={`mailto:${personalInfo.email}`} className="fw-semibold text-break" style={{ color: 'var(--accent-cyan)' }}>
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-muted fs-8" style={{ fontSize: '0.82rem' }}>UK Contact</div>
                    <a href={`tel:${personalInfo.phoneClean}`} className="fw-semibold" style={{ color: 'var(--accent-cyan)' }}>
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Highlight Cards */}
          <motion.div 
            className="col-lg-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="row g-3 h-100">
              {highlights.map((item, index) => (
                <div className="col-12 col-sm-6 col-lg-12" key={index}>
                  <div className="highlight-stat-card d-flex align-items-center gap-3">
                    <div className="cert-icon-box">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        {item.title}
                      </div>
                      <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </div>
                      <div className="text-secondary fs-8 mt-1" style={{ fontSize: '0.82rem' }}>
                        {item.subtext}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
