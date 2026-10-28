import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BsHeadset, 
  BsTerminal, 
  BsHddNetwork, 
  BsGlobe2, 
  BsCheckCircleFill, 
  BsSearch,
  BsShieldCheck,
  BsArrowRight
} from 'react-icons/bs';
import { skillsData } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function SkillsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  // Filter skills based on search term and category
  const filteredData = skillsData
    .filter(cat => selectedCategory === 'all' || cat.id === selectedCategory)
    .map(cat => ({
      ...cat,
      skills: cat.skills.filter(s => 
        s.toLowerCase().includes(searchTerm.toLowerCase().trim())
      )
    }))
    .filter(cat => cat.skills.length > 0);

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Skills</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <div className="section-badge mb-2">
            <span>Verified Competencies</span>
          </div>
          <h1 className="section-title">Technical Skills & Expertise</h1>
          <p className="section-subtitle ms-0 text-start">
            Grouped technical capabilities extracted strictly from curriculum vitae with live search and category filtering.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card mb-5 p-4">
          <div className="row g-3 align-items-center justify-content-between">
            {/* Search Input */}
            <div className="col-lg-5 col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-info">
                  <BsSearch />
                </span>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  placeholder="Search skills (e.g. Linux, TCP/IP, Ticket, Wi-Fi)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search skills"
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills */}
            <div className="col-lg-7 col-md-6">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${selectedCategory === 'all' ? 'btn-info text-dark fw-bold' : 'btn-brand-outline'}`}
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => setSelectedCategory('all')}
                >
                  All ({skillsData.reduce((acc, c) => acc + c.skills.length, 0)})
                </button>
                {skillsData.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`btn btn-sm rounded-pill font-mono px-3 py-1 ${selectedCategory === cat.id ? 'btn-info text-dark fw-bold' : 'btn-brand-outline'}`}
                    style={{ fontSize: '0.8rem' }}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="row g-4 mb-5">
          <AnimatePresence mode="popLayout">
            {filteredData.length > 0 ? (
              filteredData.map((category, index) => (
                <motion.div 
                  className="col-md-6"
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <TiltCard3D maxTilt={7} className="h-100">
                    <div className="skill-category-card h-100">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="skill-category-icon">
                          {getCategoryIcon(category.id)}
                        </div>
                        <span className="badge rounded-pill bg-dark border border-secondary font-mono px-3 py-2 text-info" style={{ fontSize: '0.75rem' }}>
                          {category.badge}
                        </span>
                      </div>

                      <h2 className="fs-5 fw-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {category.category}
                      </h2>
                      <p className="text-muted fs-8 mb-4" style={{ fontSize: '0.88rem' }}>
                        {category.description}
                      </p>

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
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="p-5 glass-card max-w-500 mx-auto">
                  <div className="text-muted mb-3 fs-1">🔍</div>
                  <h3 className="fs-5 fw-bold mb-2">No skills found matching "{searchTerm}"</h3>
                  <p className="text-muted fs-8 mb-4">
                    Try searching for another keyword or clear the search filter.
                  </p>
                  <button 
                    className="btn btn-brand-primary btn-sm"
                    onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Verification Note */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 p-2 px-3 rounded-pill bg-dark border border-secondary text-muted fs-8" style={{ fontSize: '0.82rem' }}>
            <BsShieldCheck className="text-info" />
            <span>Strictly verified from CV &bull; Zero fabricated percentages or tools</span>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="p-4 rounded-3 border d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <div>
            <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Need to discuss technical requirements?</div>
            <div className="text-muted fs-8" style={{ fontSize: '0.85rem' }}>Connect directly via email or UK telephone to arrange an interview.</div>
          </div>
          <div className="d-flex gap-2">
            <Link to="/contact" className="btn btn-brand-primary">
              <span>Contact Raish</span>
              <BsArrowRight size={14} />
            </Link>
            <Link to="/experience" className="btn btn-brand-outline">
              <span>View Experience</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
