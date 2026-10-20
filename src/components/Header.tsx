import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Menu, X, Shield } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';
import { useTranslation } from '../i18n/I18nContext';
import { LanguageSelector } from './LanguageSelector';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { advisor } = BUSINESS_CONFIG;
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: t.header.navHome, href: '#home' },
    { name: t.header.navAbout, href: '#about' },
    { name: t.header.navServices, href: '#services' },
    { name: t.header.navWhyMe, href: '#why-me' },
    { name: t.header.navFaq, href: '#faq' },
    { name: t.header.navContact, href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo & Advisor Info */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="brand-logo" aria-label="Go to home">
          <div className="brand-badge">
            <span className="brand-initials">{advisor.initials}</span>
            <Shield className="brand-shield" size={14} />
          </div>
          <div className="brand-text">
            <span className="brand-name">{t.header.advisorName}</span>
            <span className="brand-descriptor">{t.header.advisorRole}</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="nav-link"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Header Button & Language Selector */}
        <div className="header-actions">
          {/* Header Language Selector */}
          <LanguageSelector />

          <a
            href={buildTelUrl()}
            className="btn btn-primary btn-sm header-call-btn"
            aria-label={`Call ${advisor.fullName} at ${advisor.phoneFormatted}`}
          >
            <Phone size={15} />
            <span>{t.header.callNow}</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.header.menuClose : t.header.menuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Portaled to document.body */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <div className="brand-badge small">
                <span>{advisor.initials}</span>
              </div>
              <div className="brand-text">
                <span className="brand-name">{t.header.advisorName}</span>
                <span className="brand-descriptor">{t.header.advisorRole}</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.header.menuClose}
              >
                <X size={22} />
              </button>
            </div>

            {/* Language Selector inside Mobile Drawer */}
            <LanguageSelector isMobileDrawer />

            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="mobile-nav-link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href={buildTelUrl()}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <Phone size={18} />
                <span>{t.header.callNow} — {advisor.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};
