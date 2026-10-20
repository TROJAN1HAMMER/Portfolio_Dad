import React from 'react';
import { MessageSquare, Search, FileCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const HowItWorks: React.FC = () => {
  const { howItWorks } = BUSINESS_CONFIG;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <MessageSquare size={24} />;
      case 1:
        return <Search size={24} />;
      case 2:
      default:
        return <FileCheck size={24} />;
    }
  };

  const handleCtaClick = () => {
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
    <section className="section how-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag green">Simple Advisory Process</span>
          <h2 className="section-title">Getting Started Is Simple</h2>
          <p className="section-subtitle">
            A structured, pressure-free way to explore the right insurance protection for you and your family.
          </p>
        </div>

        <div className="how-steps-grid">
          {howItWorks.map((item, idx) => (
            <div key={item.step} className="how-step-card">
              <div className="how-step-header">
                <span className="how-step-number">{item.step}</span>
                <div className="how-step-icon">{getStepIcon(idx)}</div>
              </div>
              <h3 className="how-step-title">{item.title}</h3>
              <p className="how-step-desc">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="how-cta-container">
          <button
            type="button"
            onClick={handleCtaClick}
            className="btn btn-gold btn-lg how-cta-btn"
          >
            <span>Discuss Your Insurance Needs</span>
            <ArrowRight size={18} />
          </button>
          <span className="how-note">
            *Non-binding consultation. All coverage is subject to insurer underwriting and terms.
          </span>
        </div>
      </div>
    </section>
  );
};
