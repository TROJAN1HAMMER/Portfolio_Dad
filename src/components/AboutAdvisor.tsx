import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, ShieldCheck, Check, Languages, Info } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl } from '../config/business';
import { ProfileAvatar } from './ProfileAvatar';
import { useTranslation } from '../i18n/I18nContext';

export const AboutAdvisor: React.FC = () => {
  const { advisor, associatedOrganizations } = BUSINESS_CONFIG;
  const { t, buildLocalizedWhatsAppUrl } = useTranslation();

  const getOrgCategory = (shortName: string) => {
    switch (shortName) {
      case 'Star Health':
        return t.about.starCategory;
      case 'SBI Life':
        return t.about.sbiCategory;
      case 'ICICI Lombard':
      default:
        return t.about.iciciCategory;
    }
  };

  return (
    <section id="about" className="section section-alt about-section">
      <div className="container">
        <div className="about-wrapper">
          {/* Left Column: Visual Profile Card */}
          <div className="about-media-col">
            <div className="about-card">
              <ProfileAvatar size="about" />

              <div className="about-card-info">
                <h3 className="about-card-name">{t.header.advisorName}</h3>
                <p className="about-card-title">{t.header.advisorRole}</p>
                <div className="about-card-region">
                  <MapPin size={15} />
                  <span>{t.about.servingAcross}</span>
                </div>

                <div className="about-card-contacts">
                  <a href={buildTelUrl()} className="about-contact-link">
                    <Phone size={15} />
                    <span>{advisor.phoneFormatted}</span>
                  </a>
                  <a href={buildMailtoUrl()} className="about-contact-link">
                    <Mail size={15} />
                    <span>{advisor.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Advisory Principles */}
          <div className="about-content-col">
            <span className="section-tag">{t.about.tag}</span>
            <h2 className="section-title">{t.about.title}</h2>

            <div className="about-bio-text">
              <p className="about-lead-p">{t.about.leadP}</p>
              <p>{t.about.bioP1}</p>
              <p>{t.about.bioP2}</p>
            </div>

            {/* Organizations Represented */}
            <div className="about-associations">
              <h4 className="associations-title">{t.about.assocTitle}</h4>
              <div className="associations-grid">
                {associatedOrganizations.map((org) => (
                  <div key={org.name} className="association-item">
                    <ShieldCheck size={18} className="assoc-icon" />
                    <div>
                      <strong className="assoc-name">{org.name}</strong>
                      <span className="assoc-cat">{getOrgCategory(org.shortName)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Advisory Commitments */}
            <div className="about-commitments">
              {t.about.commitments.map((com, idx) => (
                <div key={idx} className="commitment-pill">
                  <Check size={16} />
                  <span>{com}</span>
                </div>
              ))}
            </div>

            {/* Direct Connect Buttons */}
            <div className="about-actions">
              <a
                href={buildLocalizedWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={17} />
                <span>{t.about.whatsappCta}</span>
              </a>

              <a href={buildTelUrl()} className="btn btn-outline">
                <Phone size={17} />
                <span>{t.about.directCall}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Dedicated "Languages I Speak" Section */}
        <div className="advisor-languages-banner">
          <div className="advisor-languages-header">
            <div className="languages-icon-badge">
              <Languages size={26} strokeWidth={2.2} />
            </div>
            <div className="languages-header-text">
              <div className="languages-tagline">Multilingual Insurance Advisory</div>
              <h3 className="languages-heading">{t.about.languagesSpoken.heading}</h3>
              <p className="languages-subtext">{t.about.languagesSpoken.supportingText}</p>
            </div>
          </div>

          <div className="languages-cards-grid">
            {t.about.languagesSpoken.languages.map((lang, index) => (
              <div key={index} className="language-spoken-card">
                <div className="lang-card-header">
                  <span className="lang-card-bullet"></span>
                  <span className="lang-fluent-tag">Fluent Advisory</span>
                </div>
                <div className="lang-native-script">{lang.native}</div>
                <div className="lang-english-title">{lang.english}</div>
              </div>
            ))}
          </div>

          <div className="languages-note">
            <Info size={18} className="languages-note-icon" />
            <p>
              {t.about.languagesSpoken.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
