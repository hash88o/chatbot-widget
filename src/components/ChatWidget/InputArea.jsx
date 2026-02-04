import React, { useState, useRef, useEffect } from 'react';

/**
 * Sticky input: textarea + send. Submit on Enter (no shift-enter).
 * Accessible label and focus management.
 */
export function InputArea({ onSend, disabled, placeholder }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="input-area">
      <label htmlFor="chat-input" className="sr-only">
        Type your message
      </label>
      <textarea
        id="chat-input"
        ref={inputRef}
        className="input-area__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type a message…'}
        disabled={disabled}
        rows={1}
        aria-label="Type your message"
        maxLength={2000}
      />
      <button
        type="button"
        className="input-area__send"
        onClick={handleSubmit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}
