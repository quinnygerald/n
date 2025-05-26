// script.js
const messageEl = document.getElementById('message');
const btn = document.getElementById('surprise-btn');
let clicked = false;

// Yazı makinesi efekti
function typeWriter(text, i, fnCallback) {
  if (i < text.length) {
    messageEl.innerHTML = text.slice(0, i + 1);
    setTimeout(() => typeWriter(text, i + 1, fnCallback), 100);
  } else if (fnCallback) {
    fnCallback();
  }
}

// Özür mesajını başlat ve kalp yağdır
function startApology() {
  typeWriter("Senden içtenlikle özür dilerim...", 0, () => {
    btn.textContent = "Sürprizi gör";
  });
  createHearts();
}

// Kalp elementi oluşturup rastgele yerden düşür
function createHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }, 200);
}

btn.addEventListener('click', () => {
  if (!clicked) {
    clicked = true;
    startApology();
  } else {
    alert("Umarım beni affedersin ❤");
  }
});
