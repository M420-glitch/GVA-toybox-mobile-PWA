function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true; // For iOS
}

document.addEventListener('DOMContentLoaded', () => {
  // Load player XP/state
  playerState.load();
  document.getElementById('xp-value').textContent = playerState.getXP();

  // Correct items that must be placed (from desktop: sun, converter, light-bulb)
  const correctItems = ['sun', 'converter', 'light-bulb'];

  // Correct order of items
  const correctOrder = [
    { dropZoneIndex: 19, itemId: 'sun' },
    { dropZoneIndex: 21, itemId: 'converter' },
    { dropZoneIndex: 23, itemId: 'light-bulb' }
  ];

  // Query draggable elements and drop zone containers
  const draggables = document.querySelectorAll('.draggable');
  const dropZones = document.querySelectorAll('.cell.drop-zone');
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');
  const resultModal = document.getElementById('result-modal');
  const modalResultText = document.getElementById('modal-result-text');
  const tryAgainBtn = document.getElementById('btn-try-again');
  const continue3Btn = document.getElementById('btn-continue-3');
  const returnMapBtn = document.getElementById('btn-return-map');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let placedItems = [];

  // Track if a drop zone has an item
  let dropZoneHasItem = [false, false, false];

  // Get the indices of the drop zones
  const dropZoneIndices = [19, 21, 23];

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
      dropZoneIndices.forEach((dropZoneIndex, index) => {
        const dropZone = document.querySelector(`.cell[data-index="${dropZoneIndex}"]`);
        const dropZoneRect = dropZone.getBoundingClientRect();
        const centerX = cloneRect.left + cloneRect.width / 2;
        const centerY = cloneRect.top + cloneRect.height / 2;

        // Check if the clone's center is inside the drop zone
        const isInside =
          centerX >= dropZoneRect.left &&
          centerX <= dropZoneRect.right &&
          centerY >= dropZoneRect.top &&
          centerY <= dropZoneRect.bottom;

        // Check if the drop zone is empty
        if (isInside && !dropZoneHasItem[index]) {
          const itemId = activeOriginal.dataset.id;
          const placed = activeOriginal.cloneNode(true);
          placed.classList.remove('draggable');
          dropZone.appendChild(placed);
          dropped = true;
          dropZoneHasItem[index] = true;
          placedItems.push({ dropZoneIndex: dropZoneIndex, itemId: itemId }); // Store the placed item
        }
      });

      // Remove the clone regardless of drop success
      document.body.removeChild(activeClone);
      activeClone = null;
      activeOriginal = null;

      // If a valid drop occurred and we now have 3 items placed, check result
      if (dropped) {
        if (placedItems.length === 3) {
          checkGrowResult();
        }
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
    const isValid = correctItems.every((itemId) => {
      return placedItems.some(placedItem => placedItem.itemId === itemId);
    });

    const xpVal = document.getElementById('xp-value');

    if (isValid) {
      if (!playerState.isCompleted("3")) {
        let xp = playerState.getXP();
        playerState.setXP(xp + 5);
        playerState.markCompleted("3");
        playerState.save();
      }
      xpVal.textContent = playerState.getXP();
      modalResultText.textContent = "✅ Light successfully generated!";
      resultModal.classList.remove('hidden'); // Show the modal
      // Hide the "Return to Map" button on success
      returnMapBtn.style.display = 'none';
      continue3Btn.style.display = 'inline-block';
    } else {
      modalResultText.textContent = "❌ Something’s not right in the setup...";
      resultModal.classList.remove('hidden'); // Show the modal
      // Show the "Return to Map" button on fail
      returnMapBtn.style.display = 'inline-block';
      continue3Btn.style.display = 'none';

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

  // Event listeners for modal buttons
  tryAgainBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden'); // Hide the modal
    // Reset the game state (clear placed items, etc.)
    placedItems = [];
    dropZoneIndices.forEach(dropZoneIndex => {
      const dropZone = document.querySelector(`.cell[data-index="${dropZoneIndex}"]`);
      while (dropZone.firstChild) {
        dropZone.removeChild(dropZone.firstChild);
      }
    });
    dropZoneHasItem = [false, false, false];
  });

  continue3Btn.addEventListener('click', () => {
    window.location.href = "../Toybox-3/index.html";
  });

  // Add event listener for the "Return to Map" button
  returnMapBtn.addEventListener('click', () => {
    window.location.href = "../map/index.html"; // Link to the progress map
  });

  if (isPWA()) {
    // Add a class to the body if it's a PWA
    document.body.classList.add('pwa-mode');
  }
});

function goToMap() {
  window.location.href = "../ProgressMap/index.html"; // Adjust path if needed
}

function saveAndExit() {
  playerState.save(); // Save the current player state
  window.location.href = "../ExitScreen/index.html"; // Adjust path if needed
}
