document.addEventListener('DOMContentLoaded', () => {
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  const draggables = document.querySelectorAll('.draggable');
  const cells = document.querySelectorAll('.cell');
  const resultBox = document.getElementById('result-box');
  const continueBtn = document.getElementById('btn-continue');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let droppedItems = [];

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
          const value = activeOriginal.dataset.value;
          if (!droppedItems.includes(value)) {
            droppedItems.push(value);
            const placed = activeOriginal.cloneNode(true);
            placed.classList.remove('draggable');
            cell.appendChild(placed);
          }
        }
      });

      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      if (droppedItems.length === 12) {
        if (!playerState.isCompleted("1")) {
          let xp = playerState.getXP();
          playerState.setXP(xp + 5);
          playerState.markCompleted("1");
          playerState.save();
        }

        document.getElementById('xp-value').textContent = playerState.getXP();
        resultBox.style.display = 'block';
      }
    });
  });

  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-2/index.html";
  });

  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }
});
