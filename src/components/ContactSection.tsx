import React, { useState, useEffect } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl } from '../config/business';
import { useTranslation } from '../i18n/I18nContext';

interface ContactSectionProps {
  selectedCategory: string;
  onOpenPrivacyModal: (tab: 'privacy' | 'disclaimer') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedCategory,
  onOpenPrivacyModal,
}) => {
  const { advisor } = BUSINESS_CONFIG;
  const { t, language } = useTranslation();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(selectedCategory || 'TermSbi');
  const [preferredMethod, setPreferredMethod] = useState<'WhatsApp' | 'Call' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const [isPrepared, setIsPrepared] = useState(false);

  // Sync category if user clicked a service card CTA
  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory === 'Health') {
        setCategory('HealthStar');
      } else if (selectedCategory === 'Term' || selectedCategory === 'Life') {
        setCategory('TermSbi');
      } else if (selectedCategory === 'Motor') {
        setCategory('MotorIcici');
      } else {
        setCategory(selectedCategory);
      }
    }
  }, [selectedCategory]);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) {
      errs.fullName = t.contact.errors.nameRequired;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.phone = t.contact.errors.phoneRequired;
    } else if (cleanPhone.length < 10) {
      errs.phone = t.contact.errors.phoneInvalid;
    }

    if (!consent) {
      errs.consent = t.contact.errors.consentRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getCategoryLabel = (catKey: string): string => {
    const cats = t.contact.categories;
    switch (catKey) {
      case 'HealthStar':
        return cats.healthStar;
      case 'HealthIcici':
        return cats.healthIcici;
      case 'LifeSbi':
        return cats.lifeSbi;
      case 'TermSbi':
        return cats.termSbi;
      case 'ChildSbi':
        return cats.childSbi;
      case 'MotorIcici':
        return cats.motorIcici;
      case 'TravelIcici':
        return cats.travelIcici;
      case 'HomeIcici':
        return cats.homeIcici;
      case 'Other':
      default:
        return cats.otherGeneral;
    }
  };

  const getMethodLabel = (m: 'WhatsApp' | 'Call' | 'Email'): string => {
    switch (m) {
      case 'WhatsApp':
        return t.contact.methods.whatsapp;
      case 'Call':
        return t.contact.methods.call;
      case 'Email':
        return t.contact.methods.email;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const categoryText = getCategoryLabel(category);
    const methodText = getMethodLabel(preferredMethod);

    // Multilingual inquiry header based on selected language
    let greeting = `*New Insurance Enquiry for Balasubramanya MG*`;
    if (language === 'hi') greeting = `*बालसुब्रमण्य एमजी के लिए नई बीमा पूछताछ*`;
    if (language === 'ml') greeting = `*ബാലസുബ്രഹ്മണ്യ എം ജിക്ക് പുതിയ ഇൻഷുറൻസ് അന്വേഷണം*`;
    if (language === 'kn') greeting = `*ಬಾಲಸುಬ್ರಹ್ಮಣ್ಯ ಎಂ ಜಿ ಅವರಿಗೆ ಹೊಸ ವಿಮಾ ವಿಚಾರಣೆ*`;
    if (language === 'ta') greeting = `*பாலசுப்ரமண்யா எம் ஜி அவர்களுக்கு புதிய காப்பீட்டு விசாரணை*`;

    // Build the formatted enquiry text
    const textLines = [
      greeting,
      `---------------------------------`,
      `*Name:* ${fullName.trim()}`,
      `*Phone:* ${phone.trim()}`,
      email.trim() ? `*Email:* ${email.trim()}` : null,
      `*Interested In:* ${categoryText}`,
      `*Preferred Contact:* ${methodText}`,
      message.trim() ? `*Notes:* ${message.trim()}` : null,
      `---------------------------------`,
      `_Sent via advisor website (Language: ${language.toUpperCase()})_`,
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
          <span className="section-tag green">{t.contact.tag}</span>
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-layout">
          {/* Left Column: Direct Communication Cards */}
          <div className="contact-info-cards">
            <h3 className="contact-info-heading">{t.contact.directHeading}</h3>
            <p className="contact-info-lead">{t.contact.directLead}</p>

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
                  <span className="card-label">{t.contact.callLabel}</span>
                  <span className="card-value">{advisor.phoneFormatted}</span>
                  <span className="card-action">{t.contact.callAction}</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/91${advisor.phoneRaw}?text=${encodeURIComponent(t.whatsappMessages.generalGreeting)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-item"
                aria-label="Send WhatsApp message"
              >
                <div className="contact-card-icon whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div className="contact-card-details">
                  <span className="card-label">{t.contact.whatsappLabel}</span>
                  <span className="card-value">{advisor.phoneFormatted}</span>
                  <span className="card-action">{t.contact.whatsappAction}</span>
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
                  <span className="card-label">{t.contact.emailLabel}</span>
                  <span className="card-value">{advisor.email}</span>
                  <span className="card-action">{t.contact.emailAction}</span>
                </div>
              </a>
            </div>

            {/* Direct Assurance Notice */}
            <div className="contact-assurance-box">
              <span className="assurance-title">{t.contact.assuranceTitle}</span>
              <p>{t.contact.assuranceDesc}</p>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Request Form */}
          <div className="contact-form-wrapper">
            <div className="form-card">
              <h3 className="form-title">{t.contact.formTitle}</h3>
              <p className="form-subtitle">{t.contact.formSubtitle}</p>

              {isPrepared && handoffUrl ? (
                // SUCCESS / HANDOFF STATE
                <div className="handoff-card" role="alert">
                  <div className="handoff-icon-wrapper">
                    <CheckCircle size={36} className="handoff-check-icon" />
                  </div>
                  <h4 className="handoff-title">{t.contact.handoffReadyTitle}</h4>
                  <p className="handoff-desc">{t.contact.handoffReadyDesc}</p>

                  <div className="handoff-actions">
                    <a
                      href={handoffUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-lg handoff-btn"
                    >
                      <MessageCircle size={20} />
                      <span>{t.contact.handoffSendWhatsapp}</span>
                      <ArrowUpRight size={18} />
                    </a>

                    <a
                      href={buildMailtoUrl(
                        `Insurance Enquiry: ${getCategoryLabel(category)} (${fullName})`,
                        `Name: ${fullName}\nPhone: ${phone}\nCategory: ${getCategoryLabel(category)}\nPreferred Method: ${getMethodLabel(preferredMethod)}\nNotes: ${message}`
                      )}
                      className="btn btn-outline handoff-btn-secondary"
                    >
                      <Mail size={16} />
                      <span>{t.contact.handoffSendEmail}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-link handoff-reset-btn"
                    >
                      {t.contact.handoffReset}
                    </button>
                  </div>
                </div>
              ) : (
                // ACTIVE FORM
                <form onSubmit={handleSubmit} noValidate className="lead-form">
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">
                      {t.contact.nameLabel} <span className="required-star">*</span>
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
                      placeholder={t.contact.namePlaceholder}
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
                      {t.contact.phoneLabel} <span className="required-star">*</span>
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
                        placeholder={t.contact.phonePlaceholder}
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
                      {t.contact.formEmailLabel} <span className="optional-tag">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="form-input"
                    />
                  </div>

                  {/* Insurance Category Dropdown (Includes ICICI Lombard Health, SBI Term & Children's) */}
                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      {t.contact.categoryLabel} <span className="required-star">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="form-select"
                    >
                      <optgroup label="Life, Term & Child Protection (SBI Life)">
                        <option value="TermSbi">{t.contact.categories.termSbi}</option>
                        <option value="ChildSbi">{t.contact.categories.childSbi}</option>
                        <option value="LifeSbi">{t.contact.categories.lifeSbi}</option>
                      </optgroup>
                      <optgroup label="Health Insurance (Star Health)">
                        <option value="HealthStar">{t.contact.categories.healthStar}</option>
                      </optgroup>
                      <optgroup label="General & Health Insurance (ICICI Lombard)">
                        <option value="HealthIcici">{t.contact.categories.healthIcici}</option>
                        <option value="MotorIcici">{t.contact.categories.motorIcici}</option>
                        <option value="TravelIcici">{t.contact.categories.travelIcici}</option>
                        <option value="HomeIcici">{t.contact.categories.homeIcici}</option>
                        <option value="Other">{t.contact.categories.otherGeneral}</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="form-group">
                    <span className="form-label">{t.contact.preferredMethodLabel}</span>
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
                          <span>{getMethodLabel(method)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      {t.contact.notesLabel} <span className="optional-tag">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.notesPlaceholder}
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
                        {t.contact.consentTextPre}
                        <button
                          type="button"
                          onClick={() => onOpenPrivacyModal('privacy')}
                          className="link-button"
                        >
                          {t.contact.consentPrivacyLink}
                        </button>
                        {t.contact.consentTextPost} <span className="required-star">*</span>
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
                    <span>{t.contact.submitBtn}</span>
                  </button>

                  <p className="form-privacy-note">{t.contact.privacyNote}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
