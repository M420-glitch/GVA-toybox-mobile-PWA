document.addEventListener('DOMContentLoaded', () => {
  // Load player XP/state
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  // Correct items that must be placed (from desktop: seed, water-can, sun)
  const correctItems = ['seed', 'water-can', 'sun'];

  // Query draggable elements and drop zone containers
  const draggables = document.querySelectorAll('.draggable');
  const dropZoneContainers = document.querySelectorAll('.drop-zone-container');
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let placedItems = [];

  // Track which container has an item
  const containerHasItem = [false, false, false];

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

      // Loop through all drop zone containers to check drop validity
      dropZoneContainers.forEach((container, index) => {
        const containerRect = container.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        // Check if the clone's center is inside the container
        const isInside =
          centerX >= containerRect.left &&
          centerX <= containerRect.right &&
          centerY >= containerRect.top &&
          centerY <= containerRect.bottom;

        // Accept drop only if container is empty
        if (isInside && !containerHasItem[index]) {
          const id = activeOriginal.dataset.id;
          if (!placedItems.includes(id)) {
            placedItems.push(id);
            const placed = activeOriginal.cloneNode(true);
            placed.classList.remove('draggable');
            container.appendChild(placed);
            dropped = true;
            containerHasItem[index] = true; // Mark container as having an item
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
      dropZoneContainers.forEach((container, index) => {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        containerHasItem[index] = false; // Reset container item status
      });
    }
  }
});
