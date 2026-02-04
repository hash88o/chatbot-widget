import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Launcher } from './Launcher';
import { Header } from './Header';
import { MessageList } from './MessageList';
import { QuickReplies } from './QuickReplies';
import { InputArea } from './InputArea';
import { useConversation } from '../../hooks/useConversation';
import './ChatWidget.css';

const DEFAULT_BRAND = 'Support';

/**
 * Embeddable chat widget: launcher + window.
 * Manages open/close, outside click, focus, and conversation flow.
 */
export function ChatWidget({ brandName = DEFAULT_BRAND }) {
  const [isOpen, setIsOpen] = useState(false);
  const windowRef = useRef(null);

  const {
    messages,
    isTyping,
    error,
    sendMessage,
    startConversation,
  } = useConversation();

  const lastBotMessage = messages.filter((m) => m.role === 'bot').pop();
  const quickReplies = lastBotMessage?.quickReplies ?? [];

  const open = useCallback(() => {
    setIsOpen(true);
    startConversation();
  }, [startConversation]);

  const close = useCallback(() => setIsOpen(false), []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  const handleQuickReply = useCallback(
    (label) => {
      sendMessage(label, [label]);
    },
    [sendMessage]
  );

  const launcherRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e) {
      if (windowRef.current && !windowRef.current.contains(e.target) && !launcherRef.current?.contains(e.target)) {
        close();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  // Escape to close; return focus to launcher
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        close();
        launcherRef.current?.querySelector('button')?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // When opening, move focus into window (first focusable)
  useEffect(() => {
    if (!isOpen || !windowRef.current) return;
    const focusable = windowRef.current.querySelector(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  }, [isOpen]);

  return (
    <>
      <div ref={launcherRef}>
        <Launcher onClick={toggle} isOpen={isOpen} aria-label={isOpen ? 'Close chat' : 'Open chat'} />
      </div>
      {isOpen && (
        <div
          ref={windowRef}
          className="chat-window"
          role="dialog"
          aria-label="Chat with support"
          aria-modal="true"
        >
          <Header brandName={brandName} onClose={close} />
          <div className="chat-window__body">
            <MessageList messages={messages} isTyping={isTyping} />
            {error && (
              <div className="chat-window__error" role="alert">
                {error}
              </div>
            )}
            {quickReplies.length > 0 && (
              <QuickReplies
                options={quickReplies}
                onSelect={handleQuickReply}
                disabled={isTyping}
              />
            )}
            <InputArea
              onSend={sendMessage}
              disabled={isTyping}
              placeholder="Type a message…"
            />
          </div>
        </div>
      )}
    </>
  );
}
