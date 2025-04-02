let xp = 0;
const xpCount = document.getElementById('xp-count');
const continueBtn = document.getElementById('continue-btn');
const draggables = document.querySelectorAll('.draggable');
const slots = document.querySelectorAll('.slot');

draggables.forEach(elem => {
  elem.addEventListener('dragstart', dragStart);
  elem.addEventListener('touchstart', dragStartTouch, { passive: false });
});

slots.forEach(slot => {
  slot.addEventListener('dragover', dragOver);
  slot.addEventListener('drop', drop);
  slot.addEventListener('touchmove', touchMove);
  slot.addEventListener('touchend', touchDrop);
});

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData('text/plain');
  checkMatch(draggedId, e.target);
}

function dragStartTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const img = e.target;
  img.classList.add('dragging');
  img.startX = touch.clientX;
  img.startY = touch.clientY;
}

function touchMove(e) {
  e.preventDefault();
}

function touchDrop(e) {
  const touch = e.changedTouches[0];
  const dragged = document.querySelector('.dragging');
  if (!dragged) return;
  dragged.classList.remove('dragging');

  const elemAtPoint = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elemAtPoint && elemAtPoint.classList.contains('slot')) {
    const draggedId = dragged.dataset.id;
    checkMatch(draggedId, elemAtPoint);
  }
}

function checkMatch(draggedId, slot) {
  if (slot.dataset.match === draggedId && slot.children.length === 0) {
    const dragged = document.querySelector(`.draggable[data-id="${draggedId}"]`);
    slot.appendChild(dragged);
    dragged.style.pointerEvents = "none";
    xp += 5;
    xpCount.textContent = xp;
    checkCompletion();
  }
}

function checkCompletion() {
  const allMatched = [...slots].every(slot => slot.children.length > 0);
  if (allMatched) {
    continueBtn.style.display = 'block';
  }
}
