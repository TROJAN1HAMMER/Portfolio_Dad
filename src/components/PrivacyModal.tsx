import React, { useEffect } from 'react';
import { X, ShieldAlert, Lock, Info } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'disclaimer';
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'disclaimer'>(initialTab);
  const { advisor, disclaimer } = BUSINESS_CONFIG;

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-tabs">
            <button
              type="button"
              className={`modal-tab ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <Lock size={16} />
              <span>Privacy Notice</span>
            </button>
            <button
              type="button"
              className={`modal-tab ${activeTab === 'disclaimer' ? 'active' : ''}`}
              onClick={() => setActiveTab('disclaimer')}
            >
              <Info size={16} />
              <span>Legal Disclaimer</span>
            </button>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'privacy' ? (
            <div className="modal-tab-content">
              <h3 id="modal-title" className="modal-content-title">
                Privacy Notice &amp; Information Handling
              </h3>
              <p>
                Your privacy is respected. This website operates as a direct client-to-advisor
                communication interface for <strong>{advisor.fullName}</strong>.
              </p>
              <h4>1. How Enquiry Information is Used</h4>
              <p>
                When you initiate an enquiry through WhatsApp, email, or telephone:
              </p>
              <ul>
                <li>Your name, phone number, and stated insurance interests are used strictly to reply to your enquiry and provide requested guidance.</li>
                <li>Your details are not sold, leased, or transferred to telemarketing agencies or third parties.</li>
                <li>No database storage or personal profile tracking is performed on this website.</li>
              </ul>
              <h4>2. Direct Communication Channels</h4>
              <p>
                The contact form prepares your enquiry message and hands it off directly to
                WhatsApp or your default email client. Information is transmitted through those
                respective platforms governed by their own end-to-end security and privacy standards.
              </p>
              <h4>3. Contact for Privacy Questions</h4>
              <p>
                If you have questions regarding how your details are handled, you may reach out directly
                to {advisor.fullName} at <a href={`mailto:${advisor.email}`}>{advisor.email}</a> or{' '}
                <a href={`tel:+91${advisor.phoneRaw}`}>{advisor.phoneFormatted}</a>.
              </p>
            </div>
          ) : (
            <div className="modal-tab-content">
              <h3 id="modal-title" className="modal-content-title">
                Regulatory &amp; Advisory Disclaimer
              </h3>
              <div className="disclaimer-alert-box">
                <ShieldAlert size={22} className="alert-icon" />
                <p>
                  <strong>Important Notice:</strong> Please read this disclaimer before evaluating any insurance product.
                </p>
              </div>
              <p>{disclaimer}</p>
              <h4>Independent Advisory Disclosure</h4>
              <p>
                Balasubramanya MG is an independent insurance advisor assisting individuals and
                families with insurance products associated with Star Health and Allied Insurance,
                SBI Life Insurance, and ICICI Lombard General Insurance.
              </p>
              <p>
                This website is not the official website of any insurer, nor is it operated or
                endorsed as a joint venture with any insurance company. All company names, logos,
                and trademarks belong to their respective corporate owners.
              </p>
              <h4>No Guarantee of Claim or Coverage</h4>
              <p>
                Information provided on this website does not constitute a legal contract, guarantee
                of policy issuance, or guarantee of claim settlement. Policy issuance and claim approvals
                are exclusively at the discretion of the underwriting insurer.
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
