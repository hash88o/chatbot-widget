# Frontend Rules — UI/UX Principles & Strategies

> A single-file reference of modern, user-loved UI/UX rules used by top product teams. Practical, prescriptive, and ready to be applied in frontend repositories as design tokens, component guidelines, and code-ready rules.

---

## 1. Purpose & Philosophy

* **Design for clarity first.** Reduce cognitive load: make primary actions obvious and secondary actions subtle.
* **People over pixels.** Prioritize real user needs and context over visual cleverness.
* **Predictability + delight.** Interface must be predictable; micro-interactions provide delight when they reinforce understanding.
* **Performance = UX.** Fast load and smooth interaction are integral to perceived quality.

---

## 2. Design System Fundamentals

* **Design tokens** (atomic): color, spacing, typography, radii, shadows, elevation, z-index, motion. Keep them central JSON/Sass variables.
* **Component-first**: small reusable components (Button, Input, Card) with clear props and accessibility contracts.
* **Single source of truth**: token file + component library + documentation site (Storybook / docs).

**Example token JSON (minimal):**

```json
{
  "color": {"primary": "#0B69FF", "background": "#FFFFFF", "surface":"#F7F9FC", "danger":"#D92D20"},
  "radius": {"sm": "6px", "md":"12px", "lg":"20px"},
  "space": {"1":"4px","2":"8px","3":"16px","4":"24px","5":"40px"},
  "font": {"family":"Inter, system-ui, -apple-system","scale":{ "base":"16px", "lg":"18px"}}
}
```

---

## 3. Typography (rules & scale)

* **Readable system stack**: `Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`.
* **Type scale**: Use a 1.125–1.2 modular scale (e.g., 16 → 18 → 20 → 22.5 → 27) for consistent rhythm.
* **Line length**: 45–75 characters for body text; aim ~65 chars.
* **Line height**: 1.4–1.6 for body, 1.1–1.3 for headings.
* **Font weights**: limit to 3–4 weights (e.g., 400, 500, 600, 700) to reduce layout shift and file size.
* **Weight to meaning mapping**: `400` body, `500` emphasis, `600` button/cta, `700` headings.
* **Use variable fonts** where possible — reduces weight counts and enables fine typographic control.
* **Contrast for text**: meet WCAG AA (4.5:1 for normal text) and try AAA (7:1) for important content/branding.

**CSS snippet (base):**

```css
:root{ --font-family: 'Inter, system-ui, -apple-system'; --fs-base:16px; --lh-base:1.5 }
html{ font-size:16px }
body{ font-family:var(--font-family); font-size:var(--fs-base); line-height:var(--lh-base); color:#0f172a }
```

---

## 4. Color & Contrast

* **Brand vs UI colors**: limit brand accent colors (1–2). Use neutral palettes for UI (grays) and reserved semantic colors for states (success, warning, danger, info).
* **Accessible contrast**:

  * Body text: min 4.5:1 (WCAG AA).
  * Large text (≥18pt/14pt bold): min 3:1.
  * UI components (icons, subtle text): ensure at least 3:1 when they convey meaning.
* **Use color only as one means of communication** — always pair with icons/labels for critical states.
* **High-DPI and color management**: Test on sRGB and wide-gamut displays; avoid relying on subtle color differences.
* **Color tokens example**:

```css
--c-bg: #FFFFFF; --c-surface: #F8FAFC; --c-ink: #0F172A; --c-primary: #0B69FF; --c-primary-600:#0853cc; --c-success: #16A34A; --c-danger: #D92D20;
```

* **Dark mode strategy**: invert neutrals, keep accents consistent, tweak elevation & shadows. Use semantic tokens (`surface-primary`, `text-primary`) that switch values with theme.

---

## 5. Spacing & Layout (Whitespace)

* **8pt system**: prefer an 8px base grid (or 4px micro increments). Consistent spacing across components.
* **Vertical rhythm**: spacing tied to type scale; margins and paddings should align to token values.
* **Container widths**: responsive breakpoints with container max-widths (e.g., 100%, 720px, 960px, 1140px, 1320px).
* **Gutters**: increase padding on larger screens: small (16px), medium (24px), large (40px).
* **Use whitespace as hierarchy**: increase spacing around primary CTAs and content clusters.

---

## 6. Shapes, Corners, and Visual Language

