---

## 🚀 GVA Toybox – Mobile PWA Build (`Toybox-test-PWA`)

### ✅ Status: Installable PWA (Standalone Mode Active)

This version of the GVA Toybox has full **Progressive Web App capabilities**. It supports app-like installation directly from a browser (no App Store or Play Store required).

---

## 📱 PWA Features Enabled

- ✅ `manifest.json` with name, icon, theme, and display mode
- ✅ `service-worker.js` registered at root
- ✅ `display: standalone` for fullscreen, chrome-free launch
- ✅ `100dvh` layout with `--vh` fallback for mobile UI precision
- ✅ Touch-first interface with clone-based drag
- ✅ Scroll + zoom completely locked

---

## 📂 Files in This Build

| File                | Purpose                                   |
|---------------------|--------------------------------------------|
| `index.html`        | Game layout and service worker registration |
| `style.css`         | Full portrait styling and layout locking    |
| `game.js`           | Drag logic and success flow                 |
| `manifest.json`     | Metadata to allow install                   |
| `service-worker.js` | Minimal install-enabler service worker      |
| `icon.png`          | Install icon (512×512 or scalable SVG)      |

---

## 🧪 Install Test Checklist (All Devices)

### 🔍 General
- [ ] Visit site via browser (Chrome recommended)
- [ ] Ensure manifest loads in DevTools → Application → Manifest
- [ ] Confirm "display: standalone" is recognized
- [ ] See install prompt (or tap ⋮ → Add to Home screen)

### ✅ After Installation (From Homescreen)
- [ ] App opens **fullscreen** (no browser bar)
- [ ] Screen is **fixed** (no vertical or horizontal scroll)
- [ ] Drag-and-drop works exactly like native app
- [ ] Works identically in portrait on:
  - [ ] ✅ Samsung S6
  - [ ] ✅ Samsung S10
  - [ ] ✅ Pixel / Android emulator
  - [ ] ✅ Modern iPhone Safari (add-to-home-screen)

### ⚠️ Optional Advanced Checks
- [ ] App works offline (if offline cache added)
- [ ] Manifest updates pull on app relaunch
- [ ] User sees no zoom or scale UI allowed

---

## 💡 Next Up

| Phase             | Description                                      |
|------------------|--------------------------------------------------|
| Offline Support   | Add caching layer to `service-worker.js`         |
| Landscape Mode    | Build separate CSS + layout for landscape toggle |
| Desktop View      | Integrate install fallback for desktop Chrome    |
| XP System         | Hook drag placements to XP logic + playerState   |

---

## 📍 Deployment

This version is hosted on GitHub Pages and installable via browser.

> Push to:
> `https://m420-glitch.github.io/GVA-toybox-mobile-tests/`  
> (or your active repo branch)

---

Let me know if you want a **print-friendly testing checklist**, QR-code launcher sheet, or an **offline-enabled service worker** next. You're running a pro-grade mobile experience now. 📲✅



# 📦 GVA Toybox – Mobile Portrait Build (v1.0)

### ✅ Status: PWA-Ready (Manifest Only)

This folder represents the **final pre-PWA build** of the GVA mobile toybox experience, with working fullscreen portrait layout, draggable interactions, and install scaffolding in place.

---

## 🧱 Features Implemented

- 6×6 grid (54px per cell) for placing items
- 12 draggable blocks (also 54px) from a toolbox
- Clone-based touch dragging (mobile-friendly)
- Works on Samsung S6, S10, and modern devices
- CSS: 100dvh with dynamic `--vh` variable fallback
- Locked zoom/scroll behavior
- Manual z-index layering for drag visibility
- `manifest.json` created for PWA testing

---

## 📂 Project Contents

| File               | Purpose                              |
|--------------------|--------------------------------------|
| `index.html`       | Main HTML layout                     |
| `style.css`        | Grid, drag styling, and layout fixes |
| `game.js`          | Drag-and-drop + result logic         |
| `manifest.json`    | PWA metadata (display: standalone)   |

---

## 🚧 Not Yet Added

| Missing             | Notes                               |
|---------------------|-------------------------------------|
| `service-worker.js` | Needed to activate true PWA mode    |
| PWA Install Prompt  | Will only appear once service worker is active |
| Offline support     | Optional for future versions        |

---

## ✨ What's Next

We will now:
1. Make a new folder: `Toybox-test-PWA`
2. Copy all files from this folder
3. Add the `service-worker.js`
4. Register it inside the new `index.html`
5. Push to GitHub Pages and test real installation

---

## 📍 Bookmark

This folder is the last stable build **before enabling PWA installation**.
You can return here for rollback or reference.










THE TEMPLATES WILL TIE INTO THIS THINKING:


# GVA Toybox Refactor – README

## Purpose:
Unify all Toyboxes (1–18) with consistent playerState.js integration, XP tracking, and navigation controls.

---

## GLOBAL SETUP

