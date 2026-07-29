/**
 * contact.js — True Worshippers A/G
 * Handles: Toast notifications & contact form submission handler
 */

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `px-5 py-3 rounded-xl font-sora text-xs font-bold text-white shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 flex items-center gap-2 pointer-events-auto ${
    type === "success" ? "bg-emerald-600" : "bg-navy"
  }`;
  toast.innerHTML = `<i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-info"}"></i> <span>${message}</span>`;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function handleContactSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("full-name");
  const name = nameInput ? nameInput.value : "there";
  showToast(`Thank you, ${name}! Your message has been sent to True Worshippers A/G.`);
  const form = document.getElementById("contact-form");
  if (form) form.reset();
}
