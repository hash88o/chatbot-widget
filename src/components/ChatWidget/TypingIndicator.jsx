import React from 'react';

/**
 * Minimal typing dots. Animation via CSS; disabled when prefers-reduced-motion.
 */
export function TypingIndicator() {
  return (
    <div className="typing-indicator" role="status" aria-live="polite" aria-label="Support is typing">
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
    </div>
  );
}
