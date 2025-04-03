document.addEventListener('DOMContentLoaded', () => {
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  const correctOrder = ['sun', 'converter', 'light-bulb'];
  const dropIndices = [20, 21, 22]; // C3, D3, E3
  let currentIndex = 0;
  let placedItems = [];

  const draggables = document.querySelectorAll('.draggable');
  const cells = document.querySelectorAll('.cell');
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;

  draggables.forEach(el => {
    el.addEventListener('touchstart', (e) => {
      activeOriginal = el;
      const rect = el.getBoundingClientRect();
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;

      activeClone = el.cloneNode(true);
      activeClone.classList.add('clone');
      activeClone.src = el.src;
      document.body.appendChild(activeClone);
      moveClone(e.touches[0].clientX, e.touches[0].clientY);
    });

    el.addEventListener('touchmove', (e) => {
      if (!activeClone) return;
      e.preventDefault();
      moveClone(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    el.addEventListener('touchend', () => {
      if (!activeClone || !activeOriginal) return;

      const cloneRect = activeClone.getBoundingClientRect();
      const cell = document.querySelector(`.cell[data-index="${dropIndices[currentIndex]}"]`);
      const rect = cell.getBoundingClientRect();

      const cx = cloneRect.left + cloneRect.width / 2;
      const cy = cloneRect.top + cloneRect.height / 2;

      const isInside =
        cx >= rect.left &&
        cx <= rect.right &&
        cy >= rect.top &&
        cy <= rect.bottom;

      if (isInside && cell.children.length === 0) {
        const id = activeOriginal.dataset.id;
        placedItems.push(id);
        const placed = activeOriginal.cloneNode(true);
        placed.classList.remove('draggable');
        placed.style.width = '54px';
        placed.style.height = '54px';
        cell.appendChild(placed);
        currentIndex++;

        if (placedItems.length === 3) checkOrder();
      }

      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;
    });
  });

  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-4/index.html";
  });

  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  function checkOrder() {
    const isCorrect = correctOrder.every((id, i) => placedItems[i] === id);
    const xpVal = document.getElementById('xp-value');

    if (isCorrect) {
      if (!playerState.isCompleted("3")) {
        let xp = playerState.getXP();
        playerState.setXP(xp + 5);
        playerState.markCompleted("3");
        playerState.save();
      }
      xpVal.textContent = playerState.getXP();
      resultText.textContent = "✅ You turned sunlight into light!";
      resultBox.style.display = "block";
    } else {
      resultText.textContent = "❌ Incorrect sequence. Try again.";
      resultBox.style.display = "block";
      placedItems = [];
      currentIndex = 0;
      dropIndices.forEach(i => {
        const cell = document.querySelector(`.cell[data-index="${i}"]`);
        cell.innerHTML = "";
      });
    }
  }
});
