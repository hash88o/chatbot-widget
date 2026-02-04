import React from 'react';

/**
 * Single message bubble — user (right, dark) vs bot (left, surface).
 * Multi-line safe. Timestamp is intentionally quiet and surfaces on hover (desktop).
 */
export function MessageBubble({ role, content, timestamp }) {
  const isUser = role === 'user';
  return (
    <div
      className={`message-bubble message-bubble--${isUser ? 'user' : 'bot'}`}
      role="article"
      aria-label={isUser ? 'Your message' : 'Support message'}
    >
      <div className="message-bubble__content">{content}</div>
      {timestamp && (
        <time className="message-bubble__time" dateTime={timestamp.toISOString()}>
          {formatTime(timestamp)}
        </time>
      )}
    </div>
  );
}

function formatTime(d) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(d);
}
