// script.js
// ————— Tema Yönetimi —————
const toggleBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved) {
  document.documentElement.setAttribute('data-theme', saved);
  toggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initTheme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', initTheme);
  toggleBtn.textContent = initTheme === 'dark' ? '☀️' : '🌙';
}
toggleBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});
// ———————————————————————


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
  'Az yaklaş da öpim 💓',
  'Dişlerine ölürüm 😍',
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
  "araba","bahar","çiçek","dünya","evren","insan","kalem","kapak","köpek","serçe",
  "yılda","elmas","ekmek","çorba","meyve","armut","şeker","bahçe","şehir","köyde",
  "mahal","gözüm","kalça","sevgi","mutlu","üzgün","hüzün","nefes","gelme","gitme",
  "bekle","kazan","kayak","düşün","sevme","açlık","gülüm","sağda","solda","üstte",
  "altta","pembe","kalbi","sabah","akşam","kadın","erkek","yaşlı","birim","beşer",
  "topla","taşım","şimdi","yerli","gözde","sahip","sesli","tuzlu","sıcak","soğuk",
  "pilav","dolma","kebab","kitap","okuma","yazar","merak","hayal","atlas","diyor",
  "bakış","kusur","sevda","nazar","tarih","bugün","geçiş","yarar","çocuk","annem",
  "babam","ablam","kızım","oğlum","selam","saçma","neden","bakan","olanı","eksen",
  "adana","izmir","sivas","onbir","yirmi","final","dilim","simit","çaycı","kahve",
  "patla","gönül","yakın","ispat","cesur","tatlı","dinle","arada","başka","dinme",
  "içmek","ücret","noter","lokal","şehit","emlak","hapis","ithal","yerel","ultra",
  "vatan","yedek","yetki","deniz","karar","öğren","öğret","yakıt","sürat","sevap",
  "moral","temiz","kiraz","çizgi","ortak","sabır","seçim","bilet","sefer","anlam",
  "geçer","azalt","artır","satın","almak","vergi","verme","dönüş","kader","kurum",
  "limit","liste","resim","şifre","radyo","takas","maçta","ödeme","ayrım","pasaj",
  "temas","yansı","yanın","anlat","buluş","işgal","karne","makul","mecaz","yavaş",
  "hızlı","şarap","eşsiz","falcı","kısık","kısır","taraf","radar","kayık","kıyım",
  "fidan","talih","sizin","sorun","sanat","modem","kodla","kodum","testi","yerim",
  "aramı","aracı","tutku","kutup","kitle","kilit","firar","çilek","börek","helal"
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

  surpriseBtn.textContent = 'bi daha?';
});
