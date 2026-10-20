import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Shield } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { advisor } = BUSINESS_CONFIG;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Me', href: '#why-me' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
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
      <div className="container header-container">
        {/* Brand Logo & Advisor Info */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="brand-logo" aria-label="Go to home">
          <div className="brand-badge">
            <span className="brand-initials">{advisor.initials}</span>
            <Shield className="brand-shield" size={14} />
          </div>
          <div className="brand-text">
            <span className="brand-name">{advisor.fullName}</span>
            <span className="brand-descriptor">{advisor.title}</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
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

        {/* Action Header Button */}
        <div className="header-actions">
          <a
            href={buildTelUrl()}
            className="btn btn-primary btn-sm header-call-btn"
            aria-label={`Call ${advisor.fullName} at ${advisor.phoneFormatted}`}
          >
            <Phone size={15} />
            <span>Call Now</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-drawer-content">
            <div className="mobile-drawer-header">
              <div className="brand-badge small">
                <span>{advisor.initials}</span>
              </div>
              <div className="brand-text">
                <span className="brand-name">{advisor.fullName}</span>
                <span className="brand-descriptor">{advisor.title}</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navLinks.map((link) => (
                  <li key={link.name}>
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
                <span>Call {advisor.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
