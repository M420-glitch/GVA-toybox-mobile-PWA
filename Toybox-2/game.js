document.addEventListener('DOMContentLoaded', () => {
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  const correctItems = ['seed', 'water-can', 'sun'];
  const dropIndexes = [12, 13, 14, 15, 16, 17]; // A3–F3
  const draggables = document.querySelectorAll('.draggable');
  const cells = document.querySelectorAll('.cell');
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let placedItems = [];

  draggables.forEach(el => {
    el.addEventListener('touchstart', (event) => {
      activeOriginal = el;
      const rect = el.getBoundingClientRect();
      offsetX = event.touches[0].clientX - rect.left;
      offsetY = event.touches[0].clientY - rect.top;

      activeClone = el.cloneNode(true);
      activeClone.classList.add('clone');
      document.body.appendChild(activeClone);
      moveClone(event.touches[0].clientX, event.touches[0].clientY);
    });

    el.addEventListener('touchmove', (event) => {
      if (!activeClone) return;
      event.preventDefault();
      moveClone(event.touches[0].clientX, event.touches[0].clientY);
    }, { passive: false });

    el.addEventListener('touchend', () => {
      if (!activeClone || !activeOriginal) return;

      const cloneRect = activeClone.getBoundingClientRect();
      let dropped = false;

      cells.forEach(cell => {
        const index = parseInt(cell.dataset.index);
        const cellRect = cell.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        const isInside =
          centerX >= cellRect.left &&
          centerX <= cellRect.right &&
          centerY >= cellRect.top &&
          centerY <= cellRect.bottom;

        if (isInside && dropIndexes.includes(index) && cell.children.length === 0) {
          const id = activeOriginal.dataset.id;
          if (!placedItems.includes(id)) {
            placedItems.push(id);
            const placed = activeOriginal.cloneNode(true);
            placed.classList.remove('draggable');
            cell.appendChild(placed);
            dropped = true;
          }
        }
      });

      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      if (dropped && placedItems.length === 3) {
        checkGrowResult();
      }
    });
  });

  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-3/index.html";
  });

  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  function checkGrowResult() {
    const isValid = correctItems.every(id => placedItems.includes(id));
    const xpVal = document.getElementById('xp-value');

    if (isValid) {
      if (!playerState.isCompleted("2")) {
        let xp = playerState.getXP();
        playerState.setXP(xp + 5);
        playerState.markCompleted("2");
        playerState.save();
      }
      xpVal.textContent = playerState.getXP();
      resultText.textContent = "✅ Crops successfully planted!";
      resultBox.style.display = "block";
    } else {
      resultText.textContent = "❌ Something’s not right in the soil...";
      resultBox.style.display = "block";

      placedItems = [];
      cells.forEach(cell => {
        const item = cell.querySelector('img');
        if (item) item.remove();
      });
    }
  }
});
