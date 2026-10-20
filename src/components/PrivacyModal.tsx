import React, { useEffect } from 'react';
import { X, ShieldAlert, Lock, Info } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

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
  const { t } = useTranslation();

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
              <span>{t.privacyModal.privacyTab}</span>
            </button>
            <button
              type="button"
              className={`modal-tab ${activeTab === 'disclaimer' ? 'active' : ''}`}
              onClick={() => setActiveTab('disclaimer')}
            >
              <Info size={16} />
              <span>{t.privacyModal.disclaimerTab}</span>
            </button>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label={t.privacyModal.closeBtn}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'privacy' ? (
            <div className="modal-tab-content">
              <h3 id="modal-title" className="modal-content-title">
                {t.privacyModal.privacyTitle}
              </h3>
              <p>{t.privacyModal.privacyIntro}</p>

              <h4>{t.privacyModal.h1Title}</h4>
              <ul>
                {t.privacyModal.h1List.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4>{t.privacyModal.h2Title}</h4>
              <p>{t.privacyModal.h2Desc}</p>

              <h4>{t.privacyModal.h3Title}</h4>
              <p>{t.privacyModal.h3Desc}</p>
            </div>
          ) : (
            <div className="modal-tab-content">
              <h3 id="modal-title" className="modal-content-title">
                {t.privacyModal.disclaimerTitle}
              </h3>
              <div className="disclaimer-alert-box">
                <ShieldAlert size={22} className="alert-icon" />
                <p>
                  <strong>{t.privacyModal.alertTitle}</strong>
                </p>
              </div>

              <p>{t.footer.disclaimerText}</p>

              <h4>{t.privacyModal.independentTitle}</h4>
              <p>{t.privacyModal.independentDesc1}</p>
              <p>{t.privacyModal.independentDesc2}</p>

              <h4>{t.privacyModal.guaranteeTitle}</h4>
              <p>{t.privacyModal.guaranteeDesc}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-primary btn-sm">
            {t.privacyModal.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
