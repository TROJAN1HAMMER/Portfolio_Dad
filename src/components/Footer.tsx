import React from 'react';
import { Phone, Mail, Shield } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl } from '../config/business';
import { useTranslation } from '../i18n/I18nContext';

interface FooterProps {
  onOpenPrivacyModal: (tab: 'privacy' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const { advisor, associatedOrganizations } = BUSINESS_CONFIG;
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

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
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand-badge">
              <span className="brand-initials">{advisor.initials}</span>
              <Shield size={14} />
            </div>
            <h3 className="footer-brand-name">{t.header.advisorName}</h3>
            <p className="footer-brand-title">{t.header.advisorRole}</p>
            <p className="footer-brand-desc">{t.footer.brandDesc}</p>
            <div className="footer-contact-links">
              <a href={buildTelUrl()} className="footer-contact-item">
                <Phone size={15} />
                <span>{advisor.phoneFormatted}</span>
              </a>
              <a href={buildMailtoUrl()} className="footer-contact-item">
                <Mail size={15} />
                <span>{advisor.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">{t.footer.quickLinks}</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>{t.header.navHome}</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>{t.header.navAbout}</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>{t.header.navServices}</a>
              </li>
              <li>
                <a href="#why-me" onClick={(e) => handleNavClick(e, '#why-me')}>{t.header.navWhyMe}</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>{t.header.navFaq}</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>{t.header.navContact}</a>
              </li>
            </ul>
          </div>

          {/* Associated Organizations */}
          <div className="footer-orgs-col">
            <h4 className="footer-heading">{t.footer.associatedInsurers}</h4>
            <ul className="footer-orgs-list">
              {associatedOrganizations.map((org) => (
                <li key={org.name} className="footer-org-item">
                  <span className="org-bullet"></span>
                  <div>
                    <strong>{org.name}</strong>
                    <span className="org-category-desc">{getOrgCategory(org.shortName)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Quick Actions */}
          <div className="footer-legal-col">
            <h4 className="footer-heading">{t.footer.complianceHeading}</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPrivacyModal('privacy')}
                  className="footer-link-button"
                >
                  {t.footer.privacyNotice}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPrivacyModal('disclaimer')}
                  className="footer-link-button"
                >
                  {t.footer.legalDisclaimer}
                </button>
              </li>
            </ul>
            <div className="footer-badge-callout">
              <span>{t.footer.verifiedContact}</span>
              <strong>+91 {advisor.phoneRaw}</strong>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Text Box */}
        <div className="footer-disclaimer-box">
          <p className="disclaimer-title">{t.footer.disclaimerTitle}</p>
          <p className="disclaimer-text">{t.footer.disclaimerText}</p>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} {t.footer.copyright}
          </p>
          <p className="crafted-text">
            <span>{t.footer.builtWith}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
