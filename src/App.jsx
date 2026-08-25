import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [toastInfo, setToastInfo] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToastInfo({ message, type });
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <ResumeSection onShowToast={showToast} />
        <ContactSection onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />

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
