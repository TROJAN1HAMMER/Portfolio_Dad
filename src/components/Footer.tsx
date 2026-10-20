import { Phone, Mail, Shield } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl } from '../config/business';

interface FooterProps {
  onOpenPrivacyModal: (tab: 'privacy' | 'disclaimer') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyModal }) => {
  const { advisor, associatedOrganizations, disclaimer } = BUSINESS_CONFIG;
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
            <h3 className="footer-brand-name">{advisor.fullName}</h3>
            <p className="footer-brand-title">{advisor.title}</p>
            <p className="footer-brand-desc">
              Providing personalized, objective insurance guidance for individuals and families across India.
            </p>
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
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About Advisor</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Insurance Services</a>
              </li>
              <li>
                <a href="#why-me" onClick={(e) => handleNavClick(e, '#why-me')}>Why Choose Me</a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact &amp; Enquiries</a>
              </li>
            </ul>
          </div>

          {/* Associated Organizations */}
          <div className="footer-orgs-col">
            <h4 className="footer-heading">Associated Insurers</h4>
            <ul className="footer-orgs-list">
              {associatedOrganizations.map((org) => (
                <li key={org.name} className="footer-org-item">
                  <span className="org-bullet"></span>
                  <div>
                    <strong>{org.name}</strong>
                    <span className="org-category-desc">{org.category}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Quick Actions */}
          <div className="footer-legal-col">
            <h4 className="footer-heading">Compliance &amp; Policy</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPrivacyModal('privacy')}
                  className="footer-link-button"
                >
                  Privacy Notice
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPrivacyModal('disclaimer')}
                  className="footer-link-button"
                >
                  Legal Disclaimer
                </button>
              </li>
            </ul>
            <div className="footer-badge-callout">
              <span>Verified Contact:</span>
              <strong>+91 {advisor.phoneRaw}</strong>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Text Box */}
        <div className="footer-disclaimer-box">
          <p className="disclaimer-title">Regulatory Disclosure &amp; Notice:</p>
          <p className="disclaimer-text">{disclaimer}</p>
        </div>

        {/* Copyright Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} {advisor.fullName} — Insurance Advisor. All rights reserved.
          </p>
          <p className="crafted-text">
            <span>Built with integrity for personal insurance guidance</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
