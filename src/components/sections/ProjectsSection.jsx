import React, { useState, useEffect } from 'react';
import SectionTitle from '../common/SectionTitle';
import ProjectModal from '../common/ProjectModal';
import MediaCarousel from '../common/MediaCarousel';
import { Github } from '../common/BrandIcons';
import { projectsData, videoProjectsData } from '../../data/portfolioData';
import { FolderGit2, ExternalLink, Eye, Video, Film, Play, X } from 'lucide-react';
import '../../styles/projects.css';

const dynamicCategories = ["ทั้งหมด (All)", ...Array.from(new Set(projectsData.map(p => p.category).filter(Boolean)))];

// ตรวจจับแพลตฟอร์มอัตโนมัติจากลิงก์
const detectPlatform = (url = '') => {
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('youtu.be') || url.includes('youtube.com')) return 'youtube';
  return 'file';
};

// แปลงลิงก์วิดีโอให้เป็น Embed Player อัตโนมัติ
const getVideoEmbedUrl = (video, autoplay = true) => {
  if (!video) return '';
  const src = video.videoUrl || video.embedUrl || video.videos?.[0]?.src || '';
  const platform = video.platform || detectPlatform(src);

  if (platform === 'tiktok') {
    const match = src.match(/video\/(\d+)/);
    const videoId = match ? match[1] : (src.includes('player/v1/') ? src.split('player/v1/')[1]?.split('?')[0] : '');
    return videoId ? `https://www.tiktok.com/player/v1/${videoId}?autoplay=${autoplay ? 1 : 0}` : src;
  }
  if (platform === 'youtube') {
    const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
    if (match) {
      return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=${autoplay ? 1 : 0}&rel=0`;
    }
    return src.includes('embed/') ? `${src}?autoplay=${autoplay ? 1 : 0}&rel=0` : src;
  }
  return src;
};

// ดึงภาพหน้าปกอัตโนมัติ (ถ้าระบุ image ให้ใช้ image, ถ้าไม่ระบุและเป็น YouTube ดึงภาพจาก YouTube อัตโนมัติ)
const getVideoThumbnail = (video) => {
  if (video.image) return video.image;
  if (video.images && video.images.length > 0 && video.images[0]) return video.images[0];
  const src = video.videoUrl || video.embedUrl || video.videos?.[0]?.src || '';
  const ytMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  }
  return null;
};

// ฟังก์ชันแปลงข้อมูลวิดีโอให้สมบูรณ์อัตโนมัติ (ผู้ใช้กรอกแค่ title + videoUrl ก็ใช้งานได้ 100%)
const normalizeVideoItem = (raw = {}, idx = 0) => {
  const videoUrl = raw.videoUrl || raw.embedUrl || raw.videos?.[0]?.src || '';
  const platform = raw.platform || detectPlatform(videoUrl);
  const title = raw.title || `วิดีโอผลงาน ${idx + 1}`;
  const category = raw.category || (platform === 'tiktok' ? 'TikTok Video' : platform === 'youtube' ? 'YouTube Demo' : 'Video Project');
  const description = raw.description || raw.fullDescription || 'วิดีโอสาธิตและนำเสนอผลงาน';
  const tags = raw.tags && raw.tags.length > 0
    ? raw.tags
    : [platform === 'tiktok' ? 'TikTok' : platform === 'youtube' ? 'YouTube' : 'Video', 'Content'];
  const externalUrl = raw.externalUrl || raw.liveUrl || (videoUrl.startsWith('http') ? videoUrl : '');

  const videos = raw.videos && raw.videos.length > 0
    ? raw.videos
    : (videoUrl ? [{ type: platform, src: videoUrl, title }] : []);

  const image = raw.image || getVideoThumbnail({ ...raw, videoUrl, platform }) || '';

  return {
    ...raw,
    id: raw.id || `video-${idx + 1}`,
    title,
    videoUrl,
    platform,
    category,
    duration: raw.duration || (platform === 'tiktok' ? 'Short-form' : 'Video'),
    description,
    fullDescription: raw.fullDescription || description,
    tags,
    externalUrl,
    videos,
    image,
    images: raw.images || (image ? [image] : [])
  };
};

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด (All)");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [syncStep, setSyncStep] = useState(0);

  // ตัวจับเวลาส่วนกลาง ให้การ์ดทุกใบเปลี่ยนรูปไปพร้อมกันตรงจังหวะ
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncStep((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const filteredProjects = activeCategory === "ทั้งหมด (All)"
    ? projectsData
    : projectsData.filter(item => item.category === activeCategory);

  const handleOpenDetails = (item, idx = 0) => {
    const video = normalizeVideoItem(item, idx);
    setSelectedProject(video);
  };

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
              key={project.id || idx} 
              className={`glass-card project-card clickable-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
              onClick={() => handleOpenDetails(project, idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenDetails(project, idx);
                }
              }}
              aria-label={`คลิกเพื่อดูรายละเอียด ${project.title}`}
            >
              <div className="project-img-box">
                <MediaCarousel
                  images={(project.images || (project.image ? [project.image] : [])).filter(Boolean)}
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
              รวมคลิปวิดีโอคอนเทนต์สั้นบน TikTok และผลงานตัดต่อมัลติมีเดีย
            </p>
          </div>

          <div className="video-projects-grid">
            {videoProjectsData.map((rawVideo, idx) => {
              const video = normalizeVideoItem(rawVideo, idx);
              const thumbnail = getVideoThumbnail(video);
              const isPlaying = activePlayingId === video.id;
              const hasVideo = Boolean(video.videoUrl || (video.videos && video.videos.length > 0));

              return (
                <div 
                  key={video.id} 
                  className={`glass-card project-card video-card reveal-on-scroll stagger-${(idx % 3) + 1}`}
                >
                  {/* 1. ด้านบนที่เป็นคลิป - เล่นคลิปทันที หรือมีภาพหน้าปกอัตโนมัติ */}
                  <div className="project-img-box video-img-box">
                    {isPlaying || (!thumbnail && hasVideo) ? (
                      <div className="video-player-active" onClick={(e) => e.stopPropagation()}>
                        {video.platform === 'tiktok' || video.videoUrl?.includes('tiktok') ? (
                          <iframe
                            src={getVideoEmbedUrl(video, isPlaying)}
                            title={video.title}
                            className="video-embedded-iframe"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : video.platform === 'youtube' || video.videoUrl?.includes('youtu') ? (
                          <iframe
                            src={getVideoEmbedUrl(video, isPlaying)}
                            title={video.title}
                            className="video-embedded-iframe"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : video.videoUrl || video.videos?.[0]?.src ? (
                          <video
                            src={video.videoUrl || video.videos?.[0]?.src}
                            controls
                            autoPlay={isPlaying}
                            preload="metadata"
                            className="video-embedded-player"
                          >
                            เบราว์เซอร์ไม่รองรับการเล่นวิดีโอ
                          </video>
                        ) : (
                          <div className="video-placeholder-notice">
                            <p>ไม่มีไฟล์คลิปสำหรับเล่นโดยตรง</p>
                          </div>
                        )}
                        {isPlaying && (
                          <button
                            className="video-close-inline-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePlayingId(null);
                            }}
                            title="ปิดคลิปและกลับสู่ภาพหน้าปก"
                            type="button"
                            aria-label="ปิดคลิป"
                          >
                            <X size={15} />
                            <span>ปิดคลิป</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div 
                        className="video-poster-wrapper"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePlayingId(video.id);
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            e.stopPropagation();
                            setActivePlayingId(video.id);
                          }
                        }}
                        title="กดที่นี่เพื่อเล่นคลิปทันที"
                        aria-label={`กดที่นี่เพื่อเล่นคลิป ${video.title}`}
                      >
                        <img 
                          src={thumbnail} 
                          alt={video.title} 
                          className="project-img video-img"
                          loading="lazy" 
                        />

                        {/* Play Indicator Badge */}
                        <div className="video-center-play-badge" aria-hidden="true">
                          <div className="play-icon-glow">
                            <Play size={24} className="play-icon" />
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

                        {/* Hover Hint on Video (ชี้ด้านบน): คลิกเล่นคลิปทันที */}
                        <div className="video-overlay-hint video-play-hint" aria-hidden="true">
                          <Play size={20} />
                          <span>คลิกเล่นคลิปทันที</span>
                        </div>

                        {/* Hover Hint from Details (ชี้ด้านล่าง): คลิกดูรายละเอียด */}
                        <div className="video-overlay-hint video-details-hint" aria-hidden="true">
                          <Eye size={20} />
                          <span>คลิกดูรายละเอียด</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. ด้านล่างที่เป็นเนื้อหา - กดเพื่อเข้าไปดูรายละเอียดได้ทันที */}
                  <div 
                    className="project-content video-content clickable-details-area"
                    onClick={() => handleOpenDetails(video, idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenDetails(video, idx);
                      }
                    }}
                    title="คลิกเพื่อดูรายละเอียด"
                    aria-label={`คลิกเพื่อดูรายละเอียด ${video.title}`}
                  >
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
              );
            })}
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
