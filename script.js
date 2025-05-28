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


  // // ===============================
  // // Music Control
  // // ===============================
  // const music = document.getElementById('bgMusic');
  // const musicCtrl = document.getElementById('musicControl');

  // // Attempt to play on load (may be blocked by browser if not muted/user-interacted)
  // music.play().catch(() => { /* autoplay blocked */ });

  // musicCtrl.addEventListener('click', () => {
  //   if (music.paused) {
  //     music.play();
  //     musicCtrl.textContent = '🎶';
  //   } else {
  //     music.pause();
  //     musicCtrl.textContent = '🎧';
  //   }
  // });

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
    'Hayatımın anlamısın 💘',
    'İyi ki tanışmışız gibi bişi 💍💓',
    'En güzel sen seversin ❤️',
    'En güzel sen sevilirsin 💞',
    'Uyuruz uyanırız geçer 🌙',
    'Sana kurban olurum 🥺❤️‍🔥'
]

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
    const start = new Date(startDateStr).setHours(0,0,0,0);
    const now = new Date();
    let diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    if (invert) diff = Math.floor((start - now) / (1000 * 60 * 60 * 24));
    document.getElementById(elementId).textContent = diff;
  }
  updateDayCounter('2025-06-19', 'dayCounterFuture', true);

     // Milli saniye karşılıkları
  const MS_PER_MINUTE = 1000 * 60;
  const MS_PER_HOUR   = MS_PER_MINUTE * 60;
  const MS_PER_DAY    = MS_PER_HOUR * 24;

  function updateElapsed(startISO, dayId, minuteId) {
    const start = new Date(startISO).setHours(21,0,0,0);
    const now   = new Date();
    let diffMs = now - start;
    console.log(diffMs)
    if (diffMs < 0) diffMs = 0;  // henüz başlamadıysa sıfırla

    // Tam gün
    const days = Math.floor(diffMs / MS_PER_DAY);


    // Kalan dakika
    const minutes = Math.floor(diffMs / MS_PER_MINUTE);

    // DOM’a yaz
    document.getElementById(dayId).textContent    = days;
    document.getElementById(minuteId).textContent = minutes;

      function pad2(n) { return n.toString().padStart(2,'0'); }

      // —— Bugün tarihi GG.AA.YYYY ——
    const dd = pad2(now.getDate());
    const mm = pad2(now.getMonth() + 1);
    const yy = now.getFullYear();
    document.getElementById('todayDate').textContent = `${dd}.${mm}.${yy}`;
  }

  // Başlangıç zamanımız: 21 Aralık 2024, 21:00
  const startTimeISO = '2024-12-21T21:00:00';

  // İlk defa yüklenince yazdır
  updateElapsed(startTimeISO, 'dayCounter', 'minuteCounter');

  // Sonra her dakika güncelle (sayfa açık kaldıkça)
  setInterval(() => {
    updateElapsed(startTimeISO, 'dayCounter', 'minuteCounter');
  }, MS_PER_MINUTE);

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

// <<<--- GALLERY LIGHTBOX KONTROLÜ --->>>
document.addEventListener('DOMContentLoaded', () => {
  const grid         = document.querySelector('.grid');
  const thumbs       = Array.from(grid.querySelectorAll('.thumb'));
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const closeBtn     = document.getElementById('lightboxClose');
  const prevBtn      = document.getElementById('lightboxPrev');
  const nextBtn      = document.getElementById('lightboxNext');
  let currentIndex   = -1;

  // Yardımcı: lightbox’ı aç/kapa
  function openLightbox(idx) {
    currentIndex = idx;
    lightboxImg.src = thumbs[currentIndex].src;
    lightbox.classList.remove('hidden');
  }
  function closeLightbox() {
    lightbox.classList.add('hidden');
    currentIndex = -1;
  }

  // 1) Thumbnail’a tıklanınca aç
  grid.addEventListener('click', e => {
    if (!e.target.classList.contains('thumb')) return;
    const idx = thumbs.indexOf(e.target);
    if (idx < 0) return;
    openLightbox(idx);
  });

  // 2) “×” butonuna tıklayınca kapa
  closeBtn.addEventListener('click', () => {
    closeLightbox();
  });

  // 3) Overlay’ın boş yerine tıklayınca kapa
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // 4) Önceki resim
  prevBtn.addEventListener('click', e => {
    e.stopPropagation(); // overlay click’ini engelle
    if (currentIndex < 0) return;
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    lightboxImg.src = thumbs[currentIndex].src;
  });

  // 5) Sonraki resim
  nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (currentIndex < 0) return;
    currentIndex = (currentIndex + 1) % thumbs.length;
    lightboxImg.src = thumbs[currentIndex].src;
  });

  // 6) Klavye ile kontrol: ESC, ←, →
  document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      closeLightbox();
    }
    else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    }
    else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
});

  // --- 1. Şarkı listesi ---
