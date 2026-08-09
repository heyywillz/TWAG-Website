/**
 * events.js — True Worshippers A/G
 * Handles: YouTube embed player, share modal, copy URL & live countdown timer
 */

function loadYtVideo(container, videoId) {
  container.innerHTML = `<iframe class="w-full h-full rounded-xl" src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

function openShareModal() {
  const modal = document.getElementById('share-modal');
  const card = document.getElementById('share-modal-card');
  if (modal && card) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
  }
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  const card = document.getElementById('share-modal-card');
  if (modal && card) {
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0', 'pointer-events-none');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
  }
}

function copyLiveUrlInput(btn) {
  const liveUrl = 'https://www.youtube.com/live/zW2XDNE0pM4?si=1mr8cuXtIdQCmj3d';
  navigator.clipboard.writeText(liveUrl).then(() => {
    const copyBtn = document.getElementById('copy-modal-btn');
    if (copyBtn) {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.remove('bg-gold', 'text-navy');
      copyBtn.classList.add('bg-green-500', 'text-white');
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('bg-green-500', 'text-white');
        copyBtn.classList.add('bg-gold', 'text-navy');
      }, 2000);
    }
  }).catch(() => {
    alert('Live stream URL: ' + liveUrl);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  function updateCountdown() {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
    nextSunday.setHours(8, 30, 0, 0);

    if (now > nextSunday) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }

    const diff = nextSunday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
