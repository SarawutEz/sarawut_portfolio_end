import React, { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import ProjectModal from '../common/ProjectModal';
import { Github } from '../common/BrandIcons';
import { projectsData } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, Eye } from 'lucide-react';
import '../../styles/projects.css';

const dynamicCategories = ["ทั้งหมด (All)", ...Array.from(new Set(projectsData.map(p => p.category).filter(Boolean)))];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด (All)");
  const [selectedProject, setSelectedProject] = useState(null);

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
        <div className="project-filters">
          {dynamicCategories.map((cat, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              <div className="project-img-box">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-img" 
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-category-badge">
                  {project.category}
                </span>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="badge badge-cyan">{tag}</span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="badge">+{project.tags.length - 4}</span>
                  )}
                </div>

                <div className="project-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye size={15} />
                    <span>ดูรายละเอียด</span>
                  </button>

                  <div className="project-links">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="project-link-btn"
                        title="Live Demo"
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
