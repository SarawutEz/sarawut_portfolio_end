import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Sparkles, ChevronDown, Presentation, Loader2 } from 'lucide-react';
import { Github, CanvaIcon } from './BrandIcons';
import MediaCarousel from './MediaCarousel';
import Lightbox from './Lightbox';
import '../../styles/modal.css';

// ฟังก์ชันแปลงและตรวจสอบลิงก์ Canva อัตโนมัติ (รองรับ Embed link, View link, Edit link และ <iframe>)
const parseCanvaUrl = (rawUrl = '') => {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  let url = rawUrl.trim();

  // ตรวจจับกรณีคัดลอกโค้ด <iframe src="..."> มาทั้งบล็อก
  const iframeMatch = url.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    url = iframeMatch[1];
  }

  if (url.includes('canva.com/design/')) {
    // กำจัด query string และ path ย่อยที่ไม่จำเป็น
    const cleanBase = url.split('?')[0].replace(/\/edit\/?$/, '').replace(/\/view\/?$/, '').replace(/\/watch\/?$/, '');
    return {
      embedUrl: `${cleanBase}/view?embed`,
      viewUrl: `${cleanBase}/view`
    };
  }

  // หากเป็น canva.link หรือ url อื่นๆ
  return {
    embedUrl: url,
    viewUrl: url
  };
};

export default function ProjectModal({ project, onClose }) {
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [canvaLoading, setCanvaLoading] = useState(true);
  const contentRef = useRef(null);

  const canvaData = project?.canvaUrl ? parseCanvaUrl(project.canvaUrl) : null;

  useEffect(() => {
    setCanvaLoading(true);
  }, [project?.canvaUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        onClose();
      }
    };
    document.body.classList.add('scroll-lock');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('scroll-lock');
      window.removeEventListener('keydown', handleKeyDown);
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
    };
  }, [onClose]);

  if (!project) return null;

  const handleTouchStart = (e) => {
    // Only allow swipe to dismiss if at the top of the modal scroll
    if (contentRef.current && contentRef.current.scrollTop === 0) {
      setTouchStartY(e.targetTouches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartY !== null) {
      setTouchEndY(e.targetTouches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY !== null && touchEndY !== null) {
      const distance = touchEndY - touchStartY;
      if (distance > 70) {
        onClose();
      }
    }
    setTouchStartY(null);
    setTouchEndY(null);
  };

  // ดึง media data (รองรับกรณีใส่เฉพาะวิดีโอโดยไม่ต้องมีรูปภาพ)
  const projectImages = (project.images || (project.image ? [project.image] : [])).filter(Boolean);
  const projectVideos = project.videos && project.videos.length > 0
    ? project.videos
    : (project.videoUrl ? [{ type: project.platform || 'file', src: project.videoUrl, title: project.title }] : []);
  const hasMedia = projectImages.length > 0 || projectVideos.length > 0;
  const hasMultipleMedia = projectImages.length + projectVideos.length > 1;
  const isTikTok = project.platform === 'tiktok' || 
    project.videoUrl?.includes('tiktok') || 
    projectVideos.some((v) => v.type === 'tiktok' || v.src?.includes('tiktok'));

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div 
        ref={contentRef}
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Mobile Drag / Pull Indicator */}
        <div 
          className="modal-drag-handle-container"
          onClick={onClose}
          title="แตะหรือปัดลงเพื่อปิด"
          aria-label="แตะหรือปัดลงเพื่อปิด"
        >
          <div className="modal-drag-pill"></div>
        </div>

        {/* Media Area - Carousel หรือ Video Player */}
        {hasMedia ? (
          <div className={`modal-hero-img-box ${hasMultipleMedia ? 'has-carousel' : ''} ${isTikTok ? 'modal-hero-tiktok' : ''}`}>
            <MediaCarousel
              images={projectImages}
              videos={projectVideos}
              image={project.image}
              className="modal-carousel"
              videosFirst={Boolean(project.platform || project.videosFirst || projectVideos.length > 0)}
              onImageClick={(idx) => setLightboxIndex(idx)}
            />
          </div>
        ) : (
          project.image && (
            <div className={`modal-hero-img-box ${isTikTok ? 'modal-hero-tiktok' : ''}`}>
              <img 
                src={project.image} 
                alt={project.title} 
                className="modal-hero-img" 
                decoding="async" 
                style={{ cursor: 'zoom-in' }}
                onClick={() => setLightboxIndex(0)}
              />
            </div>
          )
        )}

        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{project.category}</span>
            {project.featured && <span className="badge badge-cyan"><Sparkles size={12} /> Featured</span>}
          </div>

          <h3 id="modal-project-title" className="modal-title">{project.title}</h3>
          
          <p className="modal-description">{project.fullDescription || project.description}</p>

          {/* Canva Presentation Slide Section */}
          {canvaData && (
            <div className="modal-canva-section">
              <div className="modal-canva-header">
                <h4 className="modal-section-title" style={{ margin: 0 }}>
                  <Presentation size={18} color="var(--accent-yellow)" />
                  <span>สไลด์นำเสนอผลงาน (Canva Presentation)</span>
                </h4>
                {canvaData.viewUrl && (
                  <a
                    href={canvaData.viewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-canva-open-btn"
                    title="เปิดสไลด์ดูแบบเต็มจอในแท็บใหม่"
                  >
                    <CanvaIcon size={16} />
                    <span>เปิดดูใน Canva</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>

              <div className="modal-canva-frame-container">
                {canvaLoading && (
                  <div className="modal-canva-skeleton">
                    <Loader2 size={28} className="modal-canva-spinner" />
                    <span>กำลังโหลดสไลด์นำเสนอ...</span>
                  </div>
                )}
                <iframe
                  src={canvaData.embedUrl}
                  title={`${project.title} - Canva Presentation`}
                  className={`modal-canva-iframe ${canvaLoading ? 'is-loading' : 'is-ready'}`}
                  loading="lazy"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  allowFullScreen
                  onLoad={() => setCanvaLoading(false)}
                />
              </div>
            </div>
          )}

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

          {project.tags && project.tags.length > 0 && (
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
          )}

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
            <button 
              type="button" 
              className="btn btn-close-modal modal-action-btn"
              onClick={onClose}
              aria-label="ปิดหน้าต่างรายละเอียด"
            >
              <ChevronDown size={18} className="modal-close-down-icon" />
              <span>ปิดหน้าต่าง</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox ขยายดูภาพเต็ม 100% คมชัดเต็มจอเมื่อคลิกที่รูป */}
      {lightboxIndex !== null && projectImages.length > 0 && (
        <Lightbox
          images={projectImages.map((src) => ({ image: src, title: project.title }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1))}
          onNext={() => setLightboxIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1))}
        />
      )}
    </div>
  );
}
