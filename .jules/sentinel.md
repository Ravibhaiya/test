# Sentinel Journal 🛡️

## 2025-02-12 - Content Security Policy & XSS Prevention
**Vulnerability:** Identified usage of `dangerouslySetInnerHTML` in `ExecutionScreen.tsx` for rendering MathML/HTML questions. While the current data source is internal, this pattern presents a risk if data sources change or become untrusted.
**Learning:** React's protection against XSS is bypassed by `dangerouslySetInnerHTML`. In "static export" Next.js apps deployed to Capacitor, we cannot rely on server-side headers.
**Prevention:** Implemented a strict Content Security Policy (CSP) via `<meta>` tag. This mitigates XSS risks by restricting valid sources for scripts, styles, and other resources, providing a defense-in-depth layer even if injection occurs.

## 2025-02-13 - CSP Hardening
**Vulnerability:** Initial CSP configuration was permissive regarding connections, workers, and manifests, relying on default fallbacks which might be too loose or ambiguous across different environments.
**Learning:** Even client-side apps should explicitly define all CSP directives to prevent potential attack vectors like malicious web workers or exfiltration via `connect-src` if a script injection vulnerability were found.
**Prevention:** Enhanced the CSP in `src/app/layout.tsx` to explicitly restrict `connect-src`, `worker-src`, `manifest-src`, and `frame-src` to 'self'. Added `upgrade-insecure-requests` for production builds to enforce HTTPS.

## 2025-02-14 - DOMPurify Allow-list
**Vulnerability:** The previous `DOMPurify` configuration used `USE_PROFILES: { html: true }`, which is permissive and enables a broad set of HTML tags, potentially increasing the attack surface if malicious content were ever introduced.
**Learning:** Security by design means adhering to the "Principle of Least Privilege". We should only enable the specific tags required for the application's functionality (MathML and basic text formatting).
**Prevention:** Replaced the broad `html` profile with a strict `ALLOWED_TAGS` list in `ExecutionScreen.tsx`. This explicitly whitelists only necessary tags (`math`, `mrow`, `mfrac`, `mn`, `mo`, `sup`, `sub`, basic formatting, and common structure like `ul/li/table`), rejecting all others.
