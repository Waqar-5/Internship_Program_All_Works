// =====================================
// Image Gallery App
// Minimal JavaScript Enhancement
// =====================================

console.log("Modern Image Gallery Loaded Successfully ✨");

// Small animation effect on page load
const galleryItems = document.querySelectorAll('.gallery-item');

window.addEventListener('load', () => {
  galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';

    setTimeout(() => {
      item.style.transition = 'all 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 150);
  });
});