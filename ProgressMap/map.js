let deferredPrompt;

window.addEventListener("DOMContentLoaded", () => {
  playerState.load();
  const currentXP = playerState.getXP();
  document.getElementById("xp-display").textContent = `Current XP: ${currentXP}`;

  document.querySelectorAll("button[data-xp]").forEach(btn => {
    const requiredXP = parseInt(btn.getAttribute("data-xp"));
    const toyboxId = btn.textContent;

    if (playerState.isCompleted(toyboxId)) {
      btn.classList.add("completed");
    } else if (currentXP >= requiredXP) {
      btn.classList.add("unlocked");
    } else {
      btn.disabled = true;
      btn.classList.add("locked");
    }
  });
});

// Navigate to toybox
function goTo(folderName) {
  window.location.href = `../${folderName}/index.html`;
}

// PWA install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-btn').style.display = 'inline-block';
});

document.getElementById('install-btn').addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(result => {
      deferredPrompt = null;
      document.getElementById('install-btn').style.display = 'none';
    });
  }
});
