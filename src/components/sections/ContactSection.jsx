import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import { contactInfo, personalData } from '../../data/portfolioData';
import { Github, Instagram, Facebook } from '../common/BrandIcons';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';
import '../../styles/contact.css';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    if (onShowToast) {
      onShowToast(`คัดลอกอีเมล ${contactInfo.email} เรียบร้อยแล้ว!`, "success");
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (onShowToast) onShowToast("กรุณากรอกข้อมูลให้ครบทุกช่องที่จำเป็นครับ", "error");
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      if (onShowToast) {
        onShowToast("ส่งข้อความสำเร็จ! ขอบคุณสำหรับการติดต่อ จะรีบตอบกลับโดยเร็วที่สุดครับ", "success");
      }
    }, 1000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionTitle
          tag="Contact Me"
          icon={Mail}
          title={<>ติดต่อพูดคุย <span className="gradient-text">หรือร่วมงานกัน</span></>}
          subtitle="ส่งข้อความสอบถามเสนองาน หรือแลกเปลี่ยนเรื่องเทคโนโลยีได้ตลอดเวลาครับ"
        />

        <div className="contact-grid">
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
                <div>
                  <div className="contact-text-label">Email Address</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <a href={`mailto:${contactInfo.email}`} className="contact-text-val" style={{ textDecoration: 'none' }}>
                      {contactInfo.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="copy-btn-sm"
                      title="Copy Email"
                      aria-label="Copy Email"
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
                <div>
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
                <div>
                  <div className="contact-text-label">Location / Work Preference</div>
                  <div className="contact-text-val">{contactInfo.location}</div>
                </div>
              </div>
            </div>

            {/* Social Connects */}
            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '14px', color: 'var(--text-primary)' }}>
                Social Channels & Repositories
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href={personalData.github} target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub">
                  <Github size={20} />
                </a>
                <a href={personalData.instagram} target="_blank" rel="noreferrer" className="social-icon-btn" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href={personalData.facebook} target="_blank" rel="noreferrer" className="social-icon-btn" title="Facebook">
                  <Facebook size={20} />
                </a>
                <a href={`mailto:${contactInfo.email}`} className="social-icon-btn" title="Email">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="glass-card contact-form-card">
            <h3 className="contact-card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageSquare size={20} color="var(--accent-cyan)" />
              <span>ส่งข้อความโดยตรง (Send a Message)</span>
            </h3>

            <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '20px' }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">ชื่อของคุณ (Your Name) *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="เช่น สมชาย ใจดี"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">อีเมลของคุณ (Your Email) *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@mail.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">หัวข้อเรื่อง (Subject)</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="เช่น สนใจเสนองาน Full-Stack Developer หรือ ติดต่องานโปรเจกต์"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">ข้อความรายละเอียด (Message) *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="เขียนรายละเอียดสิ่งที่คุณต้องการพูดคุยที่นี่..."
                  className="form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <span>กำลังส่งข้อความ...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>ส่งข้อความ (Send Message)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
