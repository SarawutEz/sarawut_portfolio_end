import React, { useState } from 'react';
import { personalData } from '../../data/portfolioData';
import { ShieldCheck, Sparkles, QrCode } from 'lucide-react';
import '../../styles/idcard.css';

export default function EmployeeIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="id-card-stage">
      {/* สายคล้องคอ (Lanyard Ribbon) */}
      <div className="id-lanyard-strap">
        <div className="id-lanyard-ribbon">
          <span className="ribbon-text">PORTFOLIO • SARAWUT W. • PORTFOLIO • SARAWUT W.</span>
        </div>
      </div>

      {/* ห่วงคล้องและตัวหนีบโลหะ (Metallic Clip & Hook) */}
      <div className="id-clip-assembly">
        <div className="id-clip-metal-loop"></div>
        <div className="id-clip-connector"></div>
        <div className="id-clip-metal-hook"></div>
      </div>

      {/* ตัวบัตรที่แกว่งแบบลูกตุ้มฟิสิกส์ (Pendulum Swing Container) */}
      <div className="id-card-pendulum-wrapper">
        {/* ปลอกเคสพลาสติกใส (Transparent Acrylic / Plastic Sleeve) */}
        <div 
          className={`id-card-sleeve ${isFlipped ? 'flipped' : ''}`}
          onClick={toggleFlip}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleFlip(); }}
          title="คลิกเพื่อพลิกบัตรหน้า - หลัง"
          aria-label="คลิกเพื่อพลิกบัตรพนักงาน"
        >
          {/* รูเจาะสำหรับคล้องบัตร (Slot Hole) */}
          <div className="id-sleeve-slot-container">
            <div className="id-sleeve-slot"></div>
          </div>

          {/* เงาสะท้อนแสงกระจกเงาด้านหน้าซองใส */}
          <div className="id-sleeve-glare"></div>

          {/* 3D Card Inner (รองรับการพลิก 3D Flip) */}
          <div className="id-card-inner">
            
            {/* ===================== ด้านหน้าบัตร (FRONT SIDE) ===================== */}
            <div className="id-card-face id-card-front">
              {/* Header บัตร */}
              <div className="id-card-header">
                <div className="id-company-brand">
                  <div className="id-logo-icon">
                    <ShieldCheck size={18} color="#09090b" />
                  </div>
                  <div className="id-company-text">
                    <div className="id-company-name">DEV & CREATOR</div>
                    <div className="id-company-tagline">OFFICIAL IDENTIFICATION</div>
                  </div>
                </div>
                <div className="id-chip-sim"></div>
              </div>

              {/* กรอบรูปถ่ายพนักงาน (Employee Photo) */}
              <div className="id-photo-container">
                <div className="id-photo-ring">
                  <img
                    src="/images/Sarwut_avatra.png"
                    alt={personalData.name}
                    className="id-photo-img"
                  />
                </div>
                <div className="id-status-indicator" title="พร้อมร่วมงาน">
                  <span className="id-status-dot"></span>
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* ชื่อและตำแหน่ง */}
              <div className="id-info-block">
                <h3 className="id-name-th">{personalData.name}</h3>
                <div className="id-name-en">{personalData.englishName}</div>
                <div className="id-role-badge">
                  <Sparkles size={12} color="var(--accent-yellow)" />
                  <span>Web Developer & UI/UX</span>
                </div>
              </div>

              {/* ข้อมูลประจำตัว */}
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

              {/* บาร์โค้ดท้ายบัตร (Barcode) */}
              <div className="id-barcode-container">
                <div className="id-barcode-bars"></div>
                <div className="id-barcode-num">SARAWUT // 0953371342</div>
              </div>

              {/* ข้อความใบ้ให้แตะพลิก */}
              <div className="id-flip-hint">
                <span>แตะเพื่อดูด้านหลังบัตร ↺</span>
              </div>
            </div>

            {/* ===================== ด้านหลังบัตร (BACK SIDE) ===================== */}
            <div className="id-card-face id-card-back">
              {/* แถบแม่เหล็กสีดำ (Magnetic Stripe) */}
              <div className="id-magstripe"></div>

              {/* หัวข้อด้านหลัง */}
              <div className="id-back-header">
                <div className="id-company-name-back">TERMS & CREDENTIALS</div>
                <div className="id-back-sub">Verified Portfolio Identity</div>
              </div>

              {/* QR Code เชื่อมต่อ GitHub / Portfolio */}
              <div className="id-back-qr-box">
                <div className="id-qr-visual">
                  <QrCode size={78} color="#09090b" />
                </div>
                <div className="id-qr-label">SCAN TO CONNECT GITHUB</div>
              </div>

              {/* เงื่อนไข & ช่องทางด่วน */}
              <div className="id-back-terms">
                <p>• ผู้ถือบัตรเป็น Web Developer & UI/UX Designer ที่มีความมุ่งมั่นและพร้อมร่วมงาน</p>
                <p>• ช่องทางติดต่อ: {personalData.phone}</p>
                <p>• อีเมล: {personalData.email}</p>
              </div>

              {/* ลายเซ็นดิจิทัล (Digital Signature) */}
              <div className="id-signature-area">
                <div className="id-signature-line">
                  <span className="signature-font">Sarawut Wisetphon</span>
                </div>
                <div className="id-signature-title">Authorized Signature</div>
              </div>

              {/* ข้อความใบ้ให้แตะพลิก */}
              <div className="id-flip-hint">
                <span>แตะเพื่อดูด้านหน้าบัตร ↺</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
