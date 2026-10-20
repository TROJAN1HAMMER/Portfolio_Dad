import React from 'react';
import { UserCheck, FileText, Layers, Headphones, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

export const WhyChooseMe: React.FC = () => {
  const { t } = useTranslation();

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <UserCheck size={28} className="why-icon" />;
      case 1:
        return <FileText size={28} className="why-icon" />;
      case 2:
        return <Layers size={28} className="why-icon" />;
      case 3:
      default:
        return <Headphones size={28} className="why-icon" />;
    }
  };

  return (
    <section id="why-me" className="section why-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{t.whyMe.tag}</span>
          <h2 className="section-title">{t.whyMe.title}</h2>
          <p className="section-subtitle">{t.whyMe.subtitle}</p>
        </div>

        <div className="why-grid">
          {t.whyMe.cards.map((item, index) => (
            <div key={index} className="why-card">
              <div className="why-icon-wrapper">
                {getIcon(index)}
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.desc}</p>
              <div className="why-card-footer">
                <CheckCircle2 size={16} className="why-check" />
                <span>{t.whyMe.clientFirst}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="why-commitment-banner">
          <div className="commitment-content">
            <h4>{t.whyMe.bannerTitle}</h4>
            <p>{t.whyMe.bannerDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
