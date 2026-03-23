document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded');

    // Burger Menu Toggle
    const burgerMenu = document.querySelector('.burger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (burgerMenu && mainNav) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Blog Load More Logic
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.getElementById('load-more-blogs');
    const MAX_VISIBLE_BLOGS = 9;

    if (blogCards.length > 0 && loadMoreBtn) {
        // Initially hide blogs beyond the limit
        blogCards.forEach((card, index) => {
            if (index >= MAX_VISIBLE_BLOGS) {
                card.classList.add('hidden');
                card.classList.remove('fade-in'); // Prevent intersection observer from interfering when hidden
            }
        });

        // Hide the button if there are not enough blogs
        if (blogCards.length <= MAX_VISIBLE_BLOGS) {
            loadMoreBtn.classList.add('hidden');
        }

        loadMoreBtn.addEventListener('click', () => {
            blogCards.forEach(card => {
                if (card.classList.contains('hidden')) {
                    card.classList.remove('hidden');
                    // Add a small delay for the fade-in effect to trigger after display is restored
                    setTimeout(() => {
                        card.classList.add('fade-in');
                        card.classList.add('visible'); // Directly mark as visible since it was already in viewport
                    }, 50);
                }
            });
            loadMoreBtn.classList.add('hidden');
        });
    }
});
