(() => {
  const menuButton = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  const header = document.querySelector('[data-header]');

  if (menuButton && menu) {
    menuButton.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      menuButton.classList.toggle('is-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        menuButton.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('details[open]').forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const form = document.querySelector('[data-signup-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const endpoint = window.ZBS_CONFIG?.formEndpoint?.trim() || '';
    if (!endpoint || endpoint.includes('REPLACE_WITH')) {
      status.textContent = 'This form is ready, but the email-service endpoint still needs to be added in assets/config.js.';
      status.className = 'form-status is-error';
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');
      window.location.assign('thank-you.html');
    } catch (error) {
      status.textContent = 'We could not submit the form. Please check the form endpoint and try again.';
      status.className = 'form-status is-error';
      submitButton.disabled = false;
      submitButton.textContent = 'Send my free ebook & invitation';
    }
  });
})();