* **Corner system**: small radius for inputs/cards (6–8px), large radius for friendly products (12–20px). Keep consistent per brand personality.
* **Elevation & shadows**: use 2–3 subtle elevation levels (e.g., card, raised card, modal). Avoid heavy drop shadows that reduce clarity.
* **Borders**: thin (1px or hairline) with subtle color — prefer `rgba(15,23,42,0.06)` instead of stark gray.
* **Iconography**: single visual system (outline vs filled). Use 16/20/24px grid aligned icons.

---

## 7. Motion & Animation

**Principles**

* Motion should guide attention and explain state changes — not distract.
* Prefer functional animations: transitions, micro-interactions, skeleton loaders, and motion that signals affordances.
* Respect reduced-motion user preference: support `prefers-reduced-motion: reduce`.

**Timing & easing**

* Short: 80–120ms for instantaneous feels (button press).
* Medium: 160–240ms for common transitions (open/close panels).
* Long: 300–500ms for complex sequences (modals with content).
* Easing: use `cubic-bezier` like `(.2, .9, .2, 1)` for subtle springy feeling or standard `ease-out` for natural deceleration.

**Motion types**

* **Fade**: opacity changes for non-layout elements.
* **Scale**: subtle scaling for press feedback (0.98–0.96).
* **Translate**: movement to show entering/exiting.
* **Shared element transitions**: for complex navigation, animate shared elements for continuity.

**Implementation tips**

* Use CSS transitions for simple transforms & opacity (transform + opacity only — avoid animating layout properties like `width`/`height` when possible).
* Use `will-change: transform, opacity` carefully for performance.
* Prefer `transform: translateZ(0)` for GPU compositing when necessary.

**Example CSS:**

```css
.btn{ transition: transform 160ms cubic-bezier(.2,.9,.2,1), box-shadow 160ms; }
.btn:active{ transform: scale(.985) }
@media (prefers-reduced-motion: reduce){ .btn{ transition: none; transform: none }}
```

---

## 8. Interaction & Feedback

* **Immediate feedback**: clicks/touches must provide instant visual response (ripple, scale, highlight) within 80ms to feel responsive.
* **Loading states**: skeleton content for large sections, inline progress for small tasks, spinners only for short waits (<2s) — otherwise use determinable progress.
* **Disabled vs loading**: visually different treatments; loading may preserve affordance but show spinner inside.
* **Error handling**: inline validation with clear, friendly copy and suggestions to fix.
* **Undo affordances**: for destructive actions, offer undo (toast/snackbar) for transient reversibility.

---

## 9. Forms & Input UX

* **Labels**: Visible labels above inputs (top-aligned) for faster scanning on mobile.
* **Placeholder**: only as hint, never as a replacement for a label.
* **Help text**: short helper text beneath input; show constraints (e.g., password strength) before submit.
* **Validation**: inline, per-field, and summarized server errors. Avoid blocking the user without clear reason.
* **Keyboard / accessibility**: logical tabindex, `aria-*` attributes, role attributes for complex widgets.

---

## 10. Accessibility (A11y)

* **WCAG as baseline**: aim for AA; aim higher for critical user flows.
* **Semantic HTML**: buttons, forms, headings, lists. Avoid using generic divs for controls.
* **Contrast & focus**: visible focus state for interactive elements (not just outline: none). Support keyboard navigation.
* **Screen reader**: ARIA roles only when semantics are insufficient; test with NVDA/VoiceOver/JAWS.
* **Color blind friendly**: never convey meaning by color alone.
* **Reduce motion**: obey `prefers-reduced-motion` and provide alternatives.

---

## 11. Microcopy & Tone

* **Clear, action-oriented labels**: Buttons: `Save draft` vs `Submit` — be specific.
* **Error language**: short, helpful, non-blaming. Show cause and action: `Couldn't save. Check your connection and try again.`
* **Tooltips & helper copy**: concise; reveal on hover/focus; avoid long scrolling tooltips.

---

## 12. Patterns & Components (Rules)

* **Primary CTA**: high contrast, clear label, consistent placement.
* **Secondary actions**: subdued styles, lower emphasis.
* **Card patterns**: use for groupings with consistent padding and image aspect ratios.
* **Navigation**: clear hierarchy, visible current state, mobile-friendly (hamburger, bottom nav depending on product).
* **Pagination vs infinite scroll**: prefer pagination for discoverability/search; infinite scroll for feed-like experiences with clear boundaries and “jump to top” affordance.

---

## 13. Performance & Perceived Performance

