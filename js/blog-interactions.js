document.addEventListener('DOMContentLoaded', () => {
    // Reveal Reflection Interaction
    const revealBtn = document.getElementById('reveal-reflection');
    if (revealBtn) {
        revealBtn.addEventListener('click', function () {
            const content = document.getElementById('reflection-content');
            if (content) {
                content.classList.toggle('hidden');
                this.textContent = content.classList.contains('hidden') ? 'Share Your Thoughts' : 'Close Reflection';
            }
        });
    }

    // Submit Reflection Interaction
    const submitBtn = document.getElementById('submit-reflection');
    if (submitBtn) {
        submitBtn.addEventListener('click', function () {
            const input = document.getElementById('reflection-input');
            const msg = document.getElementById('saved-msg');
            if (input && msg && input.value.trim()) {
                msg.classList.remove('hidden');
                input.value = '';
                setTimeout(() => {
                    msg.classList.add('hidden');
                }, 3000);
            }
        });
    }

    // Like Button Interaction
    const likeBtn = document.getElementById('like-post');
    if (likeBtn) {
        let likes = parseInt(document.getElementById('like-count').textContent) || 0;
        likeBtn.addEventListener('click', function () {
            likes++;
            const countSpan = document.getElementById('like-count');
            if (countSpan) countSpan.textContent = likes;

            this.classList.add('liked');
            this.style.transform = 'scale(1.2)';
            setTimeout(() => this.style.transform = 'scale(1)', 200);
        });
    }

    // Fade-in Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
