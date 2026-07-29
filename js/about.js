/**
 * about.js — True Worshippers A/G
 * Handles: Service Times & Location Accordion Toggle Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceAccordion();
});

function initServiceAccordion() {
  const accordionItems = document.querySelectorAll('.service-accordion-item');
  accordionItems.forEach((item) => {
    item.addEventListener('click', () => {
      const isExpanded = item.classList.contains('service-accordion--open');

      accordionItems.forEach(i => {
        i.classList.remove('service-accordion--open', 'ring-2', 'ring-gold/60', 'border-gold/50');
        const icon = i.querySelector('.service-accordion-icon');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-plus');
        }
        const body = i.querySelector('.service-accordion-body');
        if (body) body.classList.add('hidden');
      });

      if (!isExpanded) {
        item.classList.add('service-accordion--open', 'ring-2', 'ring-gold/60', 'border-gold/50');
        const icon = item.querySelector('.service-accordion-icon');
        if (icon) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-xmark');
        }
        const body = item.querySelector('.service-accordion-body');
        if (body) body.classList.remove('hidden');
      }
    });
  });
}
