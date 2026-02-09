# Security Audit Report

**Date**: 2026-02-09
**Target**: `krpithadia.github.io` (GitHub Pages)

## 1. Executive Summary

This website currently implements a "Defense in Depth" strategy appropriate for a static portfolio site. While complete immunity from sophisticated attackers is impossible in a client-side environment, the current measures significantly raise the bar for automated bots and script kiddies.

## 2. Implemented Measures

### A. Client-Side Math Challenge (The Gatekeeper)

- **Mechanism**: A JavaScript-based modal intercepts the user session.
- **Bot Whitelist**: **[NEW]** Explicitly allows known Search Engine and AI bots (Googlebot, ChatGPT, etc.) to bypass the challenge by checking `User-Agent`. This ensures SEO indexability while blocking generic script attackers.

- **Hardening**:
  - **Logic Obfuscation**: The verification logic in `security-challenge.js` uses variable renaming (`_0x1a`, `_c`) and bitwise operations (`^`) effectively hiding the cleartext sum from a casual glance.
  - **Honeypot Trap**: An invisible input field (`.hp-field`) waits for bots. Since bots often blindly fill all form fields, filling this field triggers an immediate block.
- **Efficacy**: High against generic crawlers and basic script bots. Low against targeted, human-led attacks.

### B. Security Headers (The Shield)

- **Content-Security-Policy (CSP)**: Strict allowlist prevents loading malicious scripts from external domains.
- **Permissions-Policy**: Explicitly disables hardware access (Camera, Mic), reducing the attack surface.
- **Referrer-Policy**: `strict-origin-when-cross-origin` protects user privacy.

## 3. Known Limitations & Residual Risk

### "Client-Side Trust" Issue

**Risk**: High
**Description**: Since verification happens in the user's browser (GitHub Pages has no backend), a knowledgeable attacker can:

1. Open Developer Tools (F12).
2. Manually set `sessionStorage.setItem('security_verified', '...')`.
3. Modify the HTML to delete the overlay.

**Mitigation**: The obfuscation makes step 1 annoying. There is no fix for step 2/3 on a static site without an external authentication server (e.g., Auth0, Firebase), which would degrade UX for a portfolio.

## 4. Recommendations

The current setup provides excellent protection for a **Portfolio Website**.

- **No confidential data** is stored on the site, so the risk of a breach is minimal (reputational only).
- The **Math CAPTCHA** effectively stops low-effort DDoS or spam bots.

**Status**: **SECURE (for intended purpose)**
