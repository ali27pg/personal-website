# Md Ali Akbar — Academic Portfolio Website

A single-page academic portfolio. No frameworks, no build step — just open it.

## View it locally (2 options)

**Option A — double-click (easiest)**
1. Unzip this folder anywhere on your computer.
2. Double-click `index.html` — it opens in your browser. Done.

**Option B — local server (most reliable)**
1. Open a terminal in this folder.
2. Run: `python3 -m http.server 8000` (Windows: `python -m http.server 8000`)
3. Open `http://localhost:8000` in your browser.

> The fancy fonts load from Google Fonts, so they need internet once.
> Offline, the site falls back to system fonts and still looks fine.

## Edit it

- **Text** — open `index.html` in Notepad / VS Code / any text editor, find the
  section (they're labelled `01 About`, `02 Research`, …) and edit the words.
- **Photo** — replace `assets/portrait.jpg` with your new photo (keep the same
  file name; a 4:5 portrait crop works best).
- **CV** — replace `assets/Md_Ali_Akbar_CV.pdf` with your updated CV
  (keep the same file name so the download button keeps working).
- **Colours/fonts** — all in `styles.css` (`:root` block at the top).

## Put it online (free)

- **GitHub Pages:** create a repo, upload these files, Settings → Pages → Deploy from branch.
- **Vercel:** drag this folder into vercel.com → instant link.
- **Netlify Drop:** drag this folder into app.netlify.com/drop.

## Files

- `index.html` — all content
- `styles.css` — all styling
- `script.js` — menu, animations, counters
- `assets/portrait.jpg` — profile photo
- `assets/Md_Ali_Akbar_CV.pdf` — downloadable CV
- `assets/Md_Ali_Akbar_CV.docx` — editable CV source
