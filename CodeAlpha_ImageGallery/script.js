// 🌟 Select elements
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');

let currentIndex = 0;
let zoomLevel = 1;

// 🖼️ Show image inside lightbox
function showImage() {
  lightboxImg.src = galleryImages[currentIndex].src;
  zoomLevel = 1;
  lightboxImg.style.transform = 'scale(1)';

  // Reset animation (so it replays each time)
  lightboxImg.style.animation = 'none';
  lightboxImg.offsetHeight; // reflow
  lightboxImg.style.animation = 'fadeIn 0.4s ease';

  // Show the lightbox
  lightbox.style.display = 'flex';
}

// 🖱️ Open lightbox when image clicked
galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
  });
});

// ❌ Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// ⏭️ Next & ⏮️ Previous buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage();
});

// 🔍 Zoom logic
function applyZoom() {
  lightboxImg.style.transform = `scale(${zoomLevel})`;
  lightboxImg.style.transition = 'transform 0.3s ease';
}

// ➕ Zoom In
zoomInBtn.addEventListener('click', () => {
  zoomLevel += 0.2;
  if (zoomLevel > 3) zoomLevel = 3;
  applyZoom();
});

// ➖ Zoom Out
zoomOutBtn.addEventListener('click', () => {
  zoomLevel -= 0.2;
  if (zoomLevel < 1) zoomLevel = 1;
  applyZoom();
});

// 🖱️ Scroll Zoom (optional)
lightboxImg.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoomLevel += 0.1;
  } else {
    zoomLevel -= 0.1;
  }
  zoomLevel = Math.min(Math.max(zoomLevel, 1), 3);
  applyZoom();
});
