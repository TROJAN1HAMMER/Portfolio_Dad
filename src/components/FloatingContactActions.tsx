import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildWhatsAppUrl } from '../config/business';

export const FloatingContactActions: React.FC = () => {
  const { advisor } = BUSINESS_CONFIG;

  const quickMessage = `Hello Balasubramanya sir, I would like to consult with you regarding insurance options.`;

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
          <span>Call Now</span>
        </a>

        <a
          href={buildWhatsAppUrl(quickMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="sticky-action-btn sticky-whatsapp"
          aria-label="Send WhatsApp enquiry"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </aside>

      {/* Desktop Floating WhatsApp Button (Visible on screens >= 768px) */}
      <div className="desktop-floating-actions" aria-hidden="true">
        <a
          href={buildWhatsAppUrl(quickMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-wa-btn"
          title="Chat directly on WhatsApp"
        >
          <MessageCircle size={26} />
          <span className="floating-tooltip">Chat with Advisor</span>
        </a>
      </div>
    </>
  );
};
