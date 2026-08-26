import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { resumeData, personalData } from '../../data/portfolioData';
import { 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Award, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import '../../styles/resume.css';

export default function ResumeSection() {
  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <SectionTitle 
          tag="Resume & CV"
          icon={FileText}
          title={<>ประวัติการศึกษา <span className="gradient-text">และประสบการณ์การทำงาน</span></>}
          subtitle="เส้นทางการเรียนรู้ ประสบการณ์ฝึกงาน และใบประกาศนียบัตรรับรองความสามารถ (Certifications)"
        />

        {/* Header View/Open CV Link CTA */}
        <div className="resume-header-actions reveal-on-scroll">
          <a 
            href={personalData.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={18} />
            <span>เปิดดู Resume / CV (คลิกเข้าลิงก์)</span>
          </a>
        </div>

        {/* Education & Experience Timelines */}
        <div className="resume-grid">
          {/* Experience Timeline */}
          <div className="timeline-column reveal-on-scroll">
            <h3 className="column-title">
              <Briefcase size={22} color="var(--accent-yellow)" />
              <span>ประสบการณ์การทำงาน (Experience)</span>
            </h3>

            <div className="timeline-list">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="glass-card timeline-card">
                    <span className="timeline-period">{exp.period}</span>
                    <h4 className="timeline-heading">{exp.role}</h4>
                    <div className="timeline-subheading">{exp.company} • {exp.location}</div>
                    
                    <ul className="timeline-responsibilities">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="timeline-responsibility-item">
                          <CheckCircle2 size={14} color="var(--accent-yellow)" className="resp-check-icon" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div className="timeline-column reveal-on-scroll stagger-2">
            <h3 className="column-title">
              <GraduationCap size={22} color="var(--accent-yellow)" />
              <span>ประวัติการศึกษา (Education)</span>
            </h3>

            <div className="timeline-list">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot" style={{ borderColor: 'var(--accent-yellow)' }}></div>
                  <div className="glass-card timeline-card">
                    <span className="timeline-period" style={{ color: 'var(--accent-yellow)' }}>{edu.period}</span>
                    <h4 className="timeline-heading">{edu.degree}</h4>
                    <div className="timeline-subheading">{edu.institution}</div>
                    <div style={{ display: 'inline-block', marginBottom: '8px' }}>
                      <span className="badge badge-primary">{edu.gpa}</span>
                    </div>
                    <p className="timeline-desc">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certifications-section-wrapper reveal-on-scroll">
          <h3 className="column-title" style={{ justifyContent: 'center', marginBottom: '28px' }}>
            <Award size={22} color="var(--accent-yellow)" />
            <span>ใบประกาศนียบัตรและคอร์สที่ผ่านการรับรอง (Certifications)</span>
          </h3>

          <div className="certifications-grid">
            {resumeData.certifications.map((cert, idx) => (
              <div key={idx} className={`glass-card cert-card stagger-${(idx % 4) + 1}`}>
                <div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
                <div className="cert-footer">
                  <span>ปี {cert.date}</span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="cert-verify-link"
                    >
                      <span>Verify</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
