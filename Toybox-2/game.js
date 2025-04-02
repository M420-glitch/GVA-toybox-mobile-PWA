document.addEventListener('DOMContentLoaded', () => {
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  const correctItems = ['seed', 'water-can', 'sun'];
  const draggables = document.querySelectorAll('.draggable');
  const cells = document.querySelectorAll('.cell');
  const resultBox = document.getElementById('result-box');
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
      cells.forEach(cell => {
        const cellRect = cell.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        const isInside =
          centerX >= cellRect.left &&
          centerX <= cellRect.right &&
          centerY >= cellRect.top &&
          centerY <= cellRect.bottom;

        if (isInside && cell.children.length === 0) {
          const id = activeOriginal.dataset.id;
          placedItems.push(id);

          const placed = activeOriginal.cloneNode(true);
          placed.classList.remove('draggable');
          cell.appendChild(placed);
        }
      });

      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      if (placedItems.length === 3) {
        const isValid = correctItems.every(item => placedItems.includes(item));
        if (isValid && !playerState.isCompleted("2")) {
          let xp = playerState.getXP();
          playerState.setXP(xp + 5);
          playerState.markCompleted("2");
          playerState.save();
        }

        document.getElementById('xp-value').textContent = playerState.getXP();
        resultBox.style.display = 'block';
      }
    });
  });

  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-3/index.html";
  });
});
