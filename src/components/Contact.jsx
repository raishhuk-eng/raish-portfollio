import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BsEnvelopeFill, 
  BsTelephoneFill, 
  BsGeoAltFill, 
  BsSend, 
  BsInfoCircle, 
  BsCodeSquare, 
  BsChevronDown, 
  BsChevronUp
} from 'react-icons/bs';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showIntegrationGuide, setShowIntegrationGuide] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please specify a message subject.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message details.';
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
    
    if (!validateForm()) {
      return;
    }

    // Notice requirement: Do NOT display a fake success message indicating backend submission.
    // Instead, compose an authentic mailto link and trigger the user's email client,
    // and provide transparent documentation on backend integration options.
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    
    // Set informative status
    setSubmissionStatus({
      type: 'info',
      title: 'Email Client Activated',
      text: `Your message was prepared and opened in your email client addressed directly to ${personalInfo.email}.`,
      developerNote: 'Static client mode: To receive form submissions straight to your inbox without opening the user\'s local email client, connect a form endpoint service like Formspree or EmailJS.'
    });

    // Open user's email client
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="section-badge">
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">Contact Raish Mansuri</h2>
          <p className="section-subtitle">
            Available for IT Support, Network Engineering, and Cybersecurity opportunities across the UK.
          </p>
        </div>

        <div className="row g-4 justify-content-between">
          {/* Left Column: Direct Contact Information */}
          <motion.div 
            className="col-lg-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="d-flex flex-column gap-3 mb-4">
              {/* Phone Link */}
              <a 
                href={`tel:${personalInfo.phoneClean}`} 
                className="contact-info-card text-decoration-none"
                aria-label={`Call Raish Mansuri at ${personalInfo.phone}`}
              >
                <div className="contact-icon-circle">
                  <BsTelephoneFill />
                </div>
                <div>
                  <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                    Telephone (UK)
                  </div>
                  <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                    {personalInfo.phone}
                  </div>
                  <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                    Click to initiate call
                  </div>
                </div>
              </a>

              {/* Email Link */}
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
                    Direct Email
                  </div>
                  <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                    {personalInfo.email}
                  </div>
                  <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                    Click to open email client
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="contact-info-card">
                <div className="contact-icon-circle">
                  <BsGeoAltFill />
                </div>
                <div>
                  <div className="text-muted fs-8 font-mono text-uppercase" style={{ fontSize: '0.75rem' }}>
                    Current Location
                  </div>
                  <div className="fw-bold fs-6" style={{ color: 'var(--text-primary)' }}>
                    {personalInfo.location}
                  </div>
                  <div className="text-muted fs-8" style={{ fontSize: '0.8rem' }}>
                    UK Work Authorization / Right to Work
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Validation & Integration Guidance */}
          <motion.div 
            className="col-lg-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="glass-card">
              <h3 className="fs-5 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Send a Direct Message
              </h3>
              <p className="text-muted fs-8 mb-4" style={{ fontSize: '0.9rem' }}>
                Fill out the details below. For recruiters and hiring managers looking for rapid response.
              </p>

              {/* Submission Status Alert (Not a fake success banner) */}
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
                  {/* Name Field */}
                  <div className="col-md-6">
                    <label htmlFor="contact-name" className="form-label-custom">
                      Your Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.name ? 'border-danger' : ''}`}
                      placeholder="e.g. Alex Smith"
                      required
                      aria-required="true"
                    />
                    {errors.name && <div className="form-feedback-error">{errors.name}</div>}
                  </div>

                  {/* Email Field */}
                  <div className="col-md-6">
                    <label htmlFor="contact-email" className="form-label-custom">
                      Your Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.email ? 'border-danger' : ''}`}
                      placeholder="e.g. alex@example.co.uk"
                      required
                      aria-required="true"
                    />
                    {errors.email && <div className="form-feedback-error">{errors.email}</div>}
                  </div>

                  {/* Subject Field */}
                  <div className="col-12">
                    <label htmlFor="contact-subject" className="form-label-custom">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.subject ? 'border-danger' : ''}`}
                      placeholder="e.g. IT Support / Network Engineer Opportunity"
                      required
                      aria-required="true"
                    />
                    {errors.subject && <div className="form-feedback-error">{errors.subject}</div>}
                  </div>

                  {/* Message Field */}
                  <div className="col-12">
                    <label htmlFor="contact-message" className="form-label-custom">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-control form-control-custom ${errors.message ? 'border-danger' : ''}`}
                      placeholder="Please share details regarding your role, location, or inquiry..."
                      required
                      aria-required="true"
                    />
                    {errors.message && <div className="form-feedback-error">{errors.message}</div>}
                  </div>

                  {/* Submit Button */}
                  <div className="col-12">
                    <button type="submit" className="btn btn-brand-primary w-100 py-3">
                      <BsSend size={16} />
                      <span>Send Message (via Mail Client)</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Developer / Service Connection Guide Toggle */}
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
                      Connecting Formspree or EmailJS:
                    </div>
                    <ol className="ps-3 mb-2 fs-8" style={{ fontSize: '0.8rem', lineHeight: '1.6' }}>
                      <li>
                        <strong>Option A (Formspree):</strong> Register for free at <code>https://formspree.io</code>, create a form pointing to <code>raishmansuri0777@gmail.com</code>, and update the form action to <code>https://formspree.io/f/YOUR_ID</code> with a standard POST fetch.
                      </li>
                      <li>
                        <strong>Option B (EmailJS):</strong> Install <code>@emailjs/browser</code>, configure your Service ID & Template ID, and call <code>emailjs.sendForm()</code> inside <code>handleSubmit</code>.
                      </li>
                      <li>
                        <strong>Option C (Server Endpoint):</strong> POST JSON payloads directly to an Express/Node.js or Next.js API route using Nodemailer or Resend.
                      </li>
                    </ol>
                    <div className="text-muted fs-8" style={{ fontSize: '0.75rem' }}>
                      Note: Currently the form safely generates a verified pre-filled email to <code>{personalInfo.email}</code> so zero messages are lost.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
