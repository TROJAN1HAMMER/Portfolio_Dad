import React from 'react';
import { HeartPulse, Shield, Car, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG, buildWhatsAppUrl, type InsuranceServiceConfig } from '../config/business';

interface InsuranceServicesProps {
  onSelectCategory: (category: string) => void;
}

export const InsuranceServices: React.FC<InsuranceServicesProps> = ({ onSelectCategory }) => {
  const { services } = BUSINESS_CONFIG;

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'health':
        return <HeartPulse className="service-header-icon health" size={28} />;
      case 'life':
        return <Shield className="service-header-icon life" size={28} />;
      case 'general':
      default:
        return <Car className="service-header-icon general" size={28} />;
    }
  };

  const handleCardCta = (service: InsuranceServiceConfig) => {
    // Notify parent to preselect category in contact form
    onSelectCategory(service.defaultCategory);
    
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
          <span className="section-tag green">Comprehensive Portfolio</span>
          <h2 className="section-title">Insurance Solutions for Every Stage of Life</h2>
          <p className="section-subtitle">
            Explore the available insurance categories and get help understanding which
            options may fit your circumstances.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const whatsAppEnquiry = `Hello Balasubramanya sir, I would like to explore ${service.title} (${service.organization}) for my requirements.`;

            return (
              <div key={service.id} className={`service-card service-card-${service.id}`}>
                <div className="service-card-top">
                  <div className="service-icon-box">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="service-org-badge">
                    <span>{service.organization}</span>
                  </div>
                </div>

                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-tagline">{service.tagline}</p>
                  <p className="service-card-desc">{service.description}</p>

                  <div className="service-features-list">
                    <span className="features-header">What we help you explore:</span>
                    <ul>
                      {service.features.map((feature, idx) => (
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
                    onClick={() => handleCardCta(service)}
                    className="btn btn-primary service-cta-btn"
                    aria-label={`${service.ctaLabel} - Fill enquiry form`}
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight size={16} />
                  </button>

                  <a
                    href={buildWhatsAppUrl(whatsAppEnquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm service-whatsapp-link"
                    title={`Send WhatsApp enquiry about ${service.title}`}
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note */}
        <div className="services-info-callout">
          <p>
            <strong>Transparent Advisory:</strong> All policy benefits, eligibility, premiums,
            and terms are determined by the respective insurer (Star Health, SBI Life, or ICICI Lombard).
            Balasubramanya MG provides independent assistance in understanding and comparing available options.
          </p>
        </div>
      </div>
    </section>
  );
};
