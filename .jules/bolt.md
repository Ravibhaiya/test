## 2025-02-21 - [ExecutionScreen: Memoized HTML Sanitization]
**Learning:** `dangerouslySetInnerHTML` with `DOMPurify.sanitize` inside the render loop runs on every re-render (e.g., keystrokes). For frequently updating components, this is an expensive synchronous operation.
**Action:** Always wrap `DOMPurify.sanitize` calls in `useMemo` when the input string is relatively stable (e.g., a question that doesn't change during answer input).