* **Critical rendering path**: minimize CSS/JS blocking; inline critical CSS; defer non-critical JS.
* **Image optimization**: responsive `srcset`, modern formats (AVIF/WebP), lazy-loading, proper aspect-ratio placeholders.
* **Fonts**: font-display: swap; preload only necessary weights; subset where possible.
* **Reduce layout shift**: reserve space for images, ads, iframes; specify width/height or `aspect-ratio`.
* **Bundle strategy**: component-level code splitting, lazy load modals & heavy components.

---

## 14. Design Review & Research-Backed Practices

* **Measure**: run qualitative tests (usability tests, five users) and quantitative (analytics, heatmaps, funnel analysis).
* **Hypothesis-driven**: A/B test only if you have enough traffic; otherwise iterate by qualitative feedback.
* **Observe real users**: session recordings, moderated usability tests, diary studies for long-term flows.

---

## 15. Handoff & Collaboration

* **Tokens + code**: export design tokens (JSON) to devs; keep components in Storybook with usage examples.
* **Documentation**: purpose, do/don't, accessibility notes, responsive behaviors, edge cases.
* **Versioning**: tag releases of design system; document breaking changes.

---

## 16. Measurement & KPIs

* **Engagement metrics**: CTR on CTAs, time-to-first-action, retention.
* **Performance metrics**: FCP, TTFB, LCP, CLS.
* **Usability metrics**: task success rate, error rate, time on task, SUS score.

---

## 17. Practical Rules Checklist (copy into PR template)

* [ ] Tokens present and named semantically
* [ ] Typography scale applied and responsive
* [ ] Colors meet contrast ratios (check automated tests)
* [ ] All interactions have accessible focus
* [ ] Motion respects `prefers-reduced-motion`
* [ ] Images use `srcset` and lazy-loading
* [ ] Forms have inline validation and helpful microcopy
* [ ] Component documented in Storybook with responsive examples
* [ ] Accessibility audit run (axe/pa11y) and issues tracked
* [ ] Performance tested (Lighthouse) and regressions fixed

---

## 18. Code Snippets & Examples

**Design token import (JS / CSS variables):**

```js
// tokens.js (exported from design tool)
export const colors = {
  primary: '#0B69FF',
  'primary-600':'#0853cc',
  bg: '#fff',
  'text-ink':'#0F172A'
}
```

**Accessible button component (React pseudo):**

```jsx
function Button({children, variant='primary', disabled, loading, ...rest}){
  return (
    <button
      className={`btn btn--${variant}`}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner aria-hidden/> : null}
      <span>{children}</span>
    </button>
  )
}
```

---

## 19. Tools & Resources to Maintain Quality

* Storybook (component docs), Chromatic (visual regression), Figma/Sketch/Adobe XD for design, Tokens Studio, Lighthouse, axe-core, pa11y, Percy/Chromatic for visual testing, usertesting.com for moderated testing.

---

## 20. Advanced Topics (for product teams)

* **Design for personalization**: tokens that can be swapped per user settings (font-size, high-contrast, spacing).
* **Content design**: build editorial systems that inform UI constraints (e.g., headline length limits).
* **Internationalization**: RTL support, locale-aware number/date formatting, type fallback for CJK scripts.
* **Design ops**: governance, contribution guidelines, automated linting of tokens and components.

---

## 21. Final Advice

Ship a minimal, consistent, and accessible core. Iterate quickly with research and metrics. Keep the design system as code-first as possible and treat components as tests: if a component is hard to use in code, it will be hard for users.

---

### Appendix: Quick token cheat-sheet

```
--space-1: 4px
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 40px
--radius-sm: 6px
--radius-md:12px
--radius-lg:20px
--fs-0:12px
--fs-1:14px
--fs-2:16px
--fs-3:18px
--fs-4:22px
--c-primary:#0B69FF
--c-bg:#FFFFFF
--c-surface:#F7F9FC
```


Design Thinking → BOLD aesthetic direction

Purpose

Tone (explicitly choosing an extreme)

Differentiation (“one unforgettable thing”)

The CRITICAL note about intentionality

Frontend Aesthetics Guidelines (selective)

Typography (especially avoiding generic fonts + pairing display/body)

Motion (page-load orchestration > random micro-interactions)

Spatial Composition (asymmetry, overlap, grid-breaking)

Backgrounds & Visual Details (textures, grain, depth)

The hard constraint

The NEVER use generic AI aesthetics paragraph (this is gold — keep it)

Complexity ↔ Aesthetic alignment rule

“Match implementation complexity to the aesthetic vision”
---


