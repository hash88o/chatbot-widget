/**
 * Mock conversation flow and responses.
 * Drives greeting → name → email → FAQ with graceful fallback.
 */

export const BOT_NAME = 'Support';

/** Initial greeting and first bot message */
export const GREETING = {
  text: "Hi — I'm here to help with anything about AmplifyEase.\nYou can ask a question or pick one of the options below.",
  quickReplies: ['Hours', 'Pricing', 'Contact support'],
};

/** FAQ triggers (lowercased) → bot response */
export const FAQ_MAP = {
  'hours': "We're available Monday–Friday, 9am–6pm (your timezone). Need something outside those hours? Leave a message and we'll get back to you.",
  'pricing': "We have a few plans to fit different needs. I can have someone send you our latest pricing—just share your email if you'd like that.",
  'contact': "You're talking to me right now! For anything I can't handle, I'll connect you with the team. What would you like to know?",
  'help': "I'm here for that. You can ask about hours, pricing, or how to get in touch. Or type your question and I'll do my best.",
  'hello': "Hello! How can I help you today?",
  'hi': "Hi! What can I do for you?",
  'thanks': "You're welcome! Anything else?",
  'thank you': "You're welcome! Anything else?",
  'bye': "Bye for now! Reach out anytime you need help.",
  'goodbye': "Bye for now! Reach out anytime you need help.",
};

/** Normalize user input for matching */
function normalize(input) {
  return (input || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Find first matching FAQ key (substring or exact) */
function findFaqAnswer(text) {
  const n = normalize(text);
  if (!n) return null;
  for (const [key, answer] of Object.entries(FAQ_MAP)) {
    if (n === key || n.includes(key)) return answer;
  }
  return null;
}

/**
 * Get next bot response from conversation state and user message.
 * @param {{ step: string, userName?: string, userEmail?: string }} state
 * @param {string} userMessage
 * @returns {{ text: string, quickReplies?: string[] } | null }
 */
export function getBotResponse(state, userMessage) {
  const msg = (userMessage || '').trim();
  const step = state?.step || 'greeting';

  if (step === 'greeting') {
    if (!msg) return { text: GREETING.text, quickReplies: GREETING.quickReplies };
    const faqFromGreeting = findFaqAnswer(msg);
    if (faqFromGreeting) {
      return {
        text: faqFromGreeting,
        quickReplies: [],
      };
    }
    return {
      text: `Nice to meet you, ${msg}. What's your email? (Optional—you can skip or type "skip".)`,
      quickReplies: ['Skip'],
    };
  }

  if (step === 'email') {
    if (!msg || normalize(msg) === 'skip') {
      return {
        text: "No problem. How can I help you today?",
        quickReplies: ['Hours', 'Pricing', 'Contact support'],
      };
    }
    if (msg.includes('@') && msg.includes('.')) {
      return {
        text: "Got it. What would you like to know?",
        quickReplies: ['Hours', 'Pricing', 'Contact support'],
      };
    }
    if (state.userName && msg === state.userName) {
      return {
        text: `Nice to meet you, ${msg}. What's your email? (Optional—you can skip or type "skip".)`,
        quickReplies: ['Skip'],
      };
    }
    return {
      text: "That doesn't look like an email. You can type a valid address or say \"skip\" to continue.",
      quickReplies: ['Skip'],
    };
  }

  if (step === 'chat') {
    const faq = findFaqAnswer(msg);
    if (faq) return { text: faq, quickReplies: [] };
    return {
      text: "I'm not sure about that one. A team member can follow up—would you like me to pass your question along?",
      quickReplies: ['Yes, please', 'No, thanks'],
    };
  }

  return { text: "How can I help you?", quickReplies: [] };
}

/**
 * Advance conversation step after user sends a message.
 */
export function advanceStep(state, userMessage) {
  const step = state?.step || 'greeting';
  const msg = (userMessage || '').trim();

  if (step === 'greeting' && msg) {
    const faqFromGreeting = findFaqAnswer(msg);
    if (faqFromGreeting) {
      return { ...state, step: 'chat' };
    }
    return { ...state, step: 'email', userName: msg };
  }
  if (step === 'email') {
    if (!msg || normalize(msg) === 'skip') return { ...state, step: 'chat' };
    if (msg.includes('@') && msg.includes('.')) return { ...state, step: 'chat', userEmail: msg };
    return state;
  }
  return state;
}

export { findFaqAnswer, normalize };
