document.addEventListener('DOMContentLoaded', () => {
    const SECURITY_KEY = 'security_verified';

    // Check if user is already verified in this session
    const checkSecurity = () => {
        const verified = sessionStorage.getItem(SECURITY_KEY);
        if (!verified) {
            showChallenge();
        }
    };

    const showChallenge = () => {
        // Generate random math problem (Goal: 2-digit result)
        // num1: 5-50, num2: 5-49 => Sum: 10-99
        let num1, num2, sum;
        do {
            num1 = Math.floor(Math.random() * 46) + 5;
            num2 = Math.floor(Math.random() * 45) + 5;
            sum = num1 + num2;
        } while (sum < 10 || sum > 99); // Ensure strictly 2 digits

        const html = `
            <div id="security-overlay" class="security-overlay">
                <div class="security-modal">
                    <div class="security-header">
                        <h2>Security Check</h2>
                        <p>Please solve this math problem to access the website.</p>
                    </div>
                    <div class="security-body">
                        <div class="math-problem">
                            <span id="num1">${num1}</span> + <span id="num2">${num2}</span> = ?
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

        const submitBtn = document.getElementById('security-submit');
        const input = document.getElementById('security-input');
        const errorMsg = document.getElementById('security-error');

        const verify = () => {
            if (parseInt(input.value) === sum) {
                // Correct
                sessionStorage.setItem(SECURITY_KEY, 'true');
                document.getElementById('security-overlay').remove();
                document.body.style.overflow = '';
            } else {
                // Incorrect
                errorMsg.classList.remove('hidden');
                input.value = '';
                input.focus();

                // Shake animation
                const modal = document.querySelector('.security-modal');
                modal.classList.add('shake');
                setTimeout(() => modal.classList.remove('shake'), 500);
            }
        };

        submitBtn.addEventListener('click', verify);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') verify();
        });

        // Focus input automatically
        setTimeout(() => input.focus(), 100);
    };

    checkSecurity();
});
