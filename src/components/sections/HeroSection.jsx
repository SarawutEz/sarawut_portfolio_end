import React from 'react';
import {
  ArrowRight,
  FileDown,
  Mail,
  Layout,
  Video,
  Palette
} from 'lucide-react';
import { Github, Instagram, Facebook } from '../common/BrandIcons';
import { personalData } from '../../data/portfolioData';
import '../../styles/hero.css';

export default function HeroSection() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>{personalData.statusBadge}</span>
          </div>

          <div className="hero-greeting">
            สวัสดีครับ 👋 ยินดีต้อนรับสู่ Portfolio ของผม
          </div>

          <h1 className="hero-name">
            {personalData.name}
          </h1>

          <div className="hero-title-role">
            <span className="gradient-text">{personalData.title}</span>
          </div>

          <p className="hero-bio">
            {personalData.shortBio}
          </p>

          <div className="hero-actions">
            <button
              onClick={() => handleScrollTo('portfolio')}
              className="btn btn-primary btn-lg"
            >
              <span>ดูผลงาน (View Projects)</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="btn btn-secondary btn-lg"
            >
              <Mail size={18} />
              <span>ติดต่อฉัน (Contact Me)</span>
            </button>

            <button
              onClick={() => handleScrollTo('resume')}
              className="btn btn-outline btn-lg"
            >
              <FileDown size={18} />
              <span>Resume / CV</span>
            </button>
          </div>

          <div className="hero-socials">
            <a
              href={personalData.github}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href={personalData.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="Instagram Profile"
            >
              <Instagram size={20} />
            </a>
            <a
              href={personalData.facebook}
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              title="Facebook Profile"
            >
              <Facebook size={20} />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="social-icon-btn"
              title={`Send Email to ${personalData.email}`}
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Visual / Profile Card */}
        <div className="hero-visual">
          <div className="hero-card-container">
            <div className="hero-avatar-wrapper">
              <img
                src="https://i.postimg.cc/1tQq2566/Sarwut-resume-cv.png"
                alt={personalData.name}
                className="hero-avatar-img"
              />
            </div>

            {/* Floating Tech Badges */}
            <div className="floating-tech-pill pill-1">
              <Palette size={18} color="var(--accent-yellow)" />
              <span>UI/UX & Web Design</span>
            </div>

            <div className="floating-tech-pill pill-2">
              <Video size={18} color="var(--accent-yellow)" />
              <span>Video & Media Editor</span>
            </div>

            <div className="floating-tech-pill pill-3">
              <Layout size={18} color="var(--accent-yellow)" />
              <span>User-Centric Focus</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
