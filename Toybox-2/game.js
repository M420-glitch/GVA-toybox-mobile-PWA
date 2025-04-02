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
    setTimeout(() => (e.target.style.visibility = 'hidden'), 0);
  });

  el.addEventListener('dragend', e => {
    e.target.style.visibility = 'visible';
  });
});

document.querySelectorAll('.grow-slot').forEach(slot => {
  slot.addEventListener('dragover', e => {
    e.preventDefault();
  });

  slot.addEventListener('drop', e => {
    e.preventDefault();
    if (!dragged || slot.children.length > 0) return;

    dragged.style.position = 'relative';
    dragged.style.left = '0px';
    dragged.style.top = '0px';
    dragged.style.margin = 'auto';
    dragged.style.width = '54px';
    dragged.setAttribute('draggable', 'false');

    slot.appendChild(dragged);
    placedItems.push(dragged.id);
    dragged = null;

    if (placedItems.length === 3) checkGrowResult();
  });
});

function checkGrowResult() {
  const gameArea = document.getElementById('game-area');
  const xpEl = document.getElementById('xp-value');

  const isValid = correctItems.every(item => placedItems.includes(item));

  if (isValid) {
    gameArea.classList.add('complete');
    gameArea.style.borderColor = '#28a745';

    if (!playerState.isCompleted("2")) {
      let xp = playerState.getXP() + 5;
      playerState.setXP(xp);
      playerState.markCompleted("2");
      xpEl.textContent = xp;
      xpEl.classList.add('xp-flash');
      setTimeout(() => xpEl.classList.remove('xp-flash'), 500);
    }

    document.getElementById('completion-buttons').style.display = 'block';

    setTimeout(() => {
      alert('✅ Crops successfully planted!');
      gameArea.classList.remove('complete');
      gameArea.style.borderColor = '#555';
    }, 1000);
  } else {
    gameArea.style.borderColor = '#b00020';
    setTimeout(() => {
      alert('❌ Something’s not right in the soil... Try again.');
      gameArea.style.borderColor = '#555';
      resetGrowArea();
    }, 1000);
  }
}

function resetGrowArea() {
  placedItems = [];
  document.querySelectorAll('.grow-slot').forEach(slot => {
    const item = slot.querySelector('img');
    if (item) {
      item.setAttribute('draggable', 'true');
      item.style.position = 'static';
      item.style.margin = '10px';
      document.getElementById('toolbox').appendChild(item);
    }
  });
}

document.getElementById('btn-continue').addEventListener('click', () => {
  window.location.href = '../Toybox-3/index.html';
});

document.getElementById('btn-exit').addEventListener('click', () => {
  console.log('Exit Toybox 2');
});

function goToMap() {
  window.location.href = "../ProgressMap/index.html";
}

function saveAndExit() {
  playerState.save();
  window.location.href = "../ExitScreen/index.html";
}

