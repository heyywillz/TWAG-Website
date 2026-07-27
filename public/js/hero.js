/**
 * hero.js — True Worshippers A/G
 * Handles: automatic image slideshow with progress indicators
 */

(function () {
  'use strict';

  const SLIDE_DURATION = 7000; // 7 seconds per slide

  let slides, progressBtns;
  let currentSlide = 0;
  let totalSlides = 0;
  let slideTimer = null;
  let isPaused = false;

  function init() {
    slides = document.querySelectorAll('.hero__slide');
    progressBtns = document.querySelectorAll('.hero__progress-btn');

    if (!slides.length) return;

    totalSlides = slides.length;

    // Bind progress button clicks
    progressBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-slide'), 10);
        if (idx !== currentSlide) {
          goToSlide(idx);
          restartTimer();
        }
      });
    });

    // Pause on hover
    var hero = document.getElementById('hero');
    if (hero) {
      hero.addEventListener('mouseenter', function () {
        isPaused = true;
        clearTimer();
      });
      hero.addEventListener('mouseleave', function () {
        isPaused = false;
        restartTimer();
      });
    }

    // Pause when tab hidden
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimer();
      } else if (!isPaused) {
        restartTimer();
      }
    });

    // Activate first slide and start
    goToSlide(0);
    restartTimer();
  }

  function goToSlide(index) {
    // Deactivate all slides
    for (var i = 0; i < totalSlides; i++) {
      slides[i].classList.remove('hero__slide--active');
      progressBtns[i].classList.remove('hero__progress-btn--active');

      // Reset the fill bar
      var fill = progressBtns[i].querySelector('.hero__progress-fill');
      if (fill) {
        fill.style.transition = 'none';
        fill.style.width = '0%';
      }
    }

    // Activate target slide
    currentSlide = index;
    slides[currentSlide].classList.add('hero__slide--active');
    progressBtns[currentSlide].classList.add('hero__progress-btn--active');

    // Animate the fill bar from 0 to 100% over SLIDE_DURATION
    var activeFill = progressBtns[currentSlide].querySelector('.hero__progress-fill');
    if (activeFill) {
      // Force reflow so the width:0% takes effect before we animate
      void activeFill.offsetWidth;
      activeFill.style.transition = 'width ' + SLIDE_DURATION + 'ms linear';
      activeFill.style.width = '100%';
    }
  }

  function nextSlide() {
    var next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }

  function restartTimer() {
    clearTimer();
    slideTimer = setInterval(nextSlide, SLIDE_DURATION);
  }

  function clearTimer() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
