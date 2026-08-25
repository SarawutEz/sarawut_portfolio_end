import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#facc15" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    info: <Info size={18} color="#facc15" />
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      background: 'var(--bg-card)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--border-highlight)',
      borderRadius: 'var(--border-radius-md)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(250, 204, 21, 0.25)',
      color: 'var(--text-primary)',
      fontSize: '0.92rem',
      fontWeight: '500',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {icons[type] || icons.success}
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
