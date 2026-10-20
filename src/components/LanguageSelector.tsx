import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';
import type { LanguageCode } from '../i18n/types';

interface LanguageSelectorProps {
  isMobileDrawer?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobileDrawer = false }) => {
  const { language, setLanguage, supportedLanguages, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const selectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobileDrawer) {
    // In mobile drawer, display a clean segmented grid
    return (
      <div className="mobile-language-section">
        <span className="mobile-lang-title">
          <Globe size={16} />
          <span>{t.header.selectLanguage}</span>
        </span>
        <div className="mobile-lang-grid" role="radiogroup" aria-label={t.header.selectLanguage}>
          {supportedLanguages.map((opt) => (
            <button
              key={opt.code}
              type="button"
              role="radio"
              aria-checked={language === opt.code}
              className={`mobile-lang-btn ${language === opt.code ? 'active' : ''}`}
              onClick={() => selectLanguage(opt.code)}
            >
              <span className="native-text">{opt.nativeName}</span>
              <span className="english-sub">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Header compact dropdown
  return (
    <div className="language-selector-wrapper" ref={containerRef} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="lang-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`${t.header.selectLanguage}: currently ${currentOption.nativeName}`}
        title={t.header.selectLanguage}
      >
        <Globe size={16} className="lang-globe-icon" />
        <span className="lang-current-label">{currentOption.nativeName}</span>
        <ChevronDown size={14} className={`lang-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu" role="listbox" aria-label={t.header.selectLanguage}>
          {supportedLanguages.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`lang-option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => selectLanguage(opt.code)}
              >
                <div className="lang-option-names">
                  <span className="lang-native-name">{opt.nativeName}</span>
                  <span className="lang-english-name">({opt.label})</span>
                </div>
                {isSelected && <Check size={14} className="lang-check-icon" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
