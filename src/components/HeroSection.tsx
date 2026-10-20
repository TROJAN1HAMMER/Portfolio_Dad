import React from 'react';
import { Phone, MessageCircle, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';
import { ProfileAvatar } from './ProfileAvatar';
import { useTranslation } from '../i18n/I18nContext';

export const HeroSection: React.FC = () => {
  const { advisor, associatedOrganizations } = BUSINESS_CONFIG;
  const { t, buildLocalizedWhatsAppUrl } = useTranslation();

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Core Messaging & Calls to Action */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-badge">
              <Sparkles size={14} className="eyebrow-icon" />
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="hero-title">
            {t.hero.titleStart}
            <span className="highlight-text">{t.hero.titleHighlight}</span>
          </h1>

          <h2 className="hero-subtitle">{t.hero.subtitle}</h2>

          <p className="hero-description">{t.hero.description}</p>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <a
              href={buildTelUrl()}
              className="btn btn-primary btn-lg hero-cta-call"
              aria-label={`Call Balasubramanya MG at ${advisor.phoneRaw}`}
            >
              <Phone size={19} />
              <span>{t.hero.callCta}</span>
            </a>

            <a
              href={buildLocalizedWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg hero-cta-whatsapp"
              aria-label="Chat with Balasubramanya MG on WhatsApp"
            >
              <MessageCircle size={19} />
              <span>{t.hero.whatsappCta}</span>
            </a>
          </div>

          {/* Trust-oriented statement */}
          <div className="hero-trust-bar">
            <ShieldCheck size={20} className="trust-icon" />
            <p className="trust-text">
              <strong>{t.hero.trustGuidance}</strong> {t.hero.trustText}
            </p>
          </div>

          {/* Associated Organizations Quick Badges */}
          <div className="hero-partners">
            <span className="partners-label">{t.hero.assistingWith}</span>
            <div className="partners-pills">
              {associatedOrganizations.map((org) => (
                <span key={org.name} className="partner-pill">
                  {org.shortName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dedicated Advisor Portrait Frame */}
        <div className="hero-media">
          <div className="hero-avatar-card">
            {/* Dedicated Profile Avatar with dad's photo */}
            <ProfileAvatar size="hero" />

            {/* Small floating insurance coverage card */}
            <div className="hero-floating-card">
              <div className="floating-card-icon">
                <HeartPulse size={20} />
              </div>
              <div className="floating-card-text">
                <span className="floating-card-title">{t.hero.floatingCoverageTitle}</span>
                <span className="floating-card-subtitle">{t.hero.floatingCoverageSub}</span>
              </div>
            </div>

            {/* Advisory Service Region Tag */}
            <div className="hero-region-badge">
              <span className="region-dot"></span>
              <span>{t.hero.regionBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
