import React, { useState, useRef, useCallback, useEffect } from 'react';
import { personalData } from '../../data/portfolioData';
import { ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import '../../styles/idcard.css';

export default function EmployeeIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const downPos = useRef({ x: 0, y: 0 });
  const isDown = useRef(false);
  const isTouchScroll = useRef(false);
  const dragDist = useRef(0);
  const animRef = useRef(null);
  const lastFlipTime = useRef(0);

  /* ---------- Flip Handler (Debounced for smooth 1-click flip) ---------- */
  const toggleFlip = useCallback(() => {
    const now = Date.now();
    if (now - lastFlipTime.current < 350) return;
    lastFlipTime.current = now;
    setIsFlipped((prev) => !prev);
  }, []);

  /* ---------- Pointer handlers (Mobile scroll friendly) ---------- */
  const handlePointerDown = useCallback((e) => {
    // Only primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;

    isDown.current = true;
    isTouchScroll.current = false;
    dragDist.current = 0;
    downPos.current = { x: e.clientX, y: e.clientY };
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };

    // For mouse on desktop, capture pointer immediately.
    // For touch on mobile, do NOT call setPointerCapture right away so vertical scrolling is smooth and unblocked!
    if (e.pointerType !== 'touch') {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
      setIsDragging(true);
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, [offset]);

  const handlePointerMove = useCallback((e) => {
    if (!isDown.current) return;

    const moveX = Math.abs(e.clientX - downPos.current.x);
    const moveY = Math.abs(e.clientY - downPos.current.y);
    const moveDist = Math.hypot(e.clientX - downPos.current.x, e.clientY - downPos.current.y);
    dragDist.current = moveDist;

    // Mobile scroll handling:
    // If user is swiping vertically to scroll the page, cancel card drag and let the page scroll freely!
    if (e.pointerType === 'touch') {
      if (isTouchScroll.current) return;

      if (moveY > moveX && moveY > 5) {
        // Vertical swipe detected -> user is scrolling the webpage!
        isTouchScroll.current = true;
        isDown.current = false;
        setIsDragging(false);
        return;
      }

      // If user drags horizontally > 8px, engage card drag
      if (moveX > 8 && !isDragging) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) {}
        setIsDragging(true);
      }
    }

    if (isTouchScroll.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    setOffset({
      x: Math.max(-200, Math.min(200, dx)),
      y: Math.max(-60, Math.min(180, dy)),
    });
  }, [isDragging]);

  const handlePointerUp = useCallback((e) => {
    if (!isDown.current && !isTouchScroll.current) return;
    const wasTouchScroll = isTouchScroll.current;
    isDown.current = false;
    isTouchScroll.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Only flip if it was NOT a page scroll and movement was small (< 8px)
    if (!wasTouchScroll && dragDist.current < 8) {
      toggleFlip();
    }

    // Spring snap-back to center
    const spring = () => {
      setOffset((prev) => {
        const nx = prev.x * 0.82;
        const ny = prev.y * 0.82;
        if (Math.abs(nx) < 0.5 && Math.abs(ny) < 0.5) return { x: 0, y: 0 };
        animRef.current = requestAnimationFrame(spring);
        return { x: nx, y: ny };
      });
    };
    animRef.current = requestAnimationFrame(spring);
  }, [toggleFlip]);

  const handlePointerCancel = useCallback((e) => {
    isDown.current = false;
    isTouchScroll.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  }, []);

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current); }, []);

  /* ========== SVG Lanyard Geometry ========== */
  const svgW = 300;
  const svgH = 175;
  const cx = svgW / 2; // 150

  // Top anchor — stays fixed on screen by compensating for drag offset
  const anchorX = cx - offset.x;
  const anchorY = -2 - offset.y;

  // Bottom — where ribbon meets clip, fixed relative to card
  const clipH = 55;
  const ribbonEndX = cx;
  const ribbonEndY = svgH - clipH; // ≈ 125

  // Catenary control point
  const ctrlX = (anchorX + ribbonEndX) / 2;
  const ctrlY = (anchorY + ribbonEndY) / 2 + 15 + Math.abs(offset.x) * 0.06;

  // Ribbon half-width
  const hW = 12;

  // Tangent at ribbon bottom → perpendicular for edge alignment
  const tdx = ribbonEndX - ctrlX;
  const tdy = ribbonEndY - ctrlY;
  const ang = Math.atan2(tdy, tdx);
  const nx = -Math.sin(ang);
  const ny = Math.cos(ang);
  const clipDeg = (ang * 180) / Math.PI - 90;
  // Dampen rotation so the hook stays firmly hooked inside the slot hole during drag
  const dampedClipDeg = Math.max(-10, Math.min(10, clipDeg * 0.35));

  // Bottom corners of ribbon
  const bL = { x: ribbonEndX + nx * hW, y: ribbonEndY + ny * hW };
  const bR = { x: ribbonEndX - nx * hW, y: ribbonEndY - ny * hW };

  // Stitch inset
  const si = 3.5;
  const sL = { x: ribbonEndX + nx * (hW - si), y: ribbonEndY + ny * (hW - si) };
  const sR = { x: ribbonEndX - nx * (hW - si), y: ribbonEndY - ny * (hW - si) };

  // Paths
  const strapPath = `
    M ${anchorX - hW} ${anchorY}
    Q ${ctrlX - hW} ${ctrlY}, ${bL.x} ${bL.y}
    L ${bR.x} ${bR.y}
    Q ${ctrlX + hW} ${ctrlY}, ${anchorX + hW} ${anchorY}
    Z`;
  const edgeL = `M ${anchorX - hW} ${anchorY} Q ${ctrlX - hW} ${ctrlY}, ${bL.x} ${bL.y}`;
  const edgeR = `M ${anchorX + hW} ${anchorY} Q ${ctrlX + hW} ${ctrlY}, ${bR.x} ${bR.y}`;
  const stitchL = `M ${anchorX - hW + si} ${anchorY} Q ${ctrlX - hW + si} ${ctrlY}, ${sL.x} ${sL.y}`;
  const stitchR = `M ${anchorX + hW - si} ${anchorY} Q ${ctrlX + hW - si} ${ctrlY}, ${sR.x} ${sR.y}`;
  const textPath = `M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY}, ${ribbonEndX} ${ribbonEndY}`;

  const cardRotation = offset.x * 0.08;
  const isAtRest = !isDragging && Math.abs(offset.x) < 1 && Math.abs(offset.y) < 1;

  return (
    <div className="id-card-stage">
      {/* ===== ONE draggable unit: lanyard SVG + card ===== */}
      <div
        className={`id-card-unit ${isAtRest ? 'idle-swing' : ''}`}
        style={isAtRest ? undefined : {
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(${cardRotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.05s linear',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* ---- Dynamic SVG Lanyard ---- */}
        <svg
          className="id-lanyard-svg"
          viewBox={`0 0 ${svgW} ${svgH}`}
          width={svgW}
          height={svgH}
        >
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#27272a" />
            </linearGradient>
            <linearGradient id="mg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#71717a" />
              <stop offset="50%" stopColor="#e4e4e7" />
              <stop offset="100%" stopColor="#71717a" />
            </linearGradient>
            <linearGradient id="mg2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#52525b" />
              <stop offset="50%" stopColor="#d4d4d8" />
              <stop offset="100%" stopColor="#52525b" />
            </linearGradient>
            <filter id="hookShadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Strap body */}
          <path d={strapPath} fill="url(#sg)" />
          {/* Yellow edges */}
          <path d={edgeL} fill="none" stroke="rgba(250,204,21,0.4)" strokeWidth="2" />
          <path d={edgeR} fill="none" stroke="rgba(250,204,21,0.4)" strokeWidth="2" />
          {/* Stitch lines */}
          <path d={stitchL} fill="none" stroke="rgba(250,204,21,0.25)" strokeWidth="0.8" strokeDasharray="3,3" />
          <path d={stitchR} fill="none" stroke="rgba(250,204,21,0.25)" strokeWidth="0.8" strokeDasharray="3,3" />
          {/* Text along strap */}
          <path id="tp" d={textPath} fill="none" />
          <text fontSize="6" fill="rgba(250,204,21,0.7)" fontWeight="700" letterSpacing="1.5">
            <textPath href="#tp" startOffset="5%">PORTFOLIO • SARAWUT W. • PORTFOLIO</textPath>
          </text>

          {/* Metal clip assembly at ribbon end — hooked securely through slot hole */}
          <g transform={`translate(${ribbonEndX}, ${ribbonEndY}) rotate(${dampedClipDeg})`} filter="url(#hookShadow)">
            {/* Metal loop */}
            <rect x="-11" y="0" width="22" height="9" rx="4" fill="url(#mg)" stroke="#52525b" strokeWidth="1" />
            {/* Connector bar */}
            <rect x="-4" y="9" width="8" height="10" rx="2" fill="url(#mg2)" />
            {/* Hook U-shape — loops directly through the card's slot hole */}
            <path d="M -7 19 L -7 40 Q -7 48, 0 48 Q 7 48, 7 40 L 7 19"
              fill="none" stroke="#d4d4d8" strokeWidth="2.6" strokeLinecap="round" />
            {/* Hook spring tab / clasp latch */}
            <path d="M 7 19 L 7 32 Q 7 35, 10 35"
              fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>

        {/* ---- Card Sleeve (Whole 3D Unit Flips Together) ---- */}
        <div
          className={`id-card-sleeve ${isFlipped ? 'flipped' : ''}`}
          onClick={toggleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(); }}
          title="แตะหรือคลิกเพื่อหมุนดูด้านหน้า - ด้านหลังบัตร • ลากเพื่อดึง"
          aria-label="คลิกเพื่อหมุนพลิกบัตรพนักงาน"
        >
          {/* ===================== FRONT SIDE ===================== */}
          <div className="id-sleeve-face id-sleeve-front">
            <div className="id-sleeve-slot-container">
              <div className="id-sleeve-slot"></div>
            </div>

            <div className="id-sleeve-glare"></div>

            <div className="id-card-inner-card id-card-front">
              {/* Header บัตร */}
              <div className="id-card-header">
                <div className="id-company-brand">
                  <div className="id-logo-icon"><ShieldCheck size={18} color="#09090b" /></div>
                  <div className="id-company-text">
                    <div className="id-company-name">DEV & CREATOR</div>
                    <div className="id-company-tagline">OFFICIAL IDENTIFICATION</div>
                  </div>
                </div>
                <div className="id-chip-sim"></div>
              </div>

              {/* Photo */}
              <div className="id-photo-container">
                <div className="id-photo-ring">
                  <img src="/images/Sarwut_avatra.png" alt={personalData.name}
                    className="id-photo-img" draggable="false" />
                </div>
                <div className="id-status-indicator" title="พร้อมร่วมงาน">
                  <span className="id-status-dot"></span><span>ACTIVE</span>
                </div>
              </div>

              {/* Name & Position */}
              <div className="id-info-block">
                <h3 className="id-name-th">{personalData.name}</h3>
                <div className="id-name-en">{personalData.englishName}</div>
                <div className="id-role-badge">
                  <Sparkles size={12} color="var(--accent-yellow)" />
                  <span>Web Developer & UI/UX</span>
                </div>
              </div>

              {/* Data Table */}
              <div className="id-data-table">
                <div className="id-data-row">
                  <span className="id-data-label">ID NO.</span>
                  <span className="id-data-value">: 2026-DEV-007</span>
                </div>
                <div className="id-data-row">
                  <span className="id-data-label">STATUS</span>
                  <span className="id-data-value highlight">: {personalData.statusBadge}</span>
                </div>
                <div className="id-data-row">
                  <span className="id-data-label">EXP.</span>
                  <span className="id-data-value">: PERMANENT</span>
                </div>
              </div>

              {/* Barcode */}
              <div className="id-barcode-container">
                <div className="id-barcode-bars"></div>
                <div className="id-barcode-num">SARAWUT // 0953371342</div>
              </div>

              <div className="id-flip-hint">
                <span>🖱️ ดึงเพื่อขยับ • แตะเพื่อพลิกดูด้านหลัง ↺</span>
              </div>
            </div>
          </div>

          {/* ===================== BACK SIDE ===================== */}
          <div className="id-sleeve-face id-sleeve-back">
            <div className="id-sleeve-slot-container">
              <div className="id-sleeve-slot"></div>
            </div>

            <div className="id-sleeve-glare"></div>

            <div className="id-card-inner-card id-card-back">
              {/* แถบแม่เหล็กสีดำ */}
              <div className="id-magstripe"></div>

              {/* หัวข้อด้านหลัง */}
              <div className="id-back-header">
                <div className="id-company-name-back">TERMS & CREDENTIALS</div>
                <div className="id-back-sub">Verified Portfolio Identity</div>
              </div>

              {/* QR Code เชื่อมต่อ GitHub */}
              <div className="id-back-qr-box">
                <div className="id-qr-visual"><QrCode size={78} color="#09090b" /></div>
                <div className="id-qr-label">SCAN TO CONNECT GITHUB</div>
              </div>

              {/* เงื่อนไข & ช่องทางติดต่อ */}
              <div className="id-back-terms">
                <p>• ผู้ถือบัตรเป็น Web Developer & UI/UX Designer ที่มีความมุ่งมั่นและพร้อมร่วมงาน</p>
                <p>• ช่องทางติดต่อ: {personalData.phone}</p>
                <p>• อีเมล: {personalData.email}</p>
              </div>

              {/* ลายเซ็นดิจิทัล */}
              <div className="id-signature-area">
                <div className="id-signature-line">
                  <span className="signature-font">Sarawut Wisetphon</span>
                </div>
                <div className="id-signature-title">Authorized Signature</div>
              </div>

              <div className="id-flip-hint">
                <span>🖱️ ดึงเพื่อขยับ • แตะเพื่อพลิกดูด้านหน้า ↺</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
