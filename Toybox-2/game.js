document.addEventListener('DOMContentLoaded', () => {
  // Load player XP/state
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  // Correct items that must be placed (from desktop: seed, water-can, sun)
  const correctItems = ['seed', 'water-can', 'sun'];

  // Query draggable elements and grid cells (only drop zones are valid)
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

  // Touch event listeners for each draggable
  draggables.forEach(el => {
    el.addEventListener('touchstart', (event) => {
      activeOriginal = el;
      const rect = el.getBoundingClientRect();
      offsetX = event.touches[0].clientX - rect.left;
      offsetY = event.touches[0].clientY - rect.top;

      // Create a clone for dragging
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

      // Loop through all cells to check drop validity
      cells.forEach(cell => {
        const cellRect = cell.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        // Check if the clone's center is inside the cell
        const isInside =
          centerX >= cellRect.left &&
          centerX <= cellRect.right &&
          centerY >= cellRect.top &&
          centerY <= cellRect.bottom;

        // Accept drop only if cell is a valid drop zone and empty
        if (isInside && cell.classList.contains('drop-zone') && cell.children.length === 0) {
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

      // Remove the clone regardless of drop success
      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      // If a valid drop occurred and we now have 3 items placed, check result
      if (dropped && placedItems.length === 3) {
        checkGrowResult();
      }
    });
  });

  // Continue button navigates to Toybox-3
  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-3/index.html";
  });

  // Helper function to move the clone element
  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  // Check if the placed items are correct
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

      // Reset: clear all items from drop zones and reset placed items
      placedItems = [];
      cells.forEach(cell => {
        if (cell.classList.contains('drop-zone')) {
          while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
          }
        }
      });
    }
  }
});
