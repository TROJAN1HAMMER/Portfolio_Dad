import React, { useState } from 'react';
import { I18nProvider } from './i18n/I18nContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InsuranceServices } from './components/InsuranceServices';
import { WhyChooseMe } from './components/WhyChooseMe';
import { AboutAdvisor } from './components/AboutAdvisor';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingContactActions } from './components/FloatingContactActions';
import { PrivacyModal } from './components/PrivacyModal';
import './App.css';

export const AppContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Health');
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<'privacy' | 'disclaimer'>('privacy');

  const handleOpenPrivacyModal = (tab: 'privacy' | 'disclaimer') => {
    setPrivacyModalTab(tab);
    setPrivacyModalOpen(true);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="site-wrapper">
      {/* Header & Sticky Navigation */}
      <Header />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* Section A: Hero */}
        <HeroSection />

        {/* Section B: Insurance Services */}
        <InsuranceServices onSelectCategory={handleSelectCategory} />

        {/* Section C: Why Choose Me */}
        <WhyChooseMe />

        {/* Section D: About the Advisor */}
        <AboutAdvisor />

        {/* Section E: How It Works */}
        <HowItWorks />

        {/* Section F: Frequently Asked Questions */}
        <FAQSection />

        {/* Section G: Contact & Lead Generation */}
        <ContactSection
          selectedCategory={selectedCategory}
          onOpenPrivacyModal={handleOpenPrivacyModal}
        />
      </main>

      {/* Footer */}
      <Footer onOpenPrivacyModal={handleOpenPrivacyModal} />

      {/* Quick Action Floating Bar (Mobile sticky & Desktop float) */}
      <FloatingContactActions />

      {/* Privacy Notice & Legal Disclaimer Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        initialTab={privacyModalTab}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
};

export default App;
