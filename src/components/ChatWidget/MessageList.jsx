import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

/**
 * Scrollable message area. Auto-scrolls to bottom on new messages or typing.
 */
export function MessageList({ messages, isTyping }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isTyping]);

  return (
    <div
      ref={listRef}
      className="message-list"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
      tabIndex={-1}
    >
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          role={m.role}
          content={m.content}
          timestamp={m.timestamp}
        />
      ))}
      {isTyping && (
        <div className="message-list__typing">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}
