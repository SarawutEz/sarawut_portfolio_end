import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { Github } from './BrandIcons';
import '../../styles/modal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <img src={project.image} alt={project.title} className="modal-hero-img" />

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-primary">{project.category}</span>
            {project.featured && <span className="badge badge-cyan"><Sparkles size={12} /> Featured</span>}
          </div>

          <h3 className="modal-title">{project.title}</h3>
          
          <p className="modal-description">{project.fullDescription || project.description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="modal-section-title">
                <CheckCircle2 size={18} color="var(--accent-emerald)" />
                Key Features & Highlights
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="modal-highlight-item">
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="modal-section-title">
              <Layers size={18} color="var(--primary-accent)" />
              Tech Stack & Libraries
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
                className="btn btn-primary"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary"
              >
                <Github size={16} /> View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
