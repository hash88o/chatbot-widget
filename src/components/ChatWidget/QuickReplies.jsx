import React from 'react';

/**
 * Predefined reply buttons. Styled as conversation, not form controls.
 * Disappear once one is used (handled by parent not rendering after selection).
 */
export function QuickReplies({ options, onSelect, disabled }) {
  if (!options || options.length === 0) return null;
  return (
    <div className="quick-replies" role="group" aria-label="Suggested replies">
      <div className="quick-replies__label">Suggested replies</div>
      {options.map((label, i) => (
        <button
          key={`${label}-${i}`}
          type="button"
          className="quick-replies__btn"
          onClick={() => onSelect(label)}
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
