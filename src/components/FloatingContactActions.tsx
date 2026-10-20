import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl } from '../config/business';
import { useTranslation } from '../i18n/I18nContext';

export const FloatingContactActions: React.FC = () => {
  const { advisor } = BUSINESS_CONFIG;
  const { t, buildLocalizedWhatsAppUrl } = useTranslation();

  return (
    <>
      {/* Mobile Sticky Bottom Bar (Visible only on mobile screens < 768px) */}
      <aside className="mobile-sticky-bottom-bar" aria-label="Quick contact actions">
        <a
          href={buildTelUrl()}
          className="sticky-action-btn sticky-call"
          aria-label={`Call Balasubramanya MG at ${advisor.phoneFormatted}`}
        >
          <Phone size={18} />
          <span>{t.floating.callNow}</span>
        </a>

        <a
          href={buildLocalizedWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-action-btn sticky-whatsapp"
          aria-label="Send WhatsApp enquiry"
        >
          <MessageCircle size={18} />
          <span>{t.floating.whatsapp}</span>
        </a>
      </aside>

      {/* Desktop Floating WhatsApp Button (Visible on screens >= 768px) */}
      <div className="desktop-floating-actions" aria-hidden="true">
        <a
          href={buildLocalizedWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-btn"
          title={t.floating.desktopTooltip}
        >
          <MessageCircle size={26} />
          <span className="floating-tooltip">{t.floating.desktopTooltip}</span>
        </a>
      </div>
    </>
  );
};
