import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Code2, 
  Home, 
  User, 
  FolderGit2, 
  CalendarCheck2, 
  Image as ImageIcon, 
  FileText, 
  Mail,
  ChevronRight
} from 'lucide-react';
import '../../styles/navbar.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About Me', icon: User },
  { id: 'portfolio', label: 'Portfolio', icon: FolderGit2 },
  { id: 'activities', label: 'Activities', icon: CalendarCheck2 },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'resume', label: 'Resume / CV', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navbar({ activeSection }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
          <div className="logo-badge">
            <Code2 size={22} />
          </div>
          <span className="logo-text">
            Sarawut<span className="logo-dot">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions: Theme Toggle & Mobile Toggle */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={20} color={isActive ? 'var(--accent-cyan)' : 'inherit'} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={18} opacity={0.6} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
