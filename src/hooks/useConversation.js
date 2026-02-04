import { useState, useCallback } from 'react';
import {
  getBotResponse,
  advanceStep,
  GREETING,
} from '../data/conversation';

const initialConversationState = { step: 'greeting' };

/**
 * Manages conversation state, messages, and bot replies.
 * Handles: greeting → name → email → chat with FAQ and fallback.
 */
export function useConversation() {
  const [state, setState] = useState(initialConversationState);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const addMessage = useCallback((role, content, quickReplies = []) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${role}`,
        role,
        content,
        quickReplies,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const sendMessage = useCallback(
    (text, quickRepliesUsed = []) => {
      const trimmed = (text || '').trim();
      if (!trimmed) return;

      setError(null);
      addMessage('user', trimmed);

      const nextState = advanceStep(state, trimmed);
      setState(nextState);

      setIsTyping(true);

      // Simulate network delay (160–320ms)
      const delay = 160 + Math.min(160, Math.random() * 160);
      setTimeout(() => {
        setIsTyping(false);
        if (trimmed.toLowerCase() === '/error') {
          setError('Something went wrong. Please try again.');
          return;
        }
        const reply = getBotResponse(nextState, trimmed);
        if (reply && reply.text) {
          addMessage('bot', reply.text, reply.quickReplies || []);
        } else {
          setError('Something went wrong. Please try again.');
        }
      }, delay);
    },
    [state, addMessage]
  );

  const startConversation = useCallback(() => {
    if (messages.length > 0) return;
    addMessage('bot', GREETING.text, GREETING.quickReplies || []);
  }, [messages.length, addMessage]);

  const resetConversation = useCallback(() => {
    setState(initialConversationState);
    setMessages([]);
    setIsTyping(false);
    setError(null);
  }, []);

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    startConversation,
    resetConversation,
    conversationState: state,
  };
}
