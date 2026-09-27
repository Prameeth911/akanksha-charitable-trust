/**
 * Aakanksha Charitable Trust - Main JavaScript
 * Location: Puttur, Karnataka, India
 * Vanilla JS for navigation, gallery filters, lightbox, form feedback & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initGallery();
  initLightbox();
  initForms();
  initStatCounters();
  highlightActiveNav();
});

/**
 * Mobile Navigation Drawer Toggle
 */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.nav-mobile-drawer');
  const mobileOverlay = document.querySelector('.nav-mobile-overlay');

  if (!menuToggle || !mobileDrawer || !mobileOverlay) return;

  function toggleMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when clicking internal nav links
  const mobileLinks = mobileDrawer.querySelectorAll('.nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/**
 * Sticky Header elevation shadow on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Highlight active navigation link according to current page
 */
function highlightActiveNav() {
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath === '') currentPath = 'index.html';

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else if (currentPath === '' && href === 'index.html') {
      link.classList.add('active');
    }
  });
}

/**
 * Gallery Category Filtering (All, Education, Science, Community)
 */
function initGallery() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Interactive Lightbox Modal for Gallery Images
 */
function initLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return;

  const lightboxImgBox = lightbox.querySelector('.lightbox-img-box');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(item) {
    const thumbContainer = item.querySelector('.gallery-thumb-container');
    const titleElement = item.querySelector('.gallery-item-title');
    const titleText = titleElement ? titleElement.textContent : 'Gallery Image';

    if (thumbContainer) {
      lightboxImgBox.innerHTML = thumbContainer.innerHTML;
    }
    if (lightboxTitle) {
      lightboxTitle.textContent = titleText;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Close when clicking backdrop outside content
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/**
 * Form Handling with Toast Notifications
 */
function initForms() {
  // Volunteer Form
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your interest has been recorded in this demo.');
      volunteerForm.reset();
    });
  }

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been recorded in this demo.');
      contactForm.reset();
    });
  }
}

/**
 * Generic Toast notification component
 */
function showToast(message) {
  let toast = document.querySelector('.form-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'form-toast';
    toast.innerHTML = `
      <span class="form-toast-icon">✓</span>
      <span class="form-toast-text">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('.form-toast-text').textContent = message;
  }

  // Trigger reveal
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  // Hide after 4.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/**
 * Animated Stat Numbers when in view
 */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  function runCounter() {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '+';
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = `${prefix}${target}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${prefix}${current}${suffix}`;
        }
      }, 35);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        runCounter();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}
