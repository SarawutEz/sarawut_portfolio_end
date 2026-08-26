import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { Github } from './BrandIcons';
import '../../styles/modal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.classList.add('scroll-lock');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal" type="button">
          <X size={20} />
        </button>

        <div className="modal-hero-img-box">
          <img src={project.image} alt={project.title} className="modal-hero-img" decoding="async" />
        </div>

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{project.category}</span>
            {project.featured && <span className="badge badge-cyan"><Sparkles size={12} /> Featured</span>}
          </div>

          <h3 className="modal-title">{project.title}</h3>
          
          <p className="modal-description">{project.fullDescription || project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h4 className="modal-section-title">
                <CheckCircle2 size={18} color="var(--accent-yellow)" />
                <span>Key Features & Highlights</span>
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="modal-highlight-item">
                    <span className="highlight-bullet">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h4 className="modal-section-title">
              <Layers size={18} color="var(--accent-yellow)" />
              <span>Tech Stack & Libraries</span>
            </h4>
            <div className="modal-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="badge badge-cyan">{tag}</span>
              ))}
            </div>
          </div>

          <div className="modal-footer-actions">
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary modal-action-btn"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary modal-action-btn"
              >
                <Github size={16} />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
