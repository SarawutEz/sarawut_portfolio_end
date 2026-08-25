import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { personalData } from '../../data/portfolioData';
import '../../styles/footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="footer-logo">
              <div className="logo-badge" style={{ width: '34px', height: '34px' }}>
                <Code2 size={18} />
              </div>
              <span>{personalData.englishName}.dev</span>
            </a>
            <p className="footer-tagline">
              {personalData.title} • Crafting clean, scalable, and responsive software.
            </p>
          </div>

          <button onClick={scrollToTop} className="footer-back-to-top" aria-label="Back to Top">
            <span>กลับสู่ด้านบน (Back to Top)</span>
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {personalData.englishName}. All rights reserved. Built with React & Vite.
          </div>

          <div className="footer-quick-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="footer-link">Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="footer-link">About</a>
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick('portfolio'); }} className="footer-link">Portfolio</a>
            <a href="#activities" onClick={(e) => { e.preventDefault(); handleNavClick('activities'); }} className="footer-link">Activities</a>
            <a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }} className="footer-link">Gallery</a>
            <a href="#resume" onClick={(e) => { e.preventDefault(); handleNavClick('resume'); }} className="footer-link">Resume</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
