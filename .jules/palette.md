## 2025-05-18 - Execution Feedback Accessibility
**Learning:** Dynamic feedback messages in single-page apps (like quiz results) are often missed by screen readers if not explicitly marked as live regions.
**Action:** Always wrap dynamic success/error messages in a container with `role="alert"` or `aria-live="assertive"` to ensure immediate announcement.

## 2025-05-18 - Card Accessibility Wrapping
**Learning:** Complex cards with internal buttons often trap focus or create redundant tab stops. Wrapping the entire card content in a single `<button>` is cleaner but requires explicit `focus-visible` styling to match the card's non-standard shape (e.g., `rounded-3xl`).
**Action:** When wrapping entire cards as buttons, always apply `focus-visible:ring-*` and `rounded-*` to the parent button to ensure the focus indicator hugs the card's actual geometry.
