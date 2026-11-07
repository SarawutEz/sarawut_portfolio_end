import React from 'react';
import SectionTitle from '../common/SectionTitle';
import { personalData, interestsData, skillsData } from '../../data/portfolioData';
import { 
  User, 
  FolderGit2, 
  Trophy, 
  Code2, 
  Sparkles, 
  Layout, 
  Video, 
  Wrench, 
  CheckCircle2, 
  HeartHandshake, 
  Globe, 
  Palette, 
  Film, 
  Lightbulb
} from 'lucide-react';
import '../../styles/about.css';

const statIconMap = {
  FolderGit2: FolderGit2,
  Trophy: Trophy,
  Code2: Code2,
  Sparkles: Sparkles
};

const interestIconMap = {
  Globe: Globe,
  Palette: Palette,
  Video: Video,
  Sparkles: Sparkles
};

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionTitle 
          tag="About Me"
          icon={User}
          title={<>รู้จักผม <span className="gradient-text">ความสนใจและทักษะความสามารถ</span></>}
          subtitle="ประวัติ ความหลงใหลในเทคโนโลยี และทักษะที่พร้อมนำมาสร้างสรรค์ผลงานคุณภาพ"
        />

        {/* Bio & Stats Grid */}
        <div className="about-grid">
          {/* Bio Card */}
          <div className="glass-card about-bio-card reveal-on-scroll">
            <div className="about-text-content">
              <h3 className="about-subtitle">
                Passion & Background
              </h3>
              {personalData.longBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="about-bio-footer">
              <div className="about-commitment-badge">
                <CheckCircle2 size={18} className="commitment-icon" />
                <span>มุ่งมั่นพัฒนาผลงานคุณภาพ ที่ตอบโจทย์ผู้ใช้งานจริง</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid reveal-on-scroll stagger-2">
            {personalData.stats.map((stat, idx) => {
              const IconComponent = statIconMap[stat.icon] || Sparkles;
              return (
                <div key={idx} className="glass-card stat-card">
                  <div className="stat-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 💡 ความสนใจ (Interests) */}
        <div className="interests-container reveal-on-scroll">
          <h3 className="skills-category-title" style={{ marginBottom: '20px' }}>
            <Lightbulb size={22} color="var(--accent-yellow)" />
            <span>ความสนใจหลัก (Interests)</span>
          </h3>

          <div className="interests-grid">
            {interestsData.map((item, idx) => {
              const IconComp = interestIconMap[item.icon] || Sparkles;
              return (
                <div key={item.id} className={`glass-card interest-card stagger-${(idx % 4) + 1}`}>
                  <div className="interest-icon-box">
                    <IconComp size={22} />
                  </div>
                  <h4 className="interest-title">{item.title}</h4>
                  <p className="interest-desc">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ⚡ ทักษะความสามารถ (Skills) */}
        <div className="skills-container reveal-on-scroll">
          <h3 className="skills-category-title" style={{ marginBottom: '20px' }}>
            <Sparkles size={22} color="var(--accent-yellow)" />
            <span>ทักษะความสามารถ (Skills)</span>
          </h3>

          <div className="skills-grid">
            {/* Web & UI/UX Design */}
            <div className="glass-card skill-category-card">
              <h4 className="skill-group-title">
                <Palette size={19} color="var(--accent-yellow)" />
                <span>Web & UI/UX Design</span>
              </h4>
              <div className="skill-chips-grid">
                {skillsData.webAndDesign.map((skill, idx) => (
                  <div key={idx} className="skill-chip">
                    <span className="skill-chip-icon"><Layout size={15} /></span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Multimedia & Creative */}
            <div className="glass-card skill-category-card">
              <h4 className="skill-group-title">
                <Film size={19} color="var(--accent-yellow)" />
                <span>Multimedia & Creative Editing</span>
              </h4>
              <div className="skill-chips-grid">
                {skillsData.multimediaAndCreative.map((skill, idx) => (
                  <div key={idx} className="skill-chip">
                    <span className="skill-chip-icon"><Video size={15} /></span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🛠 โปรแกรมที่ใช้งานได้ (Software & Tools) */}
          <div className="glass-card about-block-card reveal-on-scroll" style={{ marginBottom: '24px' }}>
            <h4 className="skill-group-title" style={{ marginBottom: '18px' }}>
              <Wrench size={20} color="var(--accent-yellow)" />
              <span>🛠 โปรแกรมที่ใช้งานได้ (Software & Tools)</span>
            </h4>

            <div className="tools-grid">
              {skillsData.softwareAndTools.map((tool, idx) => (
                <div key={idx} className="tool-chip">
                  <span className="tool-name">{tool.name}</span>
                  <span className="tool-cat">{tool.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🤝 Soft Skills & Working Attributes */}
          <div className="glass-card about-block-card reveal-on-scroll">
            <h4 className="skill-group-title" style={{ marginBottom: '14px' }}>
              <HeartHandshake size={20} color="var(--accent-yellow)" />
              <span>ทักษะการทำงานและ Soft Skills</span>
            </h4>
            <div className="soft-skills-wrapper">
              {skillsData.softSkills.map((item, idx) => (
                <div key={idx} className="soft-skill-pill">
                  <Sparkles size={14} color="var(--accent-yellow)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
