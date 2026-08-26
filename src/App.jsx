import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ActivitiesSection from './components/sections/ActivitiesSection';
import GallerySection from './components/sections/GallerySection';
import ResumeSection from './components/sections/ResumeSection';
import ContactSection from './components/sections/ContactSection';
import { ArrowUp } from 'lucide-react';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastInfo, setToastInfo] = useState({ message: '', type: 'success' });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Initialize scroll-triggered animations
  useScrollReveal();

  const showToast = (message, type = 'success') => {
    setToastInfo({ message, type });
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Update active section
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });

      // Show / hide floating back to top
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-wrapper">
      {/* Background Ambient Glow & Mesh */}
      <div className="ambient-background">
        <div className="mesh-grid"></div>
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      {/* Sticky Glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ActivitiesSection />
        <GallerySection />
        <ResumeSection />
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Button for Mobile & Desktop */}
      <button
        onClick={scrollToTop}
        className={`floating-back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Scroll to top of page"
        type="button"
      >
        <ArrowUp size={20} />
      </button>

      {/* Toast Notification */}
      {toastInfo.message && (
        <Toast 
          message={toastInfo.message} 
          type={toastInfo.type} 
          onClose={() => setToastInfo({ message: '', type: 'success' })} 
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
