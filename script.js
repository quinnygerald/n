// Confetti kütüphanesini index.html'e <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.min.js"></script> ile ekleyebilirsin.

document.addEventListener('DOMContentLoaded', () => {
  // Müzik otomatik başla, kontrol ekle
  const music = document.getElementById('bgMusic');
  const ctrl = document.getElementById('musicControl');
  music.play();

  ctrl.addEventListener('click', () => {
    if (music.paused) { music.play(); ctrl.textContent = '🔈'; }
    else            { music.pause(); ctrl.textContent = '🔇'; }
  });

  // Sürpriz butonu + konfeti
  const btn = document.getElementById('surpriseBtn');
  btn.addEventListener('click', () => {
    // Kütüphane ile konfeti
    confetti({ particleCount: 150, spread: 60 });
    btn.textContent = 'Seni seviyorum! 😘';
    btn.disabled = true;
  });

  // Lightbox galerisi
  document.querySelectorAll('.thumb').forEach(img => {
    img.addEventListener('click', () => {
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<img src="${img.src}"><span class="close">&times;</span>`;
      document.body.appendChild(lb);
      lb.querySelector('.close').onclick = () => lb.remove();
    });
  });
});
