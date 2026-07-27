/**
 * board.js — True Worshippers A/G
 * Handles: Church Board carousel autoplay & manual navigation controls
 */

document.addEventListener('DOMContentLoaded', () => {
  initBoardSlider();
});

function initBoardSlider() {
  const slider = document.getElementById('board-slider');
  const prevBtn = document.getElementById('board-prev');
  const nextBtn = document.getElementById('board-next');

  if (!slider) return;

  const scrollAmount = 384; // Card width + gap
  const autoPlayInterval = 4000; // Auto scroll every 4 seconds
  let timer = null;

  function scrollNext() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll - 20) {
      // Loop back to start smoothly
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  function scrollPrev() {
    if (slider.scrollLeft <= 20) {
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    timer = setInterval(scrollNext, autoPlayInterval);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // Manual Arrow Control Events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollPrev();
      startAutoPlay(); // Restart timer on click
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollNext();
      startAutoPlay(); // Restart timer on click
    });
  }

  // Pause autoplay when mouse enters slider, resume on leave
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Pause when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Start autoplay
  startAutoPlay();
}
