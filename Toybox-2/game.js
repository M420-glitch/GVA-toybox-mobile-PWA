window.addEventListener("DOMContentLoaded", () => {
  playerState.load();
  document.getElementById("xp-value").textContent = playerState.getXP();
});

let dragged = null;
let placedItems = [];
const correctItems = ['seed', 'water-can', 'sun'];

document.querySelectorAll('.draggable').forEach(el => {
  el.addEventListener('dragstart', e => {
    dragged = e.target;
    setTimeout(() => e.target.style.visibility = 'hidden', 0);
  });

  el.addEventListener('dragend', e => {
    e.target.style.visibility = 'visible';
  });
});

document.querySelectorAll('.slot').forEach(slot => {
  slot.addEventListener('dragover', e => e.preventDefault());

  slot.addEventListener('drop', e => {
    e.preventDefault();
    if (!dragged || slot.children.length > 0) return;

    dragged.style.visibility = 'visible';
    dragged.setAttribute('draggable', 'false');
    dragged.style.position = 'static';
    slot.appendChild(dragged);
    placedItems.push(dragged.id);
    dragged = null;

    if (placedItems.length === 3) checkResult();
  });
});

function checkResult() {
  const isValid = correctItems.every(item => placedItems.includes(item));
  if (isValid) {
    if (!playerState.isCompleted("2")) {
      let xp = playerState.getXP() + 5;
      playerState.setXP(xp);
      playerState.markCompleted("2");
      playerState.save();
      document.getElementById("xp-value").textContent = xp;
    }
    document.getElementById("completion-buttons").style.display = 'flex';
  } else {
    alert("❌ Something’s wrong in the soil.");
    resetDropzone();
  }
}

function resetDropzone() {
  placedItems = [];
  document.querySelectorAll('.slot').forEach(slot => {
    const img = slot.querySelector('img');
    if (img) {
      document.getElementById('toolbox').appendChild(img);
      img.setAttribute('draggable', 'true');
      img.style.position = 'static';
    }
  });
}

function goToNext() {
  window.location.href = "../Toybox-3/index.html";
}

function goToMap() {
  window.location.href = "../ProgressMap/index.html";
}

function saveAndExit() {
  playerState.save();
  alert("Game saved.");
}
