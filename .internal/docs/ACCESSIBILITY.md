Accessibility notes
===================

Goals
-----
- Achieve AA contrast for body and important labels
- Ensure keyboard navigability of the topology canvas and timeline
- Provide visible focus states for interactive elements

What we added
-------------
- `keyboard-a11y.js` to make SVG nodes focusable and activatable via Enter/Space.
- Visible outline/focus styles in `styles.css` for anchors, buttons, and SVG nodes.
- A functional skip link to jump to main content.

Next steps
----------
- Run automated contrast checks (e.g., axe, Lighthouse) and address low-contrast labels.
- Add `aria-label` and `aria-describedby` where the visual meaning isn't conveyed by text nodes.
- Validate with keyboard-only navigation and a screen reader (NVDA / VoiceOver).
