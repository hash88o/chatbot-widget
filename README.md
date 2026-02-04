# Chatbot Widget

Production-grade, embeddable chat widget for any website. Calm, minimal, and accessible.

---

## Design decisions

### Aesthetic direction
- **Tone:** Calm, modern, professional — friendly but not playful. No “AI-looking” patterns (no purple gradients, no generic SaaS look).
- **Density:** Medium-light. 8pt spacing system and consistent vertical rhythm so the UI breathes without feeling empty.
- **Typography:** **Sora** for display/headings (subtle personality), **DM Sans** for body (high readability). Avoids overused fonts (Inter, Roboto, Arial) per project brief.
- **Color:** Neutral base (slate grays, white/surface) with a single strong accent (blue) for CTAs and highlights. All combinations meet WCAG AA.
- **Motion:** 200ms expand for open/close; transform + opacity only. All animations respect `prefers-reduced-motion: reduce` (disabled or instant).

### UX reasoning
- **Launcher:** Fixed bottom-right, circular, high contrast. Clear affordance (chat icon) and hover scale so it feels clickable and embedded, not like an ad.
- **Open/close:** Smooth expand (no layout jank), click-outside to close, Escape to close, focus moves into the dialog on open and back to the launcher on close.
- **Messages:** User bubbles right/dark, bot bubbles left/light. Multi-line and spacing so text never feels cramped. Quick replies are part of the conversation, not form controls.
- **Typing indicator:** Minimal animated dots before bot reply; animation off when reduced motion is preferred.
- **Flow:** Greeting → name → email (optional/skip) → open-ended chat with hardcoded FAQ and a graceful fallback for unknown questions.

### Design system
- **Tokens** live in `src/index.css`: color, spacing (8pt), typography, radius, motion, elevation. Semantic names (`--c-ink`, `--space-3`, `--duration-medium`). No magic numbers in components.
- **Components** are small and focused: Launcher, Header, MessageList, MessageBubble, TypingIndicator, QuickReplies, InputArea. Each has a single responsibility and clear props.

---

## How to run

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). The launcher appears bottom-right; open it to run through the conversation.

---

## How to embed the widget

### Option A: Same React app
Mount the widget anywhere in your tree:

```jsx
import { ChatWidget } from './components/ChatWidget';

<ChatWidget brandName="Your Company" />
```

### Option B: Build and embed on a static site
1. Build: `npm run build`
2. Host the built assets (e.g. `dist/`) and load them on your page:

```html
<div id="chat-widget-root"></div>
<script type="module" src="https://your-domain.com/assets/index-xxxxx.js"></script>
```

The bundle must mount React onto `#chat-widget-root` (or change `index.html`’s `#root` and the mount in `main.jsx` to a dedicated root used only for the widget).

### Option C: Copy the widget into your repo
Copy the following into your codebase and mount `ChatWidget` where you need it:

- `src/components/ChatWidget/` (all files)
- `src/hooks/useConversation.js`
- `src/data/conversation.js`
- Design tokens from `src/index.css` (the `:root` block and any variables used by the widget)

Then:

```jsx
import { ChatWidget } from './components/ChatWidget';

<ChatWidget brandName="Support" />
```

---

## Accessibility

- **Keyboard:** Launcher and all controls (close, quick replies, input, send) are focusable and operable by keyboard. Escape closes the widget and returns focus to the launcher.
- **Focus:** When the widget opens, focus moves to the first focusable element inside the dialog (close button). When it closes (Escape or click outside), focus returns to the launcher button.
- **Labels:** Buttons and the input have visible or screen-reader text (`aria-label` or associated `<label>`). The message list uses `role="log"` and `aria-live="polite"` for new messages; typing indicator uses `role="status"` and `aria-live="polite"`.
- **Contrast:** Text and controls meet WCAG AA. Accent is used together with shape/label, not as the only indicator.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` resets animation durations to 0 and disables decorative motion (e.g. typing dots, hover scale) so the experience stays functional.

---

## Mock conversation and states

- **Flow:** Greeting → ask name → ask email (optional; “skip” or valid email) → free chat. FAQ triggers (e.g. “hours”, “pricing”, “contact”) return hardcoded answers; unknown questions get a fallback and optional “Yes, please” / “No, thanks” for escalation.
- **Error state:** Sending the message `/error` triggers a mocked error to test the inline error UI.
- **States covered:** Idle (closed), open empty, bot typing, user typing, loading response, error, and normal conversation end/pause.

---

## File structure

```
src/
  index.css           # Design tokens + base + .sr-only
  main.jsx
  App.jsx             # Demo page + widget
  components/
    ChatWidget/
      ChatWidget.jsx   # Orchestrator
      ChatWidget.css
      Launcher.jsx
      Header.jsx
      MessageList.jsx
      MessageBubble.jsx
      TypingIndicator.jsx
      QuickReplies.jsx
      InputArea.jsx
      index.js
  hooks/
    useConversation.js
  data/
    conversation.js    # Mock flow + FAQ + getBotResponse
```

---

## Tech stack

- React 18 + Vite
- Plain CSS (no UI libraries); design tokens in CSS custom properties
- No backend; all bot responses are hardcoded in `src/data/conversation.js`
