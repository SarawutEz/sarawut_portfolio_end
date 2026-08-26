import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import { contactInfo, personalData } from '../../data/portfolioData';
import { Github, Instagram, Facebook } from '../common/BrandIcons';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check
} from 'lucide-react';
import '../../styles/contact.css';

export default function ContactSection({ onShowToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    if (onShowToast) {
      onShowToast(`คัดลอกอีเมล ${contactInfo.email} เรียบร้อยแล้ว!`, "success");
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionTitle
          tag="Contact Me"
          icon={Mail}
          title={<>ติดต่อพูดคุย <span className="gradient-text">หรือร่วมงานกัน</span></>}
          subtitle="ติดต่อสอบถามเสนองาน หรือแลกเปลี่ยนเรื่องเทคโนโลยีได้ตามช่องทางด้านล่างครับ"
        />

        <div className="contact-container reveal-on-scroll">
          {/* Direct Contact Info Card */}
          <div className="glass-card contact-info-card">
            <div>
              <h3 className="contact-card-title">{contactInfo.heading}</h3>
              <p className="contact-card-desc">{contactInfo.subheading}</p>
            </div>

            <div className="contact-items-list">
              {/* Email */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div className="contact-text-content">
                  <div className="contact-text-label">Email Address</div>
                  <div className="contact-email-row">
                    <a href={`mailto:${contactInfo.email}`} className="contact-text-val" style={{ textDecoration: 'none' }}>
                      {contactInfo.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="copy-btn-sm"
                      title="Copy Email"
                      aria-label="Copy Email"
                      type="button"
                    >
                      {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={22} />
                </div>
                <div className="contact-text-content">
                  <div className="contact-text-label">Phone Number</div>
                  <a href={`tel:${contactInfo.phone}`} className="contact-text-val" style={{ textDecoration: 'none' }}>
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <div className="contact-text-content">
                  <div className="contact-text-label">Location / Work Preference</div>
                  <div className="contact-text-val">{contactInfo.location}</div>
                </div>
              </div>
            </div>

            {/* Social Connects */}
            <div className="contact-social-footer">
              <div className="contact-social-label">
                Social Channels & Repositories
              </div>
              <div className="contact-social-icons">
                <a 
                  href={personalData.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href={personalData.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a 
                  href={personalData.facebook} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="social-icon-btn" 
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="social-icon-btn" 
                  title="Email"
                  aria-label="Send Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
