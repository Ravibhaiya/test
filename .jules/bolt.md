## 2025-02-21 - [ExecutionScreen: VirtualKeyboard Stability]
**Learning:** Conditional rendering of heavy components (like a keyboard) coupled with state-dependent callbacks causes unnecessary unmounting/remounting and prop instability, defeating `React.memo`.
**Action:** Use CSS visibility (`hidden` class) to toggle visibility instead of conditional rendering, and use `useRef` to access state in event handlers without adding them to dependency arrays. This keeps the component mounted and the props stable.
