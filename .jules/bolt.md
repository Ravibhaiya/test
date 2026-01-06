## 2025-02-21 - [ExecutionScreen: Memoized HTML Sanitization]
**Learning:** `dangerouslySetInnerHTML` with `DOMPurify.sanitize` inside the render loop runs on every re-render (e.g., keystrokes). For frequently updating components, this is an expensive synchronous operation.
**Action:** Always wrap `DOMPurify.sanitize` calls in `useMemo` when the input string is relatively stable (e.g., a question that doesn't change during answer input).

## 2025-02-21 - [Global: Allocation in Hot Path]
**Learning:** Repeatedly creating `new Uint32Array(1)` inside a frequently called utility function (`secureMathRandom`) creates unnecessary garbage collection overhead. Even small allocations add up in loops or hot paths (e.g., generating feedback particles).
**Action:** Reuse a module-level static buffer for synchronous operations where thread safety is guaranteed by the JS event loop.
