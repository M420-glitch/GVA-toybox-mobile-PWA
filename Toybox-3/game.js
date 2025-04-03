document.addEventListener('DOMContentLoaded', () => {
  // Load player XP/state
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  // Correct items that must be placed (from desktop: sun, converter, light-bulb)
  const correctItems = ['sun', 'converter', 'light-bulb'];

  // Query draggable elements and drop zone containers
  const draggables = document.querySelectorAll('.draggable');
  const dropZones = document.querySelectorAll('.light-slot');
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');
  const resultModal = document.getElementById('result-modal');
  const modalResultText = document.getElementById('modal-result-text');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let placedItems = [];

  // Track if a drop zone has an item
  let dropZoneHasItem = [false, false, false];

  // Get the indices of the drop zones
  const dropZoneIndices = [19, 20, 21];

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

      // Loop through all drop zones to check drop validity
      dropZones.forEach((dropZone, index) => {
        const dropZoneRect = dropZone.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        // Check if the clone's center is inside the drop zone
        const isInside =
          centerX >= dropZoneRect.left &&
          centerX <= dropZoneRect.right &&
          centerY >= dropZoneRect.top &&
          centerY <= dropZoneRect.bottom;

        // Check if the drop zone already has an item
        if (isInside && !dropZoneHasItem[index]) {
          const id = activeOriginal.dataset.id;
          if (!placedItems.includes(id)) {
            placedItems.push(id);
            const placed = activeOriginal.cloneNode(true);
            placed.classList.remove('draggable');
            dropZone.appendChild(placed);
            dropped = true;
            dropZoneHasItem[index] = true;
          }
        }
      });

      // Remove the clone regardless of drop success
      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      // If a valid drop occurred and we now have 3 items placed, check result
      if (dropped) {
        if (placedItems.length === 3) {
          checkLightResult();
        }
      }
    });
  });

  // Continue button navigates to Toybox-4
  continueBtn.addEventListener('click', () => {
    window.location.href = "../Toybox-4/index.html";
  });

  // Helper function to move the clone element
  function moveClone(x, y) {
    activeClone.style.left = (x - offsetX) + 'px';
    activeClone.style.top = (y - offsetY) + 'px';
  }

  // Check if the placed items are correct
  function checkLightResult() {
    const isValid = correctItems.every(id => placedItems.includes(id));
    const xpVal = document.getElementById('xp-value');

    if (isValid) {
      if (!playerState.isCompleted("3")) {
        let xp = playerState.getXP();
        playerState.setXP(xp + 5);
        playerState.markCompleted("3");
        playerState.save();
      }
      xpVal.textContent = playerState.getXP();
      modalResultText.textContent = "✅ Crops successfully planted!";
      resultModal.classList.remove('hidden'); // Show the modal
    } else {
      modalResultText.textContent = "❌ Something’s not right in the soil...";
      resultModal.classList.remove('hidden'); // Show the modal

      // Reset: clear all items from drop zones and reset placed items
      placedItems = [];
      dropZoneIndices.forEach(dropZoneIndex => {
        const dropZone = document.querySelector(`.cell[data-index="${dropZoneIndex}"]`);
        while (dropZone.firstChild) {
          dropZone.removeChild(dropZone.firstChild);
        }
      });
      dropZoneHasItem = [false, false, false];
    }
  }
});

function goToMap() {
  window.location.href = "../ProgressMap/index.html"; // Adjust path if needed
}

function saveAndExit() {
  playerState.save(); // Save the current player state
  window.location.href = "../ExitScreen/index.html"; // Adjust path if needed
}
