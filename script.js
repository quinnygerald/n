// script.js

// Müzik kontrol
const music = document.getElementById('bgMusic');
const ctrl = document.getElementById('musicControl');
music.play();
ctrl.addEventListener('click', () => {
  music.paused ? (music.play(), ctrl.textContent = '🎶') : (music.pause(), ctrl.textContent = '🎧');
});

// Buton ve etkileşimler
const surpriseBtn = document.getElementById('surpriseBtn');

// İltifatlar
const compliments = [
  'Dişlerine ölürüm 😍',
  'Az yaklaş da öpim 💓',
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
const typeText = 'Seni çok seviyorum Naziş... 💖';
let typeIdx = 0;
function typeWriter() {
  if (typeIdx < typeText.length) {
    typeEl.textContent += typeText[typeIdx++];
    setTimeout(typeWriter, 100);
  }
}

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Kalp sınıfı
class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.size = 20 + Math.random() * 20;
    this.vy = 0.3 + Math.random() * 0.3;
    this.alpha = 0.6 + Math.random() * 0.4;
  }
  update() {
    this.y -= this.vy;
    if (this.y < -50) this.reset(); // ekran dışına çıktıysa sıfırla
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.font = `${this.size}px serif`;
    ctx.fillText('❤️', this.x, this.y);
    ctx.restore();
  }
}

// Başlangıçta sabit sayıda kalp üret
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// Gün sayacı
function calculateDays() {
  const startDate = new Date('2024-12-21');
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  document.getElementById('dayCounter').textContent = diff;
}
calculateDays();

// Gün sayacı
function calculateDaysFuture() {
  const startDate = new Date('2025-06-19');
  const today = new Date();
  const diff = Math.floor((startDate - today) / (1000 * 60 * 60 * 24));
  document.getElementById('dayCounterFuture').textContent = diff;
}
calculateDaysFuture();

const wordList = [
  'nazlı', 'tatlı', 'gülme', 'şeker', 'güzel', 'dünya', 'kalem', 'kızıl',
  'çocuk', 'renk', 'küçük', 'canım', 'yemek', 'bahar', 'çiçek', 'yolcu',
  'aşkla', 'hoşça', 'gölge', 'üşüme'
];

const validLetters = 'abcçdefgğhıijklmnoöprsştuüvyz';
let secretWord = wordList[Math.floor(Math.random() * wordList.length)];
let currentGuess = '';
let currentRow = 0;
const maxAttempts = 6;

const board = document.getElementById('wordle-board');
const resetBtn = document.getElementById('resetBtn');

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < maxAttempts * 5; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
  }
}
createBoard();
updateCursorEffect();

document.addEventListener('keydown', (e) => {
  if (resetBtn.classList.contains('hidden') === false) return;

  const key = e.key.toLowerCase();
  if (currentRow >= maxAttempts) return;

  if (validLetters.includes(key) && currentGuess.length < 5) {
    currentGuess += key;
    updateGrid();
    updateCursorEffect();
  } else if (key === 'backspace') {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
    updateCursorEffect();
  } else if (key === 'enter' || currentGuess.length === 5) {
    checkGuess();
  }
});

function updateGrid() {
  const start = currentRow * 5;
  for (let i = 0; i < 5; i++) {
    const cell = board.children[start + i];
    cell.textContent = currentGuess[i]?.toLocaleUpperCase('tr-TR') || '';
  }
}

function updateCursorEffect() {
  document.querySelectorAll('.cell').forEach(el => el.classList.remove('active'));
  const activeIndex = currentRow * 5 + currentGuess.length;
  const cell = board.children[activeIndex];
  if (cell) cell.classList.add('active');
}

function checkGuess() {
  const start = currentRow * 5;
  const guessArray = currentGuess.split('');
  const secretArray = secretWord.split('');
  const used = {};

  for (let i = 0; i < 5; i++) {
    const cell = board.children[start + i];
    if (guessArray[i] === secretArray[i]) {
      cell.classList.add('correct');
      used[i] = true;
    }
  }

  for (let i = 0; i < 5; i++) {
    const cell = board.children[start + i];
    if (cell.classList.contains('correct')) continue;

    const letter = guessArray[i];
    const index = secretArray.findIndex((l, j) => l === letter && !used[j]);

    if (index !== -1) {
      cell.classList.add('present');
      used[index] = true;
    } else {
      cell.classList.add('absent');
    }
  }

  if (currentGuess === secretWord) {
    setTimeout(() => {
      confetti({ particleCount: 120, spread: 80 });
      resetBtn.classList.remove('hidden');
    }, 300);
  } else {
    currentRow++;
    currentGuess = '';
    if (currentRow === maxAttempts) {
      setTimeout(() => {
        alert(`Bilemedin gel bi öpim 😘 Cevap: ${secretWord.toLocaleUpperCase('tr-TR')}`);
        resetBtn.classList.remove('hidden');
      }, 500);
    } else {
      updateCursorEffect();
    }
  }
}

// Butonla sıfırla
resetBtn.addEventListener('click', () => {
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  currentGuess = '';
  currentRow = 0;
  resetBtn.classList.add('hidden');
  createBoard();
  updateCursorEffect();
});

// Tıklama olayı
surpriseBtn.addEventListener('click', () => {
  confetti({ particleCount: 100, spread: 70 });
  showCompliment();
  typeEl.textContent = '';
  typeIdx = 0;
  typeWriter();
  animateParticles();
});
