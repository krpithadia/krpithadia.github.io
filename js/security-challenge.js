/*
 * Security Challenge - Obfuscated & Hardened
 * Contains Anti-Bot logic.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Obfuscated Variable Names
    const _0x1a = 'security_verified'; // Storage Key
    const _0x2b = 'hp_field_check';    // Honeypot ID part

    // Bot Whitelist (SEO & AI Friendly)
    const _botCheck = () => {
        const ua = navigator.userAgent.toLowerCase();
        const bots = [
            'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baidu', 'yandex', // Search Engines
            'twitterbot', 'facebookexternalhit', 'linkedinbot', 'pinterest', 'slackbot', // Social
            'whatsapp', 'telegrambot', 'discordbot', // Messaging
            'gptbot', 'chatgpt-user', 'openai', 'anthropic', 'claude', 'perplexity', 'ccbot' // AI
        ];
        return bots.some(bot => ua.includes(bot));
    };

    // Check Verification
    const _0x3c = () => {
        // 1. Allow Bots (Bypass)
        if (_botCheck()) {
            console.log('Security: Authorized Bot Detected. Granting Access.');
            return;
        }

        // 2. Check Human Session
        if (!sessionStorage.getItem(_0x1a)) {
            _0x4d(); // Show Challenge
        }
    };

    // Show Challenge Logic
    const _0x4d = () => {
        // Math Logic: a + b = c
        // Easy Mode: 2-digit (10-50) + 1-digit (1-9)
        let _a, _b, _c;
        _a = Math.floor(Math.random() * 41) + 10; // 10 to 50
        _b = Math.floor(Math.random() * 9) + 1;   // 1 to 9
        _c = _a + _b;

        // Honeypot Field (Hidden from humans)
        const _hp = `<input type="text" id="${_0x2b}" class="hp-field" autocomplete="off" tabindex="-1">`;

        const html = `
            <div id="security-overlay" class="security-overlay">
                <div class="security-modal">
                    ${_hp} 
                    <div class="security-header">
                        <h2>Security Check</h2>
                        <p>Please solve this math problem to access the website.</p>
                    </div>
                    <div class="security-body">
                        <div class="math-problem">
                            <span id="v1">${_a}</span> + <span id="v2">${_b}</span> = ?
                        </div>
                        <div class="input-group">
                            <input type="number" id="security-input" placeholder="??" maxlength="2" inputmode="numeric">
                            <button id="security-submit" class="btn btn-primary">Verify</button>
                        </div>
                        <p id="security-error" class="error-msg hidden">Incorrect. Please try again.</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        document.body.style.overflow = 'hidden';

        const _btn = document.getElementById('security-submit');
        const _in = document.getElementById('security-input');
        const _err = document.getElementById('security-error');
        const _trap = document.getElementById(_0x2b);

        const _v = () => {
            // 1. Honeypot Check (Bot Trap)
            if (_trap.value.length > 0) {
                // Determine it's a bot -> Infinite Loop / Block
                alert('Security Violation: Automated Access Detected.');
                return;
            }

            // 2. Logic Check
            // Use indirect comparison
            if ((parseInt(_in.value) ^ _c) === 0) {
                // Correct
                sessionStorage.setItem(_0x1a, btoa('verified_' + Date.now())); // Store slightly obfuscated value
                document.getElementById('security-overlay').remove();
                document.body.style.overflow = '';
            } else {
                // Incorrect
                _err.classList.remove('hidden');
                _in.value = '';
                _in.focus();

                const m = document.querySelector('.security-modal');
                m.classList.add('shake');
                setTimeout(() => m.classList.remove('shake'), 500);
            }
        };

        _btn.addEventListener('click', _v);
        _in.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') _v();
        });

        setTimeout(() => _in.focus(), 100);
    };

    _0x3c();
});
