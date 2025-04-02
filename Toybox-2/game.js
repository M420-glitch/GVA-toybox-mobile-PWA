document.addEventListener('DOMContentLoaded', () => {
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  const draggables = document.querySelectorAll('.draggable');
  const slots = document.querySelectorAll('.cell');
  const correctItems = ['seed', 'water-can', 'sun'];
  let droppedItems = [];

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;

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
      slots.forEach(slot => {
        const rect = slot.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        const isInside = centerX >= rect.left && centerX <= rect.right &&
                         centerY >= rect.top && centerY <= rect.bottom;

        if (isInside && slot.children.length === 0) {
          const id = activeOriginal.dataset.id;
          if (!droppedItems.includes(id)) {
            droppedItems.push(id);
            const placed = activeOriginal.cloneNode(true);
            placed.classList.remove('draggable');
            slot.appendChild(placed);
          }
        }
      });

      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      if (droppedItems.length === 3) checkResult();
    });
  });

  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  function checkResult() {
    const isCorrect = correctItems.every(item => droppedItems.includes(item));
    if (isCorrect) {
      awardXP();
      document.getElementById('result-box').style.display = 'block';
    } else {
      alert('❌ Something’s not right in the soil... Try again.');
      reset();
    }
  }

  function reset() {
    droppedItems = [];
    slots.forEach(slot => {
      while (slot.firstChild) {
        slot.removeChild(slot.firstChild);
      }
    });
  }

  function awardXP() {
    if (!playerState.isCompleted("2")) {
      let xp = playerState.getXP();
      playerState.setXP(xp + 5);
      playerState.markCompleted("2");
      playerState.save();
      document.getElementById('xp-value').textContent = playerState.getXP();
    }
  }

  document.getElementById('btn-continue').addEventListener('click', () => {
    window.location.href = "../Toybox-3/index.html";
  });
});