### playerState.js
- ✅ Located one level above all Toyboxes
- ✅ Tracks XP, visited Toyboxes, decisions
- ✅ Must be loaded in every Toybox with:
  ```html
  <script src="../playerState.js"></script>


UNIVERSAL CONTROLS TO ADD TO ALL TOYBOXES (Top Left)
HTML

<div id="top-left-controls">
  <button onclick="goToMap()">🗺️ Progress Map</button>
  <button onclick="saveAndExit()">💾 Save & Exit</button>
</div>


CSS
css
Copy
Edit
#top-left-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

#top-left-controls button {
  background: #222;
  color: #0ff;
  border: 2px solid #0ff;
  padding: 6px 10px;
  font-family: monospace;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

#top-left-controls button:hover {
  background: #0ff;
  color: #111;
}
JS
js
Copy
Edit
function goToMap() {
  window.location.href = "../ProgressMap/index.html"; // Adjust path if needed
}

function saveAndExit() {
  playerState.save();
  window.location.href = "../ExitScreen/index.html"; // Adjust path if needed
}
✅ Add these to every Toybox that expects XP persistence and global nav.

TODO NEXT:
 Add consistent XP counter (top right) to all Toyboxes

 Add playerState.load() and .save() triggers

 Track visited Toyboxes in playerState

 Add fork logic (where applicable) based on XP or decisions******************************************* V0.1********************



**************************** V0.2**********************************************************
Here is your updated `README.md` incorporating **all previous details** plus the new requirements for refactoring Toyboxes 1–10:

---

# GVA Toybox Refactor – README

## Purpose:
Unify all Toyboxes (1–18) with consistent `playerState.js` integration, XP tracking, and navigation controls.

---

## 🔧 GLOBAL SETUP

### ✅ playerState.js
- Must be placed **one level above** all Toyboxes (`../playerState.js`)
- Tracks:
  - XP
  - Visited Toyboxes
  - Decisions (planned)
- Load this script in **every Toybox** with:
```html
<script src="../playerState.js"></script>
```

---

## 🕹 UNIVERSAL CONTROLS (TOP LEFT NAV)

### HTML
```html
<div id="top-left-controls">
  <button onclick="goToMap()">🗺️ Progress Map</button>
  <button onclick="saveAndExit()">💾 Save & Exit</button>
</div>
```

### CSS
```css
#top-left-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

#top-left-controls button {
  background: #222;
  color: #0ff;
  border: 2px solid #0ff;
  padding: 6px 10px;
  font-family: monospace;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

#top-left-controls button:hover {
  background: #0ff;
  color: #111;
}
```

### JS
```js
function goToMap() {
  window.location.href = "../ProgressMap/index.html"; // Adjust path if needed
}

