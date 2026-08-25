import React from 'react';

export default function SectionTitle({ tag, title, subtitle, icon: Icon }) {
  return (
    <div className="section-header">
      {tag && (
        <div className="section-tag">
          {Icon && <Icon size={14} />}
          <span>{tag}</span>
        </div>
      )}
      <h2 className="section-title">
        {title}
      </h2>
      {subtitle && <p className="section-description">{subtitle}</p>}
    </div>
  );
}
