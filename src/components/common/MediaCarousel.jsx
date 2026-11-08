import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play } from 'lucide-react';
import '../../styles/carousel.css';

/**
 * MediaCarousel - แสดงรูปภาพหลายรูปและวิดีโอใน carousel
 * รองรับ:
 * - images: array ของ URL รูปภาพ
 * - videos: array ของ { type: "file"|"youtube", src: string, title?: string }
 * - image: string (fallback รูปเดี่ยว)
 * - autoPlay: boolean (เลื่อนสลับอัตโนมัติ)
 * - autoPlayInterval: number (ความเร็วในการสลับ ms)
 * - syncStep: number (ถ้าส่งเข้ามา จะเปลี่ยนรูปพร้อมกันตาม step กลาง)
 */
export default function MediaCarousel({ 
  images = [], 
  videos = [], 
  image, 
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000,
  syncStep = null
}) {
  // รวม media ทั้งหมดเข้าด้วยกัน (รูปก่อน แล้วค่อยวิดีโอ)
  const allMedia = [];

  const imgList = images.length > 0 ? images : (image ? [image] : []);
  imgList.forEach((src) => {
    allMedia.push({ type: 'image', src });
  });

  videos.forEach((v) => {
    allMedia.push({ type: v.type || 'file', src: v.src, title: v.title || '' });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const hasMultiple = allMedia.length > 1;

  // เปลี่ยนรูปพร้อมกันตาม syncStep ส่วนกลาง
  useEffect(() => {
    if (syncStep !== null && hasMultiple && !isVideoPlaying && !isHovered) {
      setCurrentIndex(syncStep % allMedia.length);
    }
  }, [syncStep, hasMultiple, isVideoPlaying, isHovered, allMedia.length]);

  // Reset index when media changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsVideoPlaying(false);
  }, [images, videos, image]);

  const goToPrev = useCallback((e) => {
    e?.stopPropagation();
    setIsVideoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
  }, [allMedia.length]);

  const goToNext = useCallback((e) => {
    e?.stopPropagation();
    setIsVideoPlaying(false);
    setCurrentIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
  }, [allMedia.length]);

  const goToIndex = (idx, e) => {
    e?.stopPropagation();
    if (idx !== currentIndex) {
      setIsVideoPlaying(false);
      setCurrentIndex(idx);
    }
  };

  // Auto play เฉพาะตอนที่ไม่ได้ใช้ syncStep (เช่น ใน Modal รายละเอียด)
  useEffect(() => {
    if (syncStep !== null) return;
    if (!autoPlay || !hasMultiple || isVideoPlaying || isHovered) {
      return;
    }

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [syncStep, autoPlay, hasMultiple, isVideoPlaying, isHovered, autoPlayInterval, goToNext]);

  if (allMedia.length === 0) return null;

  const currentMedia = allMedia[currentIndex] || allMedia[0];

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null && hasMultiple) {
      const diff = touchEndX.current - touchStartX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToPrev();
        else goToNext();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getEmbedUrl = (media) => {
    if (media.type === 'youtube') {
      const src = media.src;
      // รองรับทั้งลิงก์ watch?v=..., youtu.be/..., shorts/..., embed/... รวมถึงเคสที่มี &t=...
      const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/);
      if (match) {
        return `https://www.youtube-nocookie.com/embed/${match[1]}`;
      }
      return src;
    }
    if (media.type === 'tiktok') {
      const src = media.src;
      // ถ้าเป็น player url อยู่แล้ว
      if (src.includes('tiktok.com/player/v1/')) return src;
      // ดึง Video ID จาก tiktok url เช่น https://www.tiktok.com/@user/video/7614775454737681684
      const match = src.match(/video\/(\d+)/);
      if (match) {
        return `https://www.tiktok.com/player/v1/${match[1]}?autoplay=0`;
      }
      return src;
    }
    return media.src;
  };

  const renderMedia = () => {
    if (currentMedia.type === 'image') {
      return (
        <img
          key={currentMedia.src + currentIndex}
          src={currentMedia.src}
          alt={`Media ${currentIndex + 1}`}
          className="carousel-media carousel-img"
          loading="lazy"
          decoding="async"
        />
      );
    }

    if (currentMedia.type === 'youtube' || currentMedia.type === 'tiktok') {
      const embedSrc = getEmbedUrl(currentMedia);
      return (
        <div className="carousel-video-wrapper" onClick={(e) => e.stopPropagation()}>
          <iframe
            src={embedSrc}
            title={currentMedia.title || `${currentMedia.type} Video ${currentIndex + 1}`}
            className="carousel-media carousel-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }

    // type === 'file' (mp4, webm, etc.)
    return (
      <div className="carousel-video-wrapper" onClick={(e) => e.stopPropagation()}>
        <video
          ref={videoRef}
          src={currentMedia.src}
          className="carousel-media carousel-video"
          controls
          preload="metadata"
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
          onEnded={() => {
            setIsVideoPlaying(false);
            goToNext();
          }}
        >
          เบราว์เซอร์ไม่รองรับการเล่นวิดีโอ
        </video>
      </div>
    );
  };

  return (
    <div
      className={`media-carousel ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Content */}
      <div className="carousel-display">
        {renderMedia()}

        {/* Nav Arrows (only if multiple) */}
        {hasMultiple && (
          <>
            <button
              className="carousel-nav-btn carousel-nav-prev"
              onClick={goToPrev}
              type="button"
              aria-label="ก่อนหน้า"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="carousel-nav-btn carousel-nav-next"
              onClick={goToNext}
              type="button"
              aria-label="ถัดไป"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter Badge */}
        {hasMultiple && (
          <div className="carousel-counter">
            {currentIndex + 1} / {allMedia.length}
          </div>
        )}
      </div>

      {/* Dot Indicators */}
      {hasMultiple && (
        <div className="carousel-dots">
          {allMedia.map((media, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''} ${media.type !== 'image' ? 'dot-video' : ''}`}
              onClick={(e) => goToIndex(idx, e)}
              type="button"
              aria-label={`ไปยังสื่อที่ ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
