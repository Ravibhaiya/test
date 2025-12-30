# Palette's Journal

## 2025-05-18 - Execution Feedback Accessibility
**Learning:** Dynamic feedback messages in single-page apps (like quiz results) are often missed by screen readers if not explicitly marked as live regions.
**Action:** Always wrap dynamic success/error messages in a container with `role="alert"` or `aria-live="assertive"` to ensure immediate announcement.
