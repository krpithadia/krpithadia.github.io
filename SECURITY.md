# Security Policy

## Supported Versions

As this is a static website hosted on GitHub Pages, "versions" generally refer to the current deployment. We always recommend viewing the latest version of the site.

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to **[Insert Email Here]**. All security vulnerabilities will be promptly addressed.

## Security Features

This website implements several security measures to protect users and the integrity of the site:

### 1. Client-Side Security Challenge (Math CAPTCHA)

To mitigate automated bot traffic and ensure human interaction, a mandatory Math Challenge is implemented.

- **Mechanism**: A JavaScript-based modal asks a random addition question (e.g., "45 + 12 = ?") on the first visit.
- **Validation**: The user must enter the correct sum to access the site.
- **Persistence**: Verification is stored in `sessionStorage` and persists only for the duration of the browser session.

### 2. Security Headers (Meta Tags)

Strict security headers are enforced via HTML `<meta>` tags to prevent Cross-Site Scripting (XSS) and other attacks.

- **Content-Security-Policy (CSP)**:
  - `default-src 'self'`: Only allow content from the same origin by default.
  - `script-src`: Allows scripts from `self` and `https://www.googletagmanager.com`.
  - `style-src`: Allows styles from `self` and `https://fonts.googleapis.com`.
  - `font-src`: Allows fonts from `self` and `https://fonts.gstatic.com`.
  - `img-src`: Allows images from `self`, `data:` (base64), and `https://www.google-analytics.com`.
  - `connect-src`: Allows connections to `self` and `https://www.google-analytics.com`.
  - `object-src 'none'`: Blocks plugins like Flash.

- **Referrer-Policy**: `strict-origin-when-cross-origin`.
  - Protects user privacy by not sending the full URL as a referrer when clicking external links.

- **Permissions-Policy**:
  - Disables sensitive browser features: `geolocation`, `camera`, `microphone`, `payment`.

## Repository Security

- **No Secrets**: This repository should not contain any API keys, tokens, or private credentials.
- **Dependabot**: Dependabot is enabled to scan for vulnerabilities in dependencies (if any).
