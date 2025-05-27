// script.js
// ===============================
// Wrap everything in an IIFE to avoid polluting the global scope
// ===============================
(() => {
  // ===============================
  // Theme Management
  // ===============================

const toggleBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

if (saved) {
  // Daha önce kaydedilmiş tema varsa, onu uygula
  document.documentElement.setAttribute('data-theme', saved);
  toggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';
} else {
  // İlk açılışta her zaman dark
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleBtn.textContent = '☀️';
  // Not: Burada localStorage.setItem('theme','dark') koymadık,
  // böylece kullanıcı tıklayana kadar 'saved' hep null kalır.
}

toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  // Yeni temayı uygula ve kayıt et
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
});


  // ===============================
  // Music Control
  // ===============================
  const music = document.getElementById('bgMusic');
  const musicCtrl = document.getElementById('musicControl');

  // Attempt to play on load (may be blocked by browser if not muted/user-interacted)
  music.play().catch(() => { /* autoplay blocked */ });

  musicCtrl.addEventListener('click', () => {
    if (music.paused) {
      music.play();
      musicCtrl.textContent = '🎶';
    } else {
      music.pause();
      musicCtrl.textContent = '🎧';
    }
  });

  // ===============================
  // Compliment & Surprise Button
  // ===============================

  const heartScroll = document.getElementById('toGallery');
  const gallerySection = document.querySelector('.gallery');

  heartScroll.addEventListener('click', () => {
    // .gallery bölümüne smooth scroll
    gallerySection.scrollIntoView({ behavior: 'smooth' });
  });

  let surpriseClicks = 0;  // sayacı ekledik
  const surpriseBtn = document.getElementById('surpriseBtn');
  const complimentEl = document.getElementById('compliment');
  const compliments = [
    'Az yaklaş da öpim 💓',
    'Dişlerine ölürüm 😍',
    'Sen en büyük şansımsın 🍀',
    'Hayatımın anlamısın 💘'
  ];

  function showCompliment() {
    const idx = Math.floor(Math.random() * compliments.length);
    complimentEl.textContent = compliments[idx];
    complimentEl.classList.add('show');
    setTimeout(() => complimentEl.classList.remove('show'), 3000);
  }

  // ===============================
  // Typewriter Effect
  // ===============================
  const typeEl = document.getElementById('typewriter');
  const typeText = 'Seni çok seviyorum Naziş... 💖';
  let typeIdx = 0;

  function typeWriter() {
    if (typeIdx < typeText.length) {
      typeEl.textContent += typeText[typeIdx++];
      setTimeout(typeWriter, 100);
    }
  }

  // ===============================
  // Heart Particle Animation
  // ===============================
  const canvas = document.getElementById('heartCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 50;
      this.size = 20 + Math.random() * 20;
      this.vy = 0.3 + Math.random() * 0.3;
      this.alpha = 0.6 + Math.random() * 0.4;
    }
    update() {
      this.y -= this.vy;
      if (this.y < -50) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.font = `${this.size}px serif`;
      ctx.fillText('❤️', this.x, this.y);
      ctx.restore();
    }
  }

  // Create initial particles
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle());
  }

  let particleAnimId;      // en başta declare et

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    // ↪️ requestAnimationFrame ID’sini sakla ki iptal edebilesin
    particleAnimId = requestAnimationFrame(animateParticles);
  }


  // ===============================
  // Day Counters
  // ===============================
  function updateDayCounter(startDateStr, elementId, invert = false) {
    const start = new Date(startDateStr);
    const now = new Date();
    let diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (invert) diff = Math.floor((start - now) / (1000 * 60 * 60 * 24));
    document.getElementById(elementId).textContent = diff;
  }
  updateDayCounter('2024-12-21', 'dayCounter', false);
  updateDayCounter('2025-06-19', 'dayCounterFuture', true);

  // ===============================
  // Wordle Game
  // ===============================
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
  const board = document.getElementById('wordle-board');
  const resetBtn = document.getElementById('resetBtn');
  let secretWord, currentGuess, currentRow;
  const maxAttempts = 6;

  function initWordle() {
    secretWord = wordList[Math.floor(Math.random() * wordList.length)];
    currentGuess = '';
    currentRow = 0;
    resetBtn.classList.add('hidden');
    board.innerHTML = '';
    for (let i = 0; i < maxAttempts * 5; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      board.appendChild(cell);
    }
    updateCursorEffect();
  }

  function updateGrid() {
    const start = currentRow * 5;
    for (let i = 0; i < 5; i++) {
      const cell = board.children[start + i];
      cell.textContent = currentGuess[i]?.toLocaleUpperCase('tr-TR') || '';
    }
  }

  function updateCursorEffect() {
    document.querySelectorAll('.cell').forEach(c => c.classList.remove('active'));
    const idx = currentRow * 5 + currentGuess.length;
    board.children[idx]?.classList.add('active');
  }

  function checkGuess() {
    const start = currentRow * 5;
    const guessArr = currentGuess.split('');
    const secretArr = secretWord.split('');
    const used = {};

    // First pass: exact matches
    for (let i = 0; i < 5; i++) {
      const cell = board.children[start + i];
      if (guessArr[i] === secretArr[i]) {
        cell.classList.add('correct');
        used[i] = true;
      }
    }
    // Second pass: present vs absent
    for (let i = 0; i < 5; i++) {
      const cell = board.children[start + i];
      if (cell.classList.contains('correct')) continue;
      const letter = guessArr[i];
      const idx = secretArr.findIndex((l, j) => l === letter && !used[j]);
      if (idx !== -1) {
        cell.classList.add('present');
        used[idx] = true;
      } else {
        cell.classList.add('absent');
      }
    }

    // Win or move to next row
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

  // Handle key events for Wordle
  document.addEventListener('keydown', e => {
    if (!resetBtn.classList.contains('hidden')) return;
    const key = e.key.toLocaleLowerCase('tr-TR');
    if (validLetters.includes(key) && currentGuess.length < 5) {
      currentGuess += key;
      updateGrid();
      updateCursorEffect();
    } else if (key === 'backspace') {
      currentGuess = currentGuess.slice(0, -1);
      updateGrid();
      updateCursorEffect();
    } else if ((key === 'enter' && currentGuess.length === 5) || currentGuess.length === 5) {
      checkGuess();
    }
  });

  // Reset button for Wordle
  resetBtn.addEventListener('click', initWordle);

  // ===============================
  // Wire up the Surprise Button to trigger all effects
  // ===============================
  surpriseBtn.addEventListener('click', () => {
    confetti({ particleCount: 100, spread: 70 });
    showCompliment();
    typeEl.textContent = '';
    typeIdx = 0;
    typeWriter();
    animateParticles();
    surpriseBtn.textContent = 'bi daha?';

        // her tıklamada sayacı artır
    surpriseClicks++;
    // üçüncü tıklamada yeni “kalp kontrol” butonunu ekle
    if (surpriseClicks === 5) {
      surpriseBtn.textContent = 'çok mu kalp oldu ?';

      // bu yeni butona tıklanınca…
      surpriseBtn.addEventListener('click', () => {
        // 1) mevcut kalp partiküllerini iptal et
        particles = [];
        cancelAnimationFrame(particleAnimId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        surpriseBtn.textContent = 'bi daha?';
      });
    }
  });

  // ===============================
  // Initialize all components on DOMContentLoaded
  // ===============================
  document.addEventListener('DOMContentLoaded', () => {
    initWordle();
    // Note: typewriter, particles, and day counters run when surpriseBtn is clicked or on load
  });
})();

