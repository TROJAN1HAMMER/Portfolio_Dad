import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl } from '../config/business';

interface ContactSectionProps {
  selectedCategory: string;
  onOpenPrivacyModal: (tab: 'privacy' | 'disclaimer') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedCategory,
  onOpenPrivacyModal,
}) => {
  const { advisor } = BUSINESS_CONFIG;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(selectedCategory || 'Health');
  const [preferredMethod, setPreferredMethod] = useState<'WhatsApp' | 'Call' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);

  // Sync category if user clicked a service card CTA
  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please provide your mobile number.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!consent) {
      errs.consent = 'You must agree to be contacted regarding this enquiry.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Build the formatted enquiry text
    const textLines = [
      `*New Insurance Enquiry for Balasubramanya MG*`,
      `---------------------------------`,
      `*Name:* ${fullName.trim()}`,
      `*Phone:* ${phone.trim()}`,
      email.trim() ? `*Email:* ${email.trim()}` : null,
      `*Interested In:* ${category} Insurance`,
      `*Preferred Contact:* ${preferredMethod}`,
      message.trim() ? `*Notes:* ${message.trim()}` : null,
      `---------------------------------`,
      `_Sent via advisor portfolio website_`,
    ].filter(Boolean);

    const fullMessage = textLines.join('\n');
    const waUrl = `https://wa.me/91${advisor.phoneRaw}?text=${encodeURIComponent(fullMessage)}`;

    setHandoffUrl(waUrl);
    setIsPrepared(true);

    // If preferred method is WhatsApp, automatically open the link in a new tab
    if (preferredMethod === 'WhatsApp') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReset = () => {
    setIsPrepared(false);
    setHandoffUrl(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setConsent(false);
    setErrors({});
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag green">Connect Directly</span>
          <h2 className="section-title">Let's Find the Right Insurance Options for You</h2>
          <p className="section-subtitle">
            Have questions about health, life or general insurance? Get in touch to discuss your requirements.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Direct Communication Cards */}
          <div className="contact-info-cards">
            <h3 className="contact-info-heading">Direct Advisory Channels</h3>
            <p className="contact-info-lead">
              You are welcome to reach out via your preferred method. Fast responses during normal business hours across India.
            </p>

            <div className="contact-methods-grid">
              {/* Call Card */}
              <a
                href={buildTelUrl()}
                className="contact-card-item"
                aria-label={`Call Balasubramanya MG at ${advisor.phoneFormatted}`}
              >
                <div className="contact-card-icon call">
                  <Phone size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="card-label">Direct Phone Call</span>
                  <span className="card-value">{advisor.phoneFormatted}</span>
                  <span className="card-action">Tap to call now &rarr;</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/91${advisor.phoneRaw}?text=${encodeURIComponent('Hello Balasubramanya sir, I would like to enquire about insurance.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-item"
                aria-label="Send WhatsApp message"
              >
                <div className="contact-card-icon whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="card-label">WhatsApp Chat</span>
                  <span className="card-value">{advisor.phoneFormatted}</span>
                  <span className="card-action">Instant messaging &rarr;</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href={buildMailtoUrl('Insurance Guidance Enquiry')}
                className="contact-card-item"
                aria-label={`Email Balasubramanya MG at ${advisor.email}`}
              >
                <div className="contact-card-icon email">
                  <Mail size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="card-label">Email Enquiry</span>
                  <span className="card-value">{advisor.email}</span>
                  <span className="card-action">Send detailed message &rarr;</span>
                </div>
              </a>
            </div>

            {/* Direct Assurance Notice */}
            <div className="contact-assurance-box">
              <span className="assurance-title">No Pressure Guarantee</span>
              <p>
                Enquiries are solely to discuss your requirements. You will never be subjected to high-pressure sales calls or unsolicited spam.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="contact-form-wrapper">
            <div className="form-card">
              <h3 className="form-title">Request a Consultation</h3>
              <p className="form-subtitle">
                Fill in your details below. Your enquiry will be prefilled into WhatsApp for immediate direct delivery.
              </p>

              {isPrepared && handoffUrl ? (
                // SUCCESS / HANDOFF STATE
                <div className="handoff-card" role="alert">
                  <div className="handoff-icon-wrapper">
                    <CheckCircle size={36} className="handoff-check-icon" />
                  </div>
                  <h4 className="handoff-title">Your Enquiry Is Ready!</h4>
                  <p className="handoff-desc">
                    To maintain privacy and avoid third-party storage, your enquiry has been formatted and is ready to send directly to <strong>{advisor.fullName}</strong>.
                  </p>

                  <div className="handoff-actions">
                    <a
                      href={handoffUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg handoff-btn"
                    >
                      <MessageCircle size={20} />
                      <span>Send via WhatsApp Now</span>
                      <ArrowUpRight size={18} />
                    </a>

                    <a
                      href={buildMailtoUrl(
                        `Insurance Enquiry: ${category} (${fullName})`,
                        `Name: ${fullName}\nPhone: ${phone}\nCategory: ${category}\nNotes: ${message}`
                      )}
                      className="btn btn-outline handoff-btn-secondary"
                    >
                      <Mail size={16} />
                      <span>Send via Email Instead</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-link handoff-reset-btn"
                    >
                      Edit details or send another enquiry
                    </button>
                  </div>
                </div>
              ) : (
                // ACTIVE FORM
                <form onSubmit={handleSubmit} noValidate className="lead-form">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      placeholder="e.g. Rajesh Kumar"
                      className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                      required
                    />
                    {errors.fullName && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Mobile Number <span className="required-star">*</span>
                    </label>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        placeholder="98765 43210"
                        className={`form-input phone-field ${errors.phone ? 'has-error' : ''}`}
                        required
                      />
                    </div>
                    {errors.phone && (
                      <span className="form-error-msg">
                        <AlertCircle size={14} /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email (Optional) */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="optional-tag">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="form-input"
                    />
                  </div>

                  {/* Insurance Category Dropdown */}
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Insurance Category <span className="required-star">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      <option value="Health">Health Insurance (Star Health)</option>
                      <option value="Life">Life Insurance (SBI Life)</option>
                      <option value="Motor">Motor Insurance (ICICI Lombard)</option>
                      <option value="Travel">Travel Insurance (ICICI Lombard)</option>
                      <option value="Home">Home Insurance (ICICI Lombard)</option>
                      <option value="Other">Other General Insurance</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="form-group">
                    <span className="form-label">Preferred Contact Method</span>
                    <div className="contact-methods-radio-group">
                      {(['WhatsApp', 'Call', 'Email'] as const).map((method) => (
                        <label key={method} className={`radio-pill ${preferredMethod === method ? 'active' : ''}`}>
                          <input
                            type="radio"
                            name="preferredMethod"
                            value={method}
                            checked={preferredMethod === method}
                            onChange={() => setPreferredMethod(method)}
                            className="sr-only"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Your Questions or Requirements <span className="optional-tag">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Looking for individual health coverage with maternity benefit, or term insurance quotes..."
                      className="form-textarea"
                    ></textarea>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="form-group consent-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors({ ...errors, consent: '' });
                        }}
                        className="form-checkbox"
                        required
                      />
                      <span className="checkbox-text">
                        I agree to be contacted by Balasubramanya MG regarding this insurance enquiry and have reviewed the{' '}
                        <button
                          type="button"
                          onClick={() => onOpenPrivacyModal('privacy')}
                          className="link-button"
                        >
                          privacy notice
                        </button>
                        . <span className="required-star">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <span className="form-error-msg consent-error">
                        <AlertCircle size={14} /> {errors.consent}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-lg form-submit-btn">
                    <Send size={18} />
                    <span>Proceed to WhatsApp Hand-Off</span>
                  </button>

                  <p className="form-privacy-note">
                    🔒 <strong>Privacy Assurance:</strong> Your details are used strictly to reply to your enquiry and are not shared with third-party advertisers.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
