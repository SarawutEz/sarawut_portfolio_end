import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import ProjectModal from '../common/ProjectModal';
import MediaCarousel from '../common/MediaCarousel';
import { Github } from '../common/BrandIcons';
import { projectsData, videoProjectsData } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, Eye, Video, Film, Play, Sparkles } from 'lucide-react';
import '../../styles/projects.css';

const dynamicCategories = ["ทั้งหมด (All)", ...Array.from(new Set(projectsData.map(p => p.category).filter(Boolean)))];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด (All)");
  const [selectedProject, setSelectedProject] = useState(null);
  const [syncStep, setSyncStep] = useState(0);

  // ตัวจับเวลาส่วนกลาง ให้การ์ดทุกใบเปลี่ยนรูปไปพร้อมกันตรงจังหวะ
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStep((prev) => prev + 1);
    }, 4000); // ปรับเวลาเปลี่ยนรูปพร้อมกันทุกๆ 4 วินาที (แก้ตัวเลขได้)

    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeCategory === "ทั้งหมด (All)"
    ? projectsData
    : projectsData.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="projects-section">
      <div className="container">
        <SectionTitle 
          tag="Portfolio"
          icon={FolderGit2}
          title={<>ผลงานและ <span className="gradient-text">โปรเจกต์ที่โดดเด่น</span></>}
          subtitle="รวมโปรเจกต์ Web Applications, APIs และระบบซอฟต์แวร์ที่พัฒนาขึ้นจริง พร้อม Live Demo และซอร์สโค้ดบน GitHub"
        />

        {/* Filter Tabs */}
        <div className="project-filters-wrapper reveal-on-scroll">
          <div className="project-filters">
            {dynamicCategories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`glass-card project-card clickable-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`คลิกเพื่อดูรายละเอียด ${project.title}`}
            >
              <div className="project-img-box">
                {/* ส่ง syncStep เข้าไปเพื่อให้ทุกการ์ดเปลี่ยนรูปพร้อมกัน */}
                <MediaCarousel
                  images={project.images || [project.image]}
                  videos={project.videos || []}
                  image={project.image}
                  syncStep={syncStep}
                  className="project-card-carousel"
                />
                <span className="project-category-badge">
                  {project.category}
                </span>
                <div className="project-card-overlay-hint">
                  <Eye size={18} />
                  <span>คลิกดูรายละเอียด</span>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, tIdx) => (
                    <span key={tag || tIdx} className="badge badge-cyan">{tag}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="badge">+{project.tags.length - 4}</span>
                  )}
                </div>

                <div className="project-actions">
                  <div className="project-links" onClick={(e) => e.stopPropagation()}>
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-link-btn"
                        title="Live Demo"
                        aria-label={`Live Demo for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={17} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-link-btn"
                        title="GitHub Repository"
                        aria-label={`GitHub Repository for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={17} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* หัวข้อรอง (Sub-section): Video & Multimedia Projects */}
        {/* ========================================================= */}
        <div id="video-projects" className="projects-subsection reveal-on-scroll">
          <div className="subsection-divider">
            <span className="divider-line"></span>
            <span className="divider-icon" aria-hidden="true">
              <Video size={18} />
            </span>
            <span className="divider-line"></span>
          </div>

          <div className="subsection-header">
            <div className="section-tag subsection-tag">
              <Film size={14} />
              <span>Video Showcase</span>
            </div>
            <h3 className="subsection-title">
              วิดีโอผลงาน <span className="gradient-text">& Media Projects</span>
            </h3>
            <p className="subsection-description">
              รวมคลิปวิดีโอสาธิตระบบ (Demo), วิดีโอคอนเทนต์สั้นบน TikTok และผลงานตัดต่อมัลติมีเดีย
            </p>
          </div>

          <div className="video-projects-grid">
            {videoProjectsData.map((video, idx) => (
              <div 
                key={video.id} 
                className={`glass-card project-card video-card clickable-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
                onClick={() => setSelectedProject(video)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(video);
                  }
                }}
                aria-label={`คลิกเพื่อดูรายละเอียด ${video.title}`}
              >
                {/* Video Media Box */}
                <div className="project-img-box video-img-box">
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    className="project-img video-img"
                    loading="lazy" 
                  />

                  {/* Play Indicator Badge */}
                  <div className="video-center-play-badge" aria-hidden="true">
                    <div className="play-icon-glow">
                      <Play size={22} className="play-icon" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="video-card-top-badges">
                    <span className="project-category-badge video-platform-badge">
                      {video.platform === 'tiktok' ? 'TikTok' : video.platform === 'youtube' ? 'YouTube' : 'Showreel'}
                    </span>
                    {video.duration && (
                      <span className="video-duration-badge">
                        <Play size={10} />
                        <span>{video.duration}</span>
                      </span>
                    )}
                  </div>

                  {/* Overlay Hint on Hover */}
                  <div className="project-card-overlay-hint">
                    <Eye size={18} />
                    <span>คลิกดูรายละเอียด</span>
                  </div>
                </div>

                {/* Video Card Content */}
                <div className="project-content video-content">
                  <span className="video-category-label">{video.category}</span>
                  <h3 className="project-title">{video.title}</h3>
                  <p className="project-desc">{video.description}</p>

                  <div className="project-tags">
                    {video.tags.slice(0, 4).map((tag, tIdx) => (
                      <span key={tag || tIdx} className="badge badge-cyan">{tag}</span>
                    ))}
                    {video.tags.length > 4 && (
                      <span className="badge">+{video.tags.length - 4}</span>
                    )}
                  </div>

                  <div className="project-actions">
                    <button
                      className="btn-view-details"
                      onClick={() => setSelectedProject(video)}
                      type="button"
                    >
                      <Eye size={15} />
                      <span>ดูรายละเอียด</span>
                    </button>

                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {video.externalUrl && (
                        <a
                          href={video.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                          title={`เปิดดูบน ${video.platform === 'tiktok' ? 'TikTok' : video.platform === 'youtube' ? 'YouTube' : 'ลิงก์ภายนอก'}`}
                          aria-label={`เปิดดูบน ${video.platform}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
