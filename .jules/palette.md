## 2025-05-18 - Execution Feedback Accessibility
**Learning:** Dynamic feedback messages in single-page apps (like quiz results) are often missed by screen readers if not explicitly marked as live regions.
**Action:** Always wrap dynamic success/error messages in a container with `role="alert"` or `aria-live="assertive"` to ensure immediate announcement.

## 2025-05-18 - Card Accessibility Wrapping
**Learning:** Complex cards with internal buttons often trap focus or create redundant tab stops. Wrapping the entire card content in a single `<button>` is cleaner but requires explicit `focus-visible` styling to match the card's non-standard shape (e.g., `rounded-3xl`).
**Action:** When wrapping entire cards as buttons, always apply `focus-visible:ring-*` and `rounded-*` to the parent button to ensure the focus indicator hugs the card's actual geometry.

## 2025-05-18 - Keyboard Navigation Visibility
**Learning:** Removing default focus rings (`focus:outline-none`) creates a major accessibility barrier for keyboard users.
**Action:** Always pair `focus:outline-none` with explicit `focus-visible:ring-*` styles to maintain a clean UI for mouse users while ensuring accessibility for keyboard navigation.

## 2025-05-18 - Input Label Association
**Learning:** Inputs (like timers) often rely on proximity to text ("Timer (seconds)") without programmatic association, confusing screen readers.
**Action:** Use `id` on the descriptive text and `aria-labelledby` on the input to explicitly link them without changing the visual layout.

## 2025-05-18 - Config Error Accessibility
**Learning:** Inconsistent error handling across configuration screens (some missing `role="alert"`) creates a fragmented experience for screen reader users, where some errors are announced and others are silent.
**Action:** Audit all similar screens when fixing one instance to ensure the pattern is applied consistently across the entire feature set.
