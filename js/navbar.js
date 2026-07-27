/**
 * navbar.js — True Worshippers AG
 * Handles: scroll hide/show, mobile menu toggle, active link highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navbar-toggle');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const overlay = document.getElementById('navbar-mobile-overlay');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  if (!navbar) return;

  // ─── Scroll: hide on down, show on up ───
  let lastScrollY = window.scrollY;
  let ticking = false;
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      navbar.classList.add('navbar--hidden');
    } else {
      navbar.classList.remove('navbar--hidden');
    }

    // Toggle Back to Top button visibility (hidden on hero section < 400px)
    if (backToTopBtn) {
      if (currentScrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  // Initial check on load
  handleScroll();

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // ─── Mobile menu toggle ───
  if (toggle && mobileMenu && overlay) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('navbar__mobile-menu--open');

      if (isOpen) {
        closeMobileMenu(toggle, mobileMenu, overlay);
      } else {
        openMobileMenu(toggle, mobileMenu, overlay);
      }
    });

    // Close on explicit mobile close button click
    const closeBtn = document.getElementById('navbar-mobile-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeMobileMenu(toggle, mobileMenu, overlay);
      });
    }

    // Close on overlay click
    overlay.addEventListener('click', () => {
      closeMobileMenu(toggle, mobileMenu, overlay);
    });

    // Close on mobile link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu(toggle, mobileMenu, overlay);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('navbar__mobile-menu--open')) {
        closeMobileMenu(toggle, mobileMenu, overlay);
      }
    });
  }

  // ─── Active link highlighting ───
  highlightActiveLink();
}

function openMobileMenu(toggle, menu, overlay) {
  toggle.classList.add('navbar__toggle--active');
  menu.classList.add('navbar__mobile-menu--open');
  overlay.classList.add('navbar__mobile-overlay--active');
  menu.classList.remove('translate-x-full');
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  document.body.style.overflow = 'hidden';
  toggle.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu(toggle, menu, overlay) {
  toggle.classList.remove('navbar__toggle--active');
  menu.classList.remove('navbar__mobile-menu--open');
  overlay.classList.remove('navbar__mobile-overlay--active');
  menu.classList.add('translate-x-full');
  overlay.classList.add('opacity-0', 'pointer-events-none');
  document.body.style.overflow = '';
  toggle.setAttribute('aria-expanded', 'false');
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const fileName = window.location.pathname.split('/').pop() || 'index.html';

  // Map filenames to their identifiers
  const pageMap = {
    'index.html': 'home',
    'about.html': 'about',
    'events.html': 'events',
    'devotions.html': 'devotions',
    'departments.html': 'departments',
    'give.html': 'give',
    'contact.html': 'contact',
  };

  const activePage = pageMap[fileName] || 'home';

  // Desktop links
  document.querySelectorAll('.navbar__link').forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === activePage) {
      link.classList.add('navbar__link--active');
    } else {
      link.classList.remove('navbar__link--active');
    }
  });

  // Mobile links
  document.querySelectorAll('.navbar__mobile-link').forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === activePage) {
      link.classList.add('navbar__mobile-link--active');
    } else {
      link.classList.remove('navbar__mobile-link--active');
    }
  });
}
