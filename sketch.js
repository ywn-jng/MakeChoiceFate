let x = 40;
let y = 120;
const lineHeight = 100;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const caret = canvas.querySelector('.caret');

  // backspace
  if (e.key === 'Backspace') {
    e.preventDefault();
    const prev = canvas.querySelector('.letter:last-of-type');
    if (prev) prev.remove();
    return;
  }

  // enter
  if (e.key === 'Enter') {
    e.preventDefault();
    x = 40;
    y += lineHeight;
    return;
  }

  // space
  if (e.key === ' ') {
    e.preventDefault();
    x += random(20, 60);
    return;
  }

  // letters
  if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
    e.preventDefault();
    hideHint();

    const span = document.createElement('span');
    span.className = 'letter';

    const img = document.createElement('img');
    img.src = IMG_PATH + e.key.toLowerCase() + '.png';

    // 🔥 랜덤 스타일
    const scale = random(0.5, 1.8);
    const rotate = random(-45, 45);
    const offsetX = random(-20, 20);
    const offsetY = random(-20, 20);

    span.style.left = (x + offsetX) + 'px';
    span.style.top = (y + offsetY) + 'px';
    span.style.transform = `scale(${scale}) rotate(${rotate}deg)`;

    span.appendChild(img);
    canvas.appendChild(span);

    // 👉 다음 글자 위치 (약간 랜덤 간격)
    x += random(40, 90);

    // 👉 줄 자동 넘어감
    if (x > window.innerWidth - 100) {
      x = 40;
      y += lineHeight;
    }
  }
});
