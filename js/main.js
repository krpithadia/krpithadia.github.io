document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  const inject = async (selector, path, callback) => {
    const target = document.querySelector(selector);
    if (!target) return;
    try {
      const response = await fetch(path);
      const html = await response.text();
      target.innerHTML = html;
      if (callback) callback(); // run extra logic after injection
    } catch (err) {
      console.error(`Failed to inject ${path}`, err);
    }
  };

  // Inject header and attach menu toggle only after it's loaded
  inject('#site-header', 'assets/includes/header.html', () => {
    const btn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (btn && nav) {
      btn.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    } else {
      console.warn('Menu toggle or nav not found after injection.');
    }
  });

  // Inject footer as usual
  inject('#site-footer', 'assets/includes/footer.html');
});
=======
    console.log('Portfolio loaded');

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
});
>>>>>>> main1
