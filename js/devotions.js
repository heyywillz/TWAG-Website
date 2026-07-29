/**
 * devotions.js — True Worshippers A/G
 * Handles: Embedded Spotify player, sharing modal & link copying
 */

function playSpotifyEpisode(event) {
  if (event) event.preventDefault();
  const iframe = document.getElementById('spotify-iframe');
  const iframeContainer = document.getElementById('spotify-iframe-container');

  if (iframe) {
    iframe.src = "https://open.spotify.com/embed/episode/0NUph0HZfafFyORsue02EM?utm_source=generator&autoplay=1";
  }

  if (iframeContainer) {
    iframeContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    iframeContainer.classList.add('ring-4', 'ring-[#1DB954]/70');
    setTimeout(() => {
      iframeContainer.classList.remove('ring-4', 'ring-[#1DB954]/70');
    }, 2500);
  }
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

function copyDevotionLink(btn) {
  const link = 'https://open.spotify.com/episode/0NUph0HZfafFyORsue02EM?go=1&sp_cid=e4d96f09-8d08-432f-a227-c46720953c95&utm_source=embed_player_p&utm_medium=desktop';
  navigator.clipboard.writeText(link).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check text-green-600"></i> Copied!';
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  }).catch(() => {
    alert('Devotion Link: ' + link);
  });
}

function copyDevotionLinkInput(btn) {
  const link = 'https://open.spotify.com/episode/0NUph0HZfafFyORsue02EM?go=1&sp_cid=e4d96f09-8d08-432f-a227-c46720953c95&utm_source=embed_player_p&utm_medium=desktop';
  navigator.clipboard.writeText(link).then(() => {
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
    alert('Devotion Link: ' + link);
  });
}
