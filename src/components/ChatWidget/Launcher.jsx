import React from 'react';

/**
 * Floating launcher button — bottom-right, clear affordance.
 * Uses transform for hover/active to avoid layout; respects reduced-motion.
 */
export function Launcher({ onClick, isOpen, 'aria-label': ariaLabel }) {
  return (
    <button
      type="button"
      className="chat-launcher"
      onClick={onClick}
      aria-label={ariaLabel || (isOpen ? 'Close chat' : 'Open chat')}
      aria-expanded={isOpen}
    >
      <span className="chat-launcher__icon" aria-hidden>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </span>
    </button>
  );
}
