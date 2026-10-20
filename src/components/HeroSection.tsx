import React from 'react';
import { Phone, MessageCircle, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl } from '../config/business';
import { ProfileAvatar } from './ProfileAvatar';

export const HeroSection: React.FC = () => {
  const { advisor, associatedOrganizations } = BUSINESS_CONFIG;

  const heroWhatsAppText = `Hello Balasubramanya sir, I would like to explore insurance options for my family.`;

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Core Messaging & Calls to Action */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-badge">
              <Sparkles size={14} className="eyebrow-icon" />
              YOUR TRUSTED INSURANCE ADVISOR
            </span>
          </div>

          <h1 className="hero-title">
            Secure Today. <span className="highlight-text">Protect Tomorrow.</span>
          </h1>

          <h2 className="hero-subtitle">
            Insurance Solutions for You and Your Family
          </h2>

          <p className="hero-description">
            Choosing insurance doesn't have to be complicated. Get personal guidance to
            explore health, life and general insurance options based on your needs,
            priorities and budget.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-cta-group">
            <a
              href={buildTelUrl()}
              className="btn btn-primary btn-lg hero-cta-call"
              aria-label={`Call Balasubramanya MG at ${advisor.phoneRaw}`}
            >
              <Phone size={19} />
              <span>Call Now — {advisor.phoneRaw}</span>
            </a>

            <a
              href={buildWhatsAppUrl(heroWhatsAppText)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg hero-cta-whatsapp"
              aria-label="Chat with Balasubramanya MG on WhatsApp"
            >
              <MessageCircle size={19} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Trust-oriented statement */}
          <div className="hero-trust-bar">
            <ShieldCheck size={20} className="trust-icon" />
            <p className="trust-text">
              <strong>Personal guidance.</strong> Clear explanations. Support when you need it.
            </p>
          </div>

          {/* Associated Organizations Quick Badges */}
          <div className="hero-partners">
            <span className="partners-label">Assisting with products from:</span>
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
            {/* Dedicated Profile Avatar with placeholder and future photo integration */}
            <ProfileAvatar size="hero" />

            {/* Small floating insurance coverage card */}
            <div className="hero-floating-card">
              <div className="floating-card-icon">
                <HeartPulse size={20} />
              </div>
              <div className="floating-card-text">
                <span className="floating-card-title">Comprehensive Coverage</span>
                <span className="floating-card-subtitle">Health | Life | General Insurance</span>
              </div>
            </div>

            {/* Advisory Service Region Tag */}
            <div className="hero-region-badge">
              <span className="region-dot"></span>
              <span>Advising Across India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
