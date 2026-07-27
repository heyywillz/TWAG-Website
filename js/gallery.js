/**
 * gallery.js — True Worshippers A/G
 * Handles: Expanded Lightbox Modal with Prev/Next Navigation & "See More" Photos
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryLightbox();
  initSeeMoreGallery();
});

function initGalleryLightbox() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const modalTitle = document.getElementById('gallery-modal-title');
  const modalCategory = document.getElementById('gallery-modal-category');
  const modalDesc = document.getElementById('gallery-modal-desc');
  const modalCounter = document.getElementById('gallery-modal-counter');
  const closeBtn = document.getElementById('gallery-modal-close');
  const backdrop = document.getElementById('gallery-modal-backdrop');
  const prevBtn = document.getElementById('gallery-modal-prev');
  const nextBtn = document.getElementById('gallery-modal-next');

  if (!modal || !modalImg) return;

  let currentIndex = 0;

  // Helper to get all non-hidden pins
  const getActivePins = () => {
    return Array.from(document.querySelectorAll('.gallery-pin:not(.hidden)'));
  };

  // Helper to display pin by index
  const showPinAtIndex = (index) => {
    const pins = getActivePins();
    if (pins.length === 0) return;

    // Wrap around index
    if (index < 0) index = pins.length - 1;
    if (index >= pins.length) index = 0;

    currentIndex = index;
    const card = pins[currentIndex];

    const imgSrc = card.getAttribute('data-src') || card.querySelector('img')?.src;
    const title = card.getAttribute('data-title') || '';
    const category = card.getAttribute('data-category') || '';
    const desc = card.getAttribute('data-desc') || '';

    if (imgSrc) {
      modalImg.src = imgSrc;
      modalImg.alt = title;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalCounter) modalCounter.textContent = `${currentIndex + 1} / ${pins.length}`;
    }
  };

  // Open Lightbox when clicking any pin
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-pin');
    if (!card) return;

    e.preventDefault();
    const pins = getActivePins();
    const pinIndex = pins.indexOf(card);

    if (pinIndex !== -1) {
      showPinAtIndex(pinIndex);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  });

  // Navigation handlers
  const showPrev = (e) => {
    if (e) e.stopPropagation();
    showPinAtIndex(currentIndex - 1);
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    showPinAtIndex(currentIndex + 1);
  };

  if (prevBtn) prevBtn.addEventListener('click', showPrev);
  if (nextBtn) nextBtn.addEventListener('click', showNext);

  // Close modal logic
  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard Navigation (Esc, Left Arrow, Right Arrow)
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    } else if (e.key === 'ArrowRight') {
      showNext();
    }
  });
}

function initSeeMoreGallery() {
  const seeMoreBtn = document.getElementById('gallery-see-more-btn');
  const seeMoreContainer = document.getElementById('gallery-see-more-container');

  if (!seeMoreBtn) return;

  seeMoreBtn.addEventListener('click', () => {
    const hiddenPins = document.querySelectorAll('.gallery-hidden-pin');
    const BATCH_SIZE = 8;

    hiddenPins.forEach((pin, index) => {
      if (index < BATCH_SIZE) {
        pin.classList.remove('hidden', 'gallery-hidden-pin');
        pin.classList.add('animate-fade-in');
      }
    });

    const remainingHidden = document.querySelectorAll('.gallery-hidden-pin');
    if (remainingHidden.length === 0 && seeMoreContainer) {
      seeMoreContainer.classList.add('hidden');
    }
  });
}
