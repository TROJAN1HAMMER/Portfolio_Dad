import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

export const FAQSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section section-alt faq-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <HelpCircle size={14} />
            {t.faq.tag}
          </span>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div className="faq-accordion" role="region" aria-label={t.faq.title}>
          {t.faq.items.map((faq, index) => {
            const isOpen = openIndex === index;
            const headingId = `faq-heading-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <h3 className="faq-item-title">
                  <button
                    type="button"
                    id={headingId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleAccordion(index)}
                    className="faq-button"
                  >
                    <span className="faq-question-text">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className={`faq-panel ${isOpen ? 'expanded' : 'collapsed'}`}
                  hidden={!isOpen}
                >
                  <div className="faq-answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small footer note for FAQ */}
        <div className="faq-disclaimer-callout">
          <p>{t.faq.note}</p>
        </div>
      </div>
    </section>
  );
};
