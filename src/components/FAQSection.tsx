import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const FAQSection: React.FC = () => {
  const { faqs } = BUSINESS_CONFIG;
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
            Common Questions
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Clear, honest answers about discussing your insurance requirements and exploring available options.
          </p>
        </div>

        <div className="faq-accordion" role="region" aria-label="Frequently Asked Questions Accordion">
          {faqs.map((faq, index) => {
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
                    <span className="faq-question-text">{faq.question}</span>
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
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small footer note for FAQ */}
        <div className="faq-disclaimer-callout">
          <p>
            Have a question that is not covered above? Feel free to send a quick message directly on WhatsApp or call anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
