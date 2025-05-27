// script.js

// Müzik kontrol
const music = document.getElementById('bgMusic');
const ctrl = document.getElementById('musicControl');
music.play();
ctrl.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    ctrl.textContent = '🔈';
  } else {
    music.pause();
    ctrl.textContent = '🔇';
  }
});

// Buton ve etkileşimler
const surpriseBtn = document.getElementById('surpriseBtn');

// İltifatlar
const compliments = [
  'En güzel gülüşsün 😍',
  'Seninle her şey daha renkli 🎨',
  'Kalbim seninle atıyor 💓',
  'Sen en büyük şansımsın 🍀',
  'Hayatımın anlamısın 💘'
];
function showCompliment() {
  const c = document.getElementById('compliment');
  c.textContent = compliments[Math.floor(Math.random() * compliments.length)];
  c.classList.add('show');
  setTimeout(() => c.classList.remove('show'), 3000);
}

// Yazı efekti (typewriter)
const typeEl = document.getElementById('typewriter');
const typeText = 'Seni çok seviyorum... 💖';
let typeIdx = 0;
function typeWriter() {
  if (typeIdx < typeText.length) {
    typeEl.textContent += typeText[typeIdx++];
    setTimeout(typeWriter, 100);
  }
}

// Kalp yağmuru
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let frameCount = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.vy = 0.5 + Math.random() * 0.5;
    this.alpha = 1;
    this.size = 20 + Math.random() * 20;
  }
  update() {
    this.y -= this.vy;
    this.alpha -= 0.002;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.font = `${this.size}px serif`;
    ctx.fillText('❤️', this.x, this.y);
    ctx.restore();
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameCount++;
  if (frameCount % 15 === 0) {
    particles.push(new Particle());
  }
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animateParticles);
}

// Butona basıldığında
surpriseBtn.addEventListener('click', () => {
  confetti({ particleCount: 100, spread: 70 });
  showCompliment();
  typeEl.textContent = '';
  typeIdx = 0;
  typeWriter();
  animateParticles();
  surpriseBtn.disabled = false;
});
