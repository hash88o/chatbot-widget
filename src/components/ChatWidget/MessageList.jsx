import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

/**
 * Scrollable message area. Auto-scrolls to bottom on new messages or typing.
 */
export function MessageList({ messages, isTyping }) {
  const listRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const threshold = 32; // px from bottom using spacing token scale
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isAtBottomRef.current = distanceFromBottom <= threshold;
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (!isAtBottomRef.current) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isTyping]);

  return (
    <div
      ref={listRef}
      className="message-list"
      onScroll={handleScroll}
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
