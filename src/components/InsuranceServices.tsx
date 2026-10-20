import React from 'react';
import { HeartPulse, Shield, Car, Check, ArrowRight, MessageCircle, Sparkles, Baby, FileCheck } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

interface InsuranceServicesProps {
  onSelectCategory: (category: string) => void;
}

export const InsuranceServices: React.FC<InsuranceServicesProps> = ({ onSelectCategory }) => {
  const { t, buildLocalizedWhatsAppUrl } = useTranslation();

  const handleCardCta = (defaultCategory: string) => {
    onSelectCategory(defaultCategory);

    // Smoothly scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="services" className="section section-alt services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag green">{t.services.tag}</span>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div className="services-grid">
          {/* Card 1: Star Health Insurance */}
          <div className="service-card service-card-health">
            <div className="service-card-top">
              <div className="service-icon-box">
                <HeartPulse className="service-header-icon health" size={28} />
              </div>
              <div className="service-org-badge">
                <span>{t.services.starHealth.org}</span>
              </div>
            </div>

            <div className="service-card-body">
              <h3 className="service-card-title">{t.services.starHealth.title}</h3>
              <p className="service-card-tagline">{t.services.starHealth.tagline}</p>
              <p className="service-card-desc">{t.services.starHealth.desc}</p>

              <div className="service-features-list">
                <span className="features-header">{t.services.whatWeHelpExplore}</span>
                <ul>
                  {t.services.starHealth.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-card-actions">
              <button
                type="button"
                onClick={() => handleCardCta('Health')}
                className="btn btn-primary service-cta-btn"
                aria-label={`${t.services.starHealth.cta} - Select category`}
              >
                <span>{t.services.starHealth.cta}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={buildLocalizedWhatsAppUrl(t.services.starHealth.title, t.services.starHealth.org)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm service-whatsapp-link"
                title={`Send WhatsApp enquiry about ${t.services.starHealth.title}`}
              >
                <MessageCircle size={15} />
                <span>{t.services.whatsappEnquiryBtn}</span>
              </a>
            </div>
          </div>

          {/* Card 2: SBI Life Insurance (with Term Insurance & Children's Plans explicitly highlighted) */}
          <div className="service-card service-card-life">
            <div className="service-card-top">
              <div className="service-icon-box">
                <Shield className="service-header-icon life" size={28} />
              </div>
              <div className="service-org-badge">
                <span>{t.services.sbiLife.org}</span>
              </div>
            </div>

            <div className="service-card-body">
              <div className="service-card-highlight-badges">
                <span className="highlight-pill term">
                  <FileCheck size={13} />
                  {t.services.sbiLife.badgeTerm}
                </span>
                <span className="highlight-pill child">
                  <Baby size={13} />
                  {t.services.sbiLife.badgeChild}
                </span>
              </div>

              <h3 className="service-card-title">{t.services.sbiLife.title}</h3>
              <p className="service-card-tagline">{t.services.sbiLife.tagline}</p>
              <p className="service-card-desc">{t.services.sbiLife.desc}</p>

              <div className="service-features-list">
                <span className="features-header">{t.services.whatWeHelpExplore}</span>
                <ul>
                  {t.services.sbiLife.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-card-actions">
              <button
                type="button"
                onClick={() => handleCardCta('Term')}
                className="btn btn-primary service-cta-btn"
                aria-label={`${t.services.sbiLife.cta} - Select category`}
              >
                <span>{t.services.sbiLife.cta}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={buildLocalizedWhatsAppUrl(t.services.sbiLife.title, t.services.sbiLife.org)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm service-whatsapp-link"
                title={`Send WhatsApp enquiry about ${t.services.sbiLife.title}`}
              >
                <MessageCircle size={15} />
                <span>{t.services.whatsappEnquiryBtn}</span>
              </a>
            </div>
          </div>

          {/* Card 3: ICICI Lombard General Insurance (with Health Insurance explicitly included) */}
          <div className="service-card service-card-general">
            <div className="service-card-top">
              <div className="service-icon-box">
                <Car className="service-header-icon general" size={28} />
              </div>
              <div className="service-org-badge">
                <span>{t.services.iciciLombard.org}</span>
              </div>
            </div>

            <div className="service-card-body">
              <div className="service-card-highlight-badges">
                <span className="highlight-pill health-addon">
                  <HeartPulse size={13} />
                  {t.services.iciciLombard.badgeHealth}
                </span>
                <span className="highlight-pill general-addon">
                  <Sparkles size={13} />
                  Motor &amp; Travel
                </span>
              </div>

              <h3 className="service-card-title">{t.services.iciciLombard.title}</h3>
              <p className="service-card-tagline">{t.services.iciciLombard.tagline}</p>
              <p className="service-card-desc">{t.services.iciciLombard.desc}</p>

              <div className="service-features-list">
                <span className="features-header">{t.services.whatWeHelpExplore}</span>
                <ul>
                  {t.services.iciciLombard.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <Check size={16} className="feature-check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="service-card-actions">
              <button
                type="button"
                onClick={() => handleCardCta('Motor')}
                className="btn btn-primary service-cta-btn"
                aria-label={`${t.services.iciciLombard.cta} - Select category`}
              >
                <span>{t.services.iciciLombard.cta}</span>
                <ArrowRight size={16} />
              </button>

              <a
                href={buildLocalizedWhatsAppUrl(t.services.iciciLombard.title, t.services.iciciLombard.org)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm service-whatsapp-link"
                title={`Send WhatsApp enquiry about ${t.services.iciciLombard.title}`}
              >
                <MessageCircle size={15} />
                <span>{t.services.whatsappEnquiryBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informative Note */}
        <div className="services-info-callout">
          <p>{t.services.disclaimerCallout}</p>
        </div>
      </div>
    </section>
  );
};
