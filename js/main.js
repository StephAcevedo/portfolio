/* ===========================
   MAIN.JS — Stephanie Acevedo Portfolio
   =========================== */

// Add js-ready class so reveal animations only run when JS is available
// (content is visible by default for no-JS / slow-load — 508 safe)
document.documentElement.classList.add('js-ready');

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Sticky nav ----
const nav = document.getElementById('site-nav');

function handleNavScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ---- Mobile nav toggle ----
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.hidden = isOpen;

    // Shift focus into menu when opened — 508 keyboard navigation
    if (!isOpen) {
      const firstLink = mobileNav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
      toggle.focus(); // return focus to toggle — 508
    });
  });

  // Close on Escape key — 508 / WCAG 2.1 SC 1.4.13
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileNav.hidden) {
      toggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
      toggle.focus();
    }
  });
}

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

// ---- Active nav highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const matches = link.getAttribute('href') === `#${id}`;
          link.toggleAttribute('aria-current', matches);
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(section => activeObserver.observe(section));

// ---- Pause ticker on hover / focus (accessibility) ----
const tickerTrack = document.querySelector('.ticker-track');
const tickerWrap = document.querySelector('.ticker-wrap');

if (tickerTrack && tickerWrap) {
  const pause = () => tickerTrack.style.animationPlayState = 'paused';
  const resume = () => tickerTrack.style.animationPlayState = 'running';

  tickerWrap.addEventListener('mouseenter', pause);
  tickerWrap.addEventListener('mouseleave', resume);
  tickerWrap.addEventListener('focusin', pause);
  tickerWrap.addEventListener('focusout', resume);
}