// script.js içindeki tracks tanımı
const tracks = [
  { src: 'assets/music/Duman - Elleri Ellerime.mp3',           title: 'Duman – Elleri Ellerime' },
  { src: 'assets/music/Güllü - Haylazim 2002.mp3',             title: 'Güllü – Haylazım' },
  { src: 'assets/music/Kaan Boşnak - Bırakma Kendini.mp3',     title: 'Kaan Boşnak – Bırakma Kendini' },
  { src: 'assets/music/Mirkelam - Asuman Pansuman.mp3',        title: 'Mirkelam – Asuman Pansuman' },
  { src: 'assets/music/NF - Time.mp3',                         title: 'NF – Time' },
  { src: 'assets/music/Oğuzhan Koç - Yüzük - Official Audio - Esen Müzik.mp3', title: 'Oğuzhan Koç – Yüzük' },
  { src: 'assets/music/Sibel Can - Emret Öleyim (Official Video).mp3', title: 'Sibel Can – Emret Öleyim' }
];

  let currentTrack = 0;

  // --- 2. Elemanlar ---
  const audio   = document.getElementById('bgMusic');
  const control = document.getElementById('musicControl');
  const playIcon = control.querySelector('[data-action="play"]');
  const listEl = document.getElementById('playlist');
    // --- Collapse/Expand için elementler ---
  const playlistToggle = document.getElementById('playlistToggle');
  const musicPlayer    = document.querySelector('.music-player');

  // Toggle’a tıklanınca .closed sınıfını aç/kapa
  playlistToggle.addEventListener('click', () => {
    musicPlayer.classList.toggle('closed');
  });
  
    function updateActiveClass() {
  listEl.querySelectorAll('li').forEach((li, i) => {
    li.classList.toggle('active', i === currentTrack);
  })};


  // --- 3. Track yükleme ---
  function loadTrack(index) {
    currentTrack = index;
    audio.src = tracks[currentTrack].src;
    updateActiveClass();
    updatePlayIcon();
  }

function renderPlaylist() {
  listEl.innerHTML = '';
  tracks.forEach((t,i) => {
    const li = document.createElement('li');
    li.textContent = t.title;
    if (i === currentTrack) li.classList.add('active');
    li.addEventListener('click', () => {
      loadTrack(i);
      audio.play();
    });
    listEl.appendChild(li);
  });
}

  // --- 4. İkonu güncelle ---
  function updatePlayIcon() {
    playIcon.textContent = audio.paused ? '▶️' : '⏸️';
  }

  // --- 5. Olay dinleyici ---
  control.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;


    switch (action) {
      case 'prev':
        loadTrack((currentTrack - 1 + tracks.length) % tracks.length);
        audio.play();
        break;
      case 'play':
        audio.paused ? audio.play() : audio.pause();
        break;
      case 'next':
        loadTrack((currentTrack + 1) % tracks.length);
        audio.play();
        break;
    }
  });

  // --- 6. Audio eventleri ---
  audio.addEventListener('play',  updatePlayIcon);
  audio.addEventListener('pause', updatePlayIcon);
  audio.addEventListener('ended', () => {
    loadTrack((currentTrack + 1) % tracks.length);
    audio.play();
  });

  // ===============================
  // Initialize all components on DOMContentLoaded
  // ===============================
  document.addEventListener('DOMContentLoaded', () => {
    loadTrack(0);
    renderPlaylist();
    initWordle();
    // Note: typewriter, particles, and day counters run when surpriseBtn is clicked or on load
  });
})();

