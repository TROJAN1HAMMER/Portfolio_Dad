import React from 'react';
import { Phone, Mail, MessageCircle, MapPin, ShieldCheck, Check } from 'lucide-react';
import { BUSINESS_CONFIG, buildTelUrl, buildMailtoUrl, buildWhatsAppUrl } from '../config/business';
import { ProfileAvatar } from './ProfileAvatar';

export const AboutAdvisor: React.FC = () => {
  const { advisor, associatedOrganizations } = BUSINESS_CONFIG;

  return (
    <section id="about" className="section section-alt about-section">
      <div className="container">
        <div className="about-wrapper">
          {/* Left Column: Visual Profile Card */}
          <div className="about-media-col">
            <div className="about-card">
              <ProfileAvatar size="about" />

              <div className="about-card-info">
                <h3 className="about-card-name">{advisor.fullName}</h3>
                <p className="about-card-title">{advisor.title}</p>
                <div className="about-card-region">
                  <MapPin size={15} />
                  <span>Serving Clients Across {advisor.serviceRegion}</span>
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
            <span className="section-tag">Dedicated Professional</span>
            <h2 className="section-title">Meet {advisor.fullName}</h2>

            <div className="about-bio-text">
              <p className="about-lead-p">
                Insurance is about preparing for life's uncertainties and protecting the
                people and things that matter to you.
              </p>
              <p>
                <strong>Balasubramanya MG</strong> helps individuals and families explore
                insurance options across health, life and general insurance. By working with
                Star Health Insurance, SBI Life Insurance and ICICI Lombard General Insurance, he can
                help customers understand available policies, compare relevant features and
                identify suitable next steps.
              </p>
              <p>
                His approach is simple: <strong>understand your needs</strong>, <strong>explain the
                available options clearly</strong>, and <strong>help you make an informed decision</strong>.
              </p>
            </div>

            {/* Organizations Represented */}
            <div className="about-associations">
              <h4 className="associations-title">Associated Organizations:</h4>
              <div className="associations-grid">
                {associatedOrganizations.map((org) => (
                  <div key={org.name} className="association-item">
                    <ShieldCheck size={18} className="assoc-icon" />
                    <div>
                      <strong className="assoc-name">{org.name}</strong>
                      <span className="assoc-cat">{org.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Advisory Commitments */}
            <div className="about-commitments">
              <div className="commitment-pill">
                <Check size={16} />
                <span>Objective plan comparisons</span>
              </div>
              <div className="commitment-pill">
                <Check size={16} />
                <span>No aggressive sales tactics</span>
              </div>
              <div className="commitment-pill">
                <Check size={16} />
                <span>Prompt WhatsApp &amp; phone response</span>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="about-actions">
              <a
                href={buildWhatsAppUrl(`Hello ${advisor.fullName} sir, I would like to schedule a time to discuss my insurance requirements.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>

              <a href={buildTelUrl()} className="btn btn-outline">
                <Phone size={17} />
                <span>Direct Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
