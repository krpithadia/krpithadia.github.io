document.addEventListener('DOMContentLoaded', () => {
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