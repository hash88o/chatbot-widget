import React from 'react';

/**
 * Widget header: brand name + close. Semantic and keyboard-accessible.
 */
export function Header({ brandName, onClose }) {
  return (
    <header className="chat-header" role="banner">
      <span className="chat-header__brand">{brandName}</span>
      <button
        type="button"
        className="chat-header__close"
        onClick={onClose}
        aria-label="Close chat"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </header>
  );
}
