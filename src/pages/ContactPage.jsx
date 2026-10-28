import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BsEnvelopeFill, 
  BsTelephoneFill, 
  BsGeoAltFill, 
  BsSend, 
  BsInfoCircle, 
  BsCodeSquare, 
  BsChevronDown, 
  BsChevronUp,
  BsClock
} from 'react-icons/bs';
import { personalInfo } from '../data/portfolioData';
import TiltCard3D from '../components/TiltCard3D';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a subject.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide message details.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Direct mailto generation without fake success alert
    const subjectEncoded = encodeURIComponent(`[Portfolio Contact] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    
    setSubmissionStatus({
      title: 'Email Client Activated',
      text: `Your message has been formatted and opened in your email client addressed to ${personalInfo.email}.`,
      developerNote: 'Static client mode: To receive form submissions straight to your inbox without opening the user\'s local email client, connect a form endpoint service like Formspree or EmailJS.'
    });

    window.location.href = mailtoUrl;
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb font-mono fs-8" style={{ fontSize: '0.82rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active text-info" aria-current="page">Contact</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-5">
          <div className="section-badge mb-2">
            <span>Direct Communication</span>
          </div>
          <h1 className="section-title">Contact & Inquiries</h1>
          <p className="section-subtitle ms-0 text-start">
            Direct communication channels for UK hiring managers, recruiters, and technical teams.
          </p>
        </div>

        <div className="row g-4 justify-content-between">
          {/* Left Column: Direct Contact Info */}
          <motion.div 
            className="col-lg-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="d-flex flex-column gap-3 mb-4">
              {/* Telephone */}
              <TiltCard3D maxTilt={6}>
                <a 
                  href={`tel:${personalInfo.phoneClean}`} 
                  className="contact-info-card text-decoration-none"
                  aria-label={`Call ${personalInfo.name} at ${personalInfo.phone}`}
                >
                  <div className="contact-icon-circle">
                    <BsTelephoneFill />
                  </div>
                  <div>
                    <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                      Telephone (UK)
                    </div>
                    <div className="fw-bold fs-5" style={{ color: 'var(--text-primary)' }}>
                      {personalInfo.phone}
                    </div>
                    <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                      Click to initiate phone call
                    </div>
                  </div>
                </a>
              </TiltCard3D>

              {/* Email */}
              <TiltCard3D maxTilt={6}>
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="contact-info-card text-decoration-none"
                  aria-label={`Send email to ${personalInfo.email}`}
                >
                  <div className="contact-icon-circle">
                    <BsEnvelopeFill />
                  </div>
                  <div className="text-break">
                    <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                      Email Address
                    </div>
                    <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                      {personalInfo.email}
                    </div>
                    <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                      Click to compose email
                    </div>
                  </div>
                </a>
              </TiltCard3D>

              {/* Location */}
              <TiltCard3D maxTilt={6}>
                <div className="contact-info-card">
                  <div className="contact-icon-circle">
                    <BsGeoAltFill />
                  </div>
                  <div>
                    <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                      Location
                    </div>
                    <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                      {personalInfo.location}
                    </div>
                    <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                      United Kingdom
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </div>

            {/* Quick Response Notice */}
            <div className="glass-card-subtle mb-4">
              <div className="d-flex align-items-center gap-2 mb-2">
                <BsClock className="text-info" size={16} />
                <span className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>Rapid Response Guarantee</span>
              </div>
              <p className="text-muted fs-8 mb-0" style={{ fontSize: '0.86rem' }}>
                All telephone inquiries and email communications from recruiters and employers receive prompt responses.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="col-lg-7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card">
              <h2 className="fs-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Send Direct Message
              </h2>
              <p className="text-muted fs-8 mb-4" style={{ fontSize: '0.9rem' }}>
                Submit the form below to reach out directly regarding job opportunities or inquiries.
              </p>

              {/* Submission Notice Banner */}
              {submissionStatus && (
                <div className="alert alert-info border-info d-flex align-items-start gap-3 mb-4" role="alert">
                  <BsInfoCircle size={20} className="mt-1 flex-shrink-0 text-info" />
                  <div className="fs-8" style={{ fontSize: '0.88rem' }}>
                    <div className="fw-bold mb-1">{submissionStatus.title}</div>
                    <div>{submissionStatus.text}</div>
                    <div className="mt-2 pt-2 border-top border-info-subtle text-muted" style={{ fontSize: '0.8rem' }}>
                      <strong>Setup Note:</strong> {submissionStatus.developerNote}
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name-input" className="form-label-custom">
                      Your Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="name-input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.name ? 'border-danger' : ''}`}
                      placeholder="e.g. John Doe"
                      required
                    />
                    {errors.name && <div className="form-feedback-error">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email-input" className="form-label-custom">
                      Your Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="email-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.email ? 'border-danger' : ''}`}
                      placeholder="e.g. john@company.co.uk"
                      required
                    />
                    {errors.email && <div className="form-feedback-error">{errors.email}</div>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="subject-input" className="form-label-custom">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject-input"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.subject ? 'border-danger' : ''}`}
                      placeholder="e.g. IT Support / Network Engineer Role"
                      required
                    />
                    {errors.subject && <div className="form-feedback-error">{errors.subject}</div>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="message-input" className="form-label-custom">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.message ? 'border-danger' : ''}`}
                      placeholder="Details regarding your role, organization, or inquiry..."
                      required
                    />
                    {errors.message && <div className="form-feedback-error">{errors.message}</div>}
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-brand-primary w-100 py-3">
                      <BsSend size={16} />
                      <span>Send Inquiry (via Email Client)</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Developer Integration Guide */}
              <div className="mt-4 pt-3 border-top" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  type="button"
                  className="btn btn-sm btn-brand-ghost w-100 d-flex align-items-center justify-content-between p-2"
                  onClick={() => setShowIntegrationGuide(!showIntegrationGuide)}
                  aria-expanded={showIntegrationGuide}
                >
                  <span className="d-flex align-items-center gap-2 font-mono fs-8" style={{ fontSize: '0.82rem' }}>
                    <BsCodeSquare className="text-info" />
                    <span>How to connect this form to a backend service</span>
                  </span>
                  {showIntegrationGuide ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />}
                </button>

                {showIntegrationGuide && (
                  <div className="contact-notice-box mt-3 font-mono">
                    <div className="fw-bold text-info mb-2 fs-8" style={{ fontSize: '0.85rem' }}>
                      Serverless Endpoint Integration Steps:
                    </div>
                    <ol className="ps-3 mb-2 fs-8" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                      <li>
                        <strong>Option A (Formspree):</strong> Create a free form at <code>formspree.io</code> targeting <code>{personalInfo.email}</code>. Then update <code>handleSubmit</code> to post form data directly to your Formspree endpoint.
                      </li>
                      <li>
                        <strong>Option B (EmailJS):</strong> Install <code>@emailjs/browser</code> and dispatch messages using your private public key and template ID.
                      </li>
                      <li>
                        <strong>Option C (Node.js / Express):</strong> Post JSON payloads to your custom API route utilizing Nodemailer or Resend.
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
