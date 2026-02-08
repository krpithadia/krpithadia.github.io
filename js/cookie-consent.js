document.addEventListener('DOMContentLoaded', () => {
    const COOKIE_CONSENT_KEY = 'cookie_consent';
    const GA_ID = 'G-5XEWY0K61M'; // Your Google Analytics ID

    // Check if user has already made a choice
    const checkConsent = () => {
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            showModal();
        } else {
            const preferences = JSON.parse(consent);
            if (preferences.performance) {
                loadGoogleAnalytics();
            }
        }
    };

    // Inject HTML for Blocking Modal
    const showModal = () => {
        const html = `
            <div id="consent-overlay" class="consent-overlay">
                <div id="consent-modal" class="consent-modal">
                    <div class="consent-header">
                        <h2>Cookie Preferences</h2>
                        <p>We need your consent to proceed. We use cookies to improve your experience and analyze website traffic. Please choose your preferences.</p>
                    </div>
                    
                    <div id="consent-options" class="consent-options hidden">
                        <div class="cookie-option">
                            <div class="option-header">
                                <label class="toggle-switch">
                                    <input type="checkbox" checked disabled>
                                    <span class="slider"></span>
                                </label>
                                <span class="option-title">Essential (Required)</span>
                            </div>
                            <p>Necessary for the website to function properly. These cannot be disabled.</p>
                        </div>
                        <div class="cookie-option">
                            <div class="option-header">
                                <label class="toggle-switch">
                                    <input type="checkbox" id="consent-performance">
                                    <span class="slider round"></span>
                                </label>
                                <span class="option-title">Performance (Analytics)</span>
                            </div>
                            <p>Help us understand how visitors interact with the website.</p>
                        </div>
                    </div>

                    <div class="consent-actions">
                        <button id="accept-all" class="btn btn-primary">Accept All & Continue</button>
                        <button id="customize" class="btn btn-secondary">Customize Settings</button>
                        <button id="save-preferences" class="btn btn-primary hidden">Save & Continue</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
        // Prevent scrolling while modal is open
        document.body.style.overflow = 'hidden';
        attachEventListeners();
    };

    const attachEventListeners = () => {
        const overlay = document.getElementById('consent-overlay');
        const acceptAllBtn = document.getElementById('accept-all');
        const customizeBtn = document.getElementById('customize');
        const saveBtn = document.getElementById('save-preferences');
        const optionsDiv = document.getElementById('consent-options');

        acceptAllBtn.addEventListener('click', () => {
            saveConsent({ essential: true, performance: true });
            closeModal(overlay);
        });

        customizeBtn.addEventListener('click', () => {
            optionsDiv.classList.remove('hidden');
            customizeBtn.classList.add('hidden');
            acceptAllBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
        });

        saveBtn.addEventListener('click', () => {
            const performance = document.getElementById('consent-performance').checked;
            saveConsent({ essential: true, performance: performance });
            closeModal(overlay);
        });
    };

    const saveConsent = (preferences) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
        if (preferences.performance) {
            loadGoogleAnalytics();
        }
    };

    const closeModal = (overlay) => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.remove();
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    };

    const loadGoogleAnalytics = () => {
        if (window.gaLoaded) return; // Prevent double loading

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', GA_ID);

        window.gaLoaded = true;
        console.log('Google Analytics Loaded');
    };

    checkConsent();
});
