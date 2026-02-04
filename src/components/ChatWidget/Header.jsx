import React from 'react';

/**
 * Widget header: brand identity + subtle status + close.
 * Establishes trust without visual noise.
 */
export function Header({ brandName, onClose }) {
  return (
    <header className="chat-header" role="banner">
      <div className="chat-header__info">
        <span className="chat-header__brand">{brandName}</span>
        <div className="chat-header__status" aria-label="Typically replies in under a minute">
          <span className="chat-header__status-dot" aria-hidden />
          <span className="chat-header__status-text">Online · Typically replies in under a minute</span>
        </div>
      </div>
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