function saveAndExit() {
  playerState.save();
  window.location.href = "../ExitScreen/index.html"; // Adjust path if needed
}
```

✅ These controls must be added to **every Toybox** that expects XP persistence and global navigation.

---

## 💠 XP COUNTER (TOP RIGHT)

### ❌ REMOVE any previous "dummy" or standalone XP counters from Toyboxes 1–10.

### ✅ REPLACE with this universal counter:

#### HTML
```html
<div id="xp-counter">XP: <span id="xp-value">--</span></div>
```

#### JS
```js
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("xp-value").textContent = playerState.getXP();
});
```

#### CSS (if not already present)
```css
#xp-counter {
  position: fixed;
  top: 10px;
  right: 20px;
  font-size: 18px;
  color: #0ff;
  background: #222;
  padding: 6px 10px;
  border-radius: 4px;
  border: 2px solid #0ff;
}
```

---

## ✅ TODO NEXT:

- [ ] **Refactor Toyboxes 1–10:**
  - Remove any hardcoded or non-persistent XP logic
  - Add `playerState.js` + XP counter using the format above
  - Include top-left nav buttons (map + save/exit)
  - Add `playerState.load()` on page load
  - Track visited Toyboxes (TBD)

- [ ] Add XP award mechanism **only once per Toybox** (e.g., using flags in `playerState`)

- [ ] Prepare fork logic (e.g., which Toybox unlocked based on XP or previous choice)

---

Let me know if you want this written as a `.md` file download.

***************************************************************************************************
COLOUR CODING:

Here’s a breakdown based on your requirements for the XP points format across different paths, using the colors and effects accordingly. I'll also pull the relevant formats from Toybox 1 and the 11A version for consistency.

### Updated Readme:

---

# GVA Toybox Refactor – README

## Purpose:
Unify all Toyboxes (1–18) with consistent `playerState.js` integration, XP tracking, and navigation controls.

---

## 💠 XP COUNTER – COLORS & STYLES (Single Funnel & Path-Specific Branding)

### **General Guidelines**
The XP counter will display differently depending on the current path a player is on, as follows:

1. **Single Funnel Path (Toyboxes 1–10)**:
   - **Color**: **Pale Yellow** (for a simpler XP tracking experience)
   - **No animation or special effects.**
   
   **HTML:**
   ```html
   <div id="xp-counter">XP: <span id="xp-value">--</span></div>
   ```

   **JS:**
   ```js
   window.addEventListener("DOMContentLoaded", () => {
     document.getElementById("xp-value").textContent = playerState.getXP();
   });
   ```

   **CSS:**
   ```css
   #xp-counter {
     position: fixed;
     top: 10px;
     right: 20px;
     font-size: 18px;
     color: #fff;
     background: #222;
     padding: 6px 10px;
     border-radius: 4px;
     border: 2px solid #fff;
   }
   ```

2. **Gamers Guild (Path A – Toyboxes 11A, 12A, etc.):**
   - **Color**: **Black** (with animation and flashing effects)
   
   **HTML:**
   ```html
   <div id="xp-counter">XP: <span id="xp-value">--</span></div>
   ```

   **JS:**
   ```js
   window.addEventListener("DOMContentLoaded", () => {
     document.getElementById("xp-value").textContent = playerState.getXP();
   });
   ```

   **CSS:**
   ```css
   #xp-counter {
     position: fixed;
     top: 10px;
     right: 20px;
     font-size: 18px;
     color: #0ff; /* Flashing Color */
     background: #222;
     padding: 6px 10px;
     border-radius: 4px;
     border: 2px solid #0ff;
   }

   .xp-flash {
     color: #28a745;
     font-weight: bold;
     animation: flash 0.4s ease-in-out;
   }

   @keyframes flash {
     0% { transform: scale(1.1); color: #28a745; }
     50% { transform: scale(1.3); color: #4caf50; }
     100% { transform: scale(1); color: #28a745; }
   }
   ```

3. **Bud Brigade (Path B):**
   - **Color**: **Green**
   - **No Flashing, but with a smooth color shift to represent Bud Brigade's journey.**

   **CSS** (Path B):
   ```css
   #xp-counter {
     position: fixed;
     top: 10px;
     right: 20px;
     font-size: 18px;
     color: #4caf50; /* Bud Brigade Green */
     background: #222;
     padding: 6px 10px;
     border-radius: 4px;
     border: 2px solid #4caf50;
   }
   ```

4. **Crypto Crew (Path C):**
   - **Color**: **Blue**
   - **No Flashing, with smooth color transitions.**

   **CSS** (Path C):
   ```css
   #xp-counter {
     position: fixed;
     top: 10px;
     right: 20px;
     font-size: 18px;
     color: #2196F3; /* Crypto Crew Blue */
     background: #222;
     padding: 6px 10px;
     border-radius: 4px;
     border: 2px solid #2196F3;
   }
   ```

5. **Defiant Disruptors (Path D):**
   - **Color**: **Red**
   - **No Flashing, steady color to represent the Defiant Disruptors’ strong-willed path.**

   **CSS** (Path D):
   ```css
   #xp-counter {
     position: fixed;
     top: 10px;
     right: 20px;
     font-size: 18px;
     color: #f44336; /* Defiant Disruptors Red */
     background: #222;
     padding: 6px 10px;
     border-radius: 4px;
     border: 2px solid #f44336;
   }
   ```

---

## 🔧 GLOBAL SETUP

### ✅ playerState.js
- Must be placed **one level above** all Toyboxes (`../playerState.js`)
- Tracks:
  - XP
  - Visited Toyboxes
  - Decisions (planned)
- Load this script in **every Toybox** with:
```html
<script src="../playerState.js"></script>
```

---

## 🕹 UNIVERSAL CONTROLS (TOP LEFT NAV)

### HTML
```html
<div id="top-left-controls">
  <button onclick="goToMap()">🗺️ Progress Map</button>
  <button onclick="saveAndExit()">💾 Save & Exit</button>
</div>
```

### CSS
```css
#top-left-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

#top-left-controls button {
  background: #222;
  color: #0ff;
  border: 2px solid #0ff;
  padding: 6px 10px;
  font-family: monospace;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

#top-left-controls button:hover {
  background: #0ff;
  color: #111;
}
```

### JS
```js
function goToMap() {
  window.location.href = "../ProgressMap/index.html"; // Adjust path if needed
}

function saveAndExit() {
  playerState.save();
  window.location.href = "../ExitScreen/index.html"; // Adjust path if needed
}
```

---

## ✅ TODO NEXT:

- [ ] **Refactor Toyboxes 1–10:**
  - Remove any hardcoded or non-persistent XP logic
  - Add `playerState.js` + XP counter using the format above
  - Include top-left nav buttons (map + save/exit)
  - Add `playerState.load()` on page load
  - Track visited Toyboxes (TBD)

- [ ] Add XP award mechanism **only once per Toybox** (e.g., using flags in `playerState`)

- [ ] Prepare fork logic (e.g., which Toybox unlocked based on XP or previous choice)

---

Let me know if any tweaks are needed!


To refresh XP points - Open your Toybox or Progress Map in the browser.

Right-click → Inspect → Go to Console tab.

Paste this:

js
Copy
Edit
localStorage.setItem('playerXP', '0');
Hit Enter.

Refresh the page — your XP will now be 0.


To refresh a meme pledge page: 

Got to dev tools and find the application tab:
On the left under Storage, expand Local Storage

Click your site (e.g., file:// or localhost)

Find meMes key → right-click → Delete

Reload your page

>> git add .
>> git commit -m "Initial commit"
>> git push -u origin main
error: remote origin already exists.
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it