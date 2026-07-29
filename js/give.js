/**
 * give.js — True Worshippers A/G
 * Handles: Giving calculator, preset amount buttons, payment modals, clipboard copy & toast system
 */

// Copy to Clipboard Utility
function copyToClipboard(text, btnId) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showCopySuccess(btnId, text);
    }).catch(err => {
      fallbackCopyText(text, btnId);
    });
  } else {
    fallbackCopyText(text, btnId);
  }
}

function fallbackCopyText(text, btnId) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showCopySuccess(btnId, text);
  } catch (err) {
    showToast("Unable to copy to clipboard", "error");
  }
  document.body.removeChild(textArea);
}

function showCopySuccess(btnId, text) {
  const btn = document.getElementById(btnId);
  if (btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check text-sm"></i><span>Copied!</span>`;
    btn.classList.add('bg-green-600', 'text-white');

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove('bg-green-600', 'text-white');
    }, 2200);
  }
  showToast(`Copied ${text} to clipboard!`, "success");
}

// Toast Notification System
function showToast(message, type = "success") {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-sora font-semibold shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 ${
    type === "success" 
      ? "bg-navy text-gold border border-gold/40" 
      : "bg-red-900 text-white border border-red-500"
  }`;

  toast.innerHTML = `
    <i class="${type === 'success' ? 'fa-solid fa-circle-check text-gold' : 'fa-solid fa-circle-exclamation text-red-300'} text-base"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Amount Preset Pill Button Handler
function selectPresetAmount(amount, element) {
  const presetBtns = document.querySelectorAll('.preset-btn');
  presetBtns.forEach(btn => {
    btn.classList.remove('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
    btn.classList.add('bg-white', 'text-navy', 'border-navy/20');
  });

  if (element) {
    element.classList.remove('bg-white', 'text-navy', 'border-navy/20');
    element.classList.add('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
  }

  const customInput = document.getElementById('custom-amount');
  if (customInput) {
    if (amount === 'other') {
      customInput.value = '';
      customInput.focus();
    } else {
      customInput.value = amount;
    }
  }
}

function handleCustomAmountInput(input) {
  const presetBtns = document.querySelectorAll('.preset-btn');
  
  let matchedPreset = false;
  presetBtns.forEach(btn => {
    const text = btn.innerText.replace('GH₵', '').trim();
    if (text === input.value) {
      btn.classList.remove('bg-white', 'text-navy', 'border-navy/20');
      btn.classList.add('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
      matchedPreset = true;
    } else if (text !== 'Other') {
      btn.classList.remove('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
      btn.classList.add('bg-white', 'text-navy', 'border-navy/20');
    }
  });

  if (!matchedPreset && input.value !== '') {
    const otherBtn = presetBtns[presetBtns.length - 1];
    if (otherBtn) {
      otherBtn.classList.remove('bg-white', 'text-navy', 'border-navy/20');
      otherBtn.classList.add('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
    }
  }
}

// Modal Control
function handleGivingSubmit(e) {
  e.preventDefault();
  const amount = document.getElementById('custom-amount').value;
  const category = document.getElementById('giving-category').value;
  const name = document.getElementById('full-name').value;
  const email = document.getElementById('email-address').value;

  if (!amount || amount <= 0) {
    showToast("Please enter a valid contribution amount.", "error");
    return;
  }
  if (!category) {
    showToast("Please select a giving category.", "error");
    return;
  }

  // Populate Modal
  document.getElementById('modal-summary-amount').textContent = `GH₵${parseFloat(amount).toFixed(2)}`;
  document.getElementById('modal-summary-category').textContent = category;
  document.getElementById('modal-summary-name').textContent = name;
  document.getElementById('modal-summary-email').textContent = email;

  document.getElementById('modal-instruction-amount').textContent = `GH₵${parseFloat(amount).toFixed(2)}`;
  document.getElementById('modal-instruction-ref').textContent = category;

  openGivingModal();
}

function openGivingModal() {
  const modal = document.getElementById('giving-modal');
  const content = document.getElementById('giving-modal-content');

  if (modal && content) {
    modal.classList.remove('hidden');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      content.classList.remove('scale-95');
      content.classList.add('scale-100');
    });
    document.body.style.overflow = 'hidden';
  }
}

function closeGivingModal() {
  const modal = document.getElementById('giving-modal');
  const content = document.getElementById('giving-modal-content');

  if (modal && content) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-100');
    content.classList.add('scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 300);
  }
}

function completeGivingSimulation() {
  closeGivingModal();
  showToast("God bless you! Your giving instruction has been recorded.", "success");
  const form = document.getElementById('giving-form');
  if (form) form.reset();

  // Reset preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.classList.remove('bg-navy', 'text-gold', 'border-navy', 'shadow-md', 'scale-105');
    btn.classList.add('bg-white', 'text-navy', 'border-navy/20');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const defaultPill = document.querySelectorAll('.preset-btn')[1]; // GH₵100
  if (defaultPill) {
    selectPresetAmount(100, defaultPill);
  }

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      const isExpanded = item.classList.contains('faq-accordion--open');

      faqItems.forEach(i => {
        i.classList.remove('faq-accordion--open', 'ring-2', 'ring-gold/60', 'border-gold/50');
        const icon = i.querySelector('.faq-accordion-icon');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-plus');
        }
        const body = i.querySelector('.faq-accordion-body');
        if (body) body.classList.add('hidden');
      });

      if (!isExpanded) {
        item.classList.add('faq-accordion--open', 'ring-2', 'ring-gold/60', 'border-gold/50');
        const icon = item.querySelector('.faq-accordion-icon');
        if (icon) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-xmark');
        }
        const body = item.querySelector('.faq-accordion-body');
        if (body) body.classList.remove('hidden');
      }
    });
  });
});
