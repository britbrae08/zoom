(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.textContent = open ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  const form = document.querySelector('[data-signup-form]');
  const status = document.querySelector('[data-form-status]');
  if (!form || !status) return;

  const setStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status show ${type}`;
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const config = window.SITE_CONFIG || {};
    const endpoint = (config.formEndpoint || '').trim();

    if (!endpoint) {
      setStatus('The page is ready, but the signup form still needs to be connected to your email service. See assets/config.js.', 'error');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      const redirect = (config.successRedirect || '').trim();
      if (redirect) window.location.href = redirect;
      else setStatus('Thank you! Check your email for the next steps.', 'success');
    } catch (error) {
      setStatus('Something went wrong. Please try again or contact us directly.', 'error');
      button.disabled = false;
      button.textContent = original;
    }
  });
})();
