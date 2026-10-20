import React from 'react';
import { UserCheck, FileText, Layers, Headphones, CheckCircle2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const WhyChooseMe: React.FC = () => {
  const { whyChooseMe } = BUSINESS_CONFIG;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck size={28} className="why-icon" />;
      case 'HelpCircle':
      case 'FileText':
        return <FileText size={28} className="why-icon" />;
      case 'Layers':
        return <Layers size={28} className="why-icon" />;
      case 'Headphones':
      default:
        return <Headphones size={28} className="why-icon" />;
    }
  };

  return (
    <section id="why-me" className="section why-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Value &amp; Transparency</span>
          <h2 className="section-title">Insurance Guidance You Can Trust</h2>
          <p className="section-subtitle">
            An advisor who takes the time to listen, explain the fine print, and support
            your choices without pressure.
          </p>
        </div>

        <div className="why-grid">
          {whyChooseMe.map((item, index) => (
            <div key={index} className="why-card">
              <div className="why-icon-wrapper">
                {getIcon(item.icon)}
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-desc">{item.description}</p>
              <div className="why-card-footer">
                <CheckCircle2 size={16} className="why-check" />
                <span>Client-First Approach</span>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="why-commitment-banner">
          <div className="commitment-content">
            <h4>No Unrealistic Promises. Just Honest Advice.</h4>
            <p>
              Insurance approvals and claims are subject to official insurer guidelines.
              My role is to ensure you submit accurate information, understand waiting periods,
              and select plans that match your personal financial goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
