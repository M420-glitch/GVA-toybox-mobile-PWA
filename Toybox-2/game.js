document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro-modal');
  const startButton = document.getElementById('start-button');
  const gameContainer = document.getElementById('game-container');
  const xpDisplay = document.getElementById('xp-value');
  const correctItems = ['seed', 'water-can', 'sun'];
  const resultBox = document.getElementById('result-box');
  const resultText = document.getElementById('result-text');
  const continueBtn = document.getElementById('btn-continue');

  let activeClone = null;
  let activeOriginal = null;
  let offsetX = 0;
  let offsetY = 0;
  let placedItems = [];

  const validDropIndices = [18, 19, 20, 21, 22, 23]; // A3–F3 row
  const cells = [...document.querySelectorAll('.cell')];

  startButton.addEventListener('click', () => {
    intro.style.display = 'none';
    gameContainer.classList.remove('hidden');
    playerState.load();
    xpDisplay.textContent = playerState.getXP();
  });

  document.querySelectorAll('.draggable').forEach(el => {
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
      let dropped = false;

      cells.forEach(cell => {
        const rect = cell.getBoundingClientRect();
        const cx
