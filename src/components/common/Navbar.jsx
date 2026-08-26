import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { personalData } from '../../data/portfolioData';
import { 
  Sun, 
  Moon, 
  Code2, 
  Sparkles,
  ArrowUpRight,
  Send
} from 'lucide-react';
import { Github, Instagram, Facebook } from './BrandIcons';
import '../../styles/navbar.css';

const navItems = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT ME' },
  { id: 'portfolio', label: 'PORTFOLIO' },
  { id: 'activities', label: 'ACTIVITIES' },
  { id: 'gallery', label: 'GALLERY' },
  { id: 'resume', label: 'RESUME / CV' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock & Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Mobile menu items excluding contact (since Contact is the prominent bottom capsule action)
  const mobileNavItems = navItems.filter(item => item.id !== 'contact');

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-active' : ''}`}>
        <div className="container navbar-container">
          {/* Brand Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
            <div className="logo-badge">
              <Code2 size={20} />
            </div>
            <span className="logo-text">
              Sarawut<span className="logo-dot">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation">
            <ul className="nav-menu">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions: Theme Toggle & Mobile Hamburger */}
          <div className="nav-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Animated Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line line-1"></span>
              <span className="hamburger-line line-2"></span>
              <span className="hamburger-line line-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Minimalist / Streetwear Mobile Overlay Menu */}
      <div 
        className={`fullscreen-mobile-menu ${mobileMenuOpen ? 'open' : ''}`} 
        role="dialog" 
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="fs-menu-inner">
          {/* Top Brand Emblem / Logo with Star Accent */}
          <div className="fs-menu-top">
            <div className="fs-brand-box">
              <div className="fs-brand-star">
                <Sparkles size={16} />
              </div>
              <div className="fs-brand-title">SARAWUT</div>
              <div className="fs-brand-sub">PORTFOLIO & CREATIVE LAB</div>
            </div>
          </div>

          {/* Centered Minimalist Navigation Items */}
          <nav className="fs-nav-container">
            <ul className="fs-nav-list">
              {mobileNavItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <li 
                    key={item.id} 
                    className="fs-nav-item"
                    style={{ transitionDelay: mobileMenuOpen ? `${0.04 * (index + 1)}s` : '0s' }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`fs-nav-link ${isActive ? 'active' : ''}`}
                    >
                      {isActive && <span className="fs-active-dot">✦</span>}
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Capsule CTA Button */}
          <div className="fs-menu-bottom">
            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`fs-capsule-btn ${activeSection === 'contact' ? 'active' : ''}`}
            >
              <span>CONTACT ME</span>
              <Send size={14} />
            </a>

            {/* Social Channels Minimal Icons */}
            <div className="fs-social-row">
              <a href={personalData.github} target="_blank" rel="noreferrer" className="fs-social-link" title="GitHub" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href={personalData.instagram} target="_blank" rel="noreferrer" className="fs-social-link" title="Instagram" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={personalData.facebook} target="_blank" rel="noreferrer" className="fs-social-link" title="Facebook" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={personalData.resumeUrl} target="_blank" rel="noopener noreferrer" className="fs-social-link" title="Resume" aria-label="Resume">
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
