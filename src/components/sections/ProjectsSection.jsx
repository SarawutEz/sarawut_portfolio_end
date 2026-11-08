import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import ProjectModal from '../common/ProjectModal';
import MediaCarousel from '../common/MediaCarousel';
import { Github } from '../common/BrandIcons';
import { projectsData } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, Eye } from 'lucide-react';
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
