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

## 2025-02-21 - Android Manifest Hardening
**Vulnerability:** The Android application was configured with `android:allowBackup="true"`, allowing potentially sensitive application data (like local storage) to be extracted via `adb backup` by anyone with physical access or malware on the same device. Additionally, cleartext traffic was not explicitly disabled.
**Learning:** Default Android configurations often prioritize convenience (backups) over strict security. Explicitly disabling these features is crucial for apps that do not intend to share data or state via standard backup mechanisms, especially when local storage is used for sensitive config.
**Prevention:** Modified `AndroidManifest.xml` to set `android:allowBackup="false"` and `android:usesCleartextTraffic="false"`. This prevents data extraction via backup tools and ensures the app fails securely if it attempts to make insecure HTTP connections.

## 2025-02-27 - Timer Input Validation
**Vulnerability:** Configuration screens allowed users to input negative numbers or excessively large values for the practice timer. This led to potential Denial of Service (DoS) in the `TimerBar` component (immediate loop) or UI overflow/performance issues.
**Learning:** Input fields with `type="number"` do not automatically prevent negative values from being processed by JavaScript `parseInt`. Explicit validation and clamping are necessary to protect internal logic and UI state from invalid user inputs.
**Prevention:** Implemented a `validateTimerInput` utility in `src/lib/security.ts` that enforces a positive integer range (0-3600 seconds). Applied this validator across all configuration screens to sanitize inputs before updating state or local storage.
