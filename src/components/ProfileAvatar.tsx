import React from 'react';
import { Shield, Award } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import heroPhoto from '../assets/hero.png';

interface ProfileAvatarProps {
  size?: 'hero' | 'about' | 'compact';
  className?: string;
}

/**
 * ============================================================================
 * PROFILE IMAGE COMPONENT
 * ============================================================================
 * 
 * INSTRUCTIONS FOR USER / LATER STEP:
 * When you provide your dad's actual profile photograph:
 * 1. Place the image file in the `public/assets/` directory (e.g. `public/assets/dad-photo.jpg`).
 * 2. In `src/config/business.ts`, update `profilePicture`:
 *    - set `usePhoto: true`
 *    - set `photoPath: '/assets/dad-photo.jpg'`
 *    - adjust `objectPosition` if needed (e.g., 'center 20%').
 * 
 * The component will immediately render the real photograph with optimal
 * responsive sizing, rounded corners, and proper aspect ratio without
 * changing any layout or breaking any surrounding elements.
 * ============================================================================
 */
export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ size = 'hero', className = '' }) => {
  const { advisor } = BUSINESS_CONFIG;
  const { usePhoto, photoPath, altText, objectPosition } = advisor.profilePicture;

  const isHero = size === 'hero';

  return (
    <div className={`profile-avatar-wrapper ${size} ${className}`}>
      <div className="profile-avatar-frame">
        {usePhoto ? (
          // REAL PHOTOGRAPH DISPLAY (activated)
          <img
            src={heroPhoto || photoPath}
            alt={altText}
            className="profile-real-image"
            style={{ objectPosition: objectPosition || 'center 18%' }}
            loading={isHero ? 'eager' : 'lazy'}
          />
        ) : (
          // ELEGANT INITIALS PLACEHOLDER (Default until photo is supplied)
          <div className="profile-placeholder-avatar" aria-label="Advisor Initials Avatar">
            <div className="placeholder-glow"></div>
            <div className="placeholder-shield-bg">
              <Shield className="placeholder-shield-icon" strokeWidth={1.2} />
            </div>
            <div className="placeholder-content">
              <span className="placeholder-initials">{advisor.initials}</span>
              <span className="placeholder-name">{advisor.fullName}</span>
              <span className="placeholder-role">{advisor.title}</span>
            </div>
          </div>
        )}

        {/* Verified Advisor Badge overlay */}
        <div className="profile-verified-badge" title="Verified Professional Advisor">
          <Award className="badge-icon" size={16} />
          <span>Professional Advisor</span>
        </div>
      </div>
    </div>
  );
};
