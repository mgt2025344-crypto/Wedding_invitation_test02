# Lavender Wedding Invitation — Premium 2.0

## 1. Project overview
A digital wedding invitation made with plain HTML, CSS and JavaScript (no frameworks). It has an opening screen, a scratch-to-reveal date, the couple, wedding details, a live countdown, a venue map and a thank-you section. **Almost everything you change is in one place: the `weddingConfig` block at the top of `script.js`.**

## 2. Folder structure
```
index.html        page structure (rarely edit)
style.css         colors, fonts, layout
script.js         weddingConfig (EDIT THIS) + interactions (do not edit below the config)
README.md         this guide
assets/images/    every picture used by the site
```

## 3. Open and preview
Double-click `index.html` to open it in your browser. After each change, save the file and press refresh (F5). Tip: VS Code with the "Live Server" extension refreshes automatically.

## Image table
| File (in `assets/images/`) | Used in | Size | Format | Transparent? |
|---|---|---|---|---|
| `wedding-couple.png` | Opening screen + Thank-you | 1200×800 px (3:2) | PNG | **Yes** |
| `bride-photo.jpg` | Couple, bride card | 800×1000 px (4:5) | JPG / WebP | No |
| `groom-photo.jpg` | Couple, groom card | 800×1000 px (4:5) | JPG / WebP | No |
| `venue.jpg` | Venue section | 1500×1000 px (3:2) | JPG / WebP | No |
| `background-floral.jpg` | Soft background behind the date | 1600×1000 px | JPG / WebP | No |

Keep every photo under about 300 KB so the invitation opens fast on WhatsApp links (use squoosh.app to shrink).

## 4. Replace the couple illustration
File: `assets/images/wedding-couple.png`. Copy your new transparent PNG into that folder with **exactly the same name**. Keep the same width-to-height ratio so nobody is cut off. Do not rename it unless you also change `coupleIllustration` in `script.js`.

## 5. Replace bride and groom photos
Files: `assets/images/bride-photo.jpg` and `groom-photo.jpg`. Use portrait photos (4:5) with the face in the upper half. Same filename = automatic update. If you use `.webp`, change the name in `weddingConfig.images` (`bridePhoto: "assets/images/bride-photo.webp"`).

## 6. Replace background images
File: `assets/images/background-floral.jpg`. Pick a soft, light picture; it is shown faded behind the date.

## 7. Add or replace venue images
File: `assets/images/venue.jpg`, landscape 3:2. Replace it with the same filename.

## 8. Change wedding names
In `script.js`:
```js
brideName: "Emma Rose",
groomName: "James Wilson",
```
Names update everywhere. Do not delete the quotes or commas.

## 9. Change the wedding date
```js
weddingDate: "2026-12-25T10:00:00",
```
Format `YYYY-MM-DDTHH:MM:SS`, 24-hour clock. The big date and the countdown update by themselves. Keep the `T` in the middle.

## 10. Change ceremony and reception times
```js
ceremonyTime: "10:00 AM",
receptionTime: "6:00 PM",
```
These are display text only. The countdown uses `weddingDate`, so update both.

## 11. Change venue information
```js
venueName: "The Grand Garden",
venueAddress: "12 Garden Road, Colombo",
```

## 12. Add Google Maps
1. Open Google Maps and search for your real venue.
2. Click **Share**.
3. Choose **Embed a map**, then **COPY HTML**.
4. You get code like `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12..." ...></iframe>`.
5. Copy **only** the address inside `src="..."`.
6. Paste it here:
```js
googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12...",
```
Until you paste a real link, the site shows a tidy placeholder instead of a broken map. The map resizes on phones and desktops.

## 13. Change the "Get directions" button
Back in Google Maps click **Share → Copy link** (the "Send a link" tab) and paste it:
```js
googleMapsDirectionsUrl: "https://maps.app.goo.gl/AbCdEf12345",
```
This is a different link from the embed link. Do not paste the same one in both.

## 14. Customize colors
Open `style.css`. At the top, edit the `:root` block:
```css
--lav-600:#7b5ea7;  /* main lavender */
--gold:#c9a96e;     /* gold lines */
--ivory:#fbf8f2;    /* page background */
```
Use hex colors (use a color picker site). Change only the part after the colon.

## 15. Change fonts
1. Pick fonts at fonts.google.com and copy the `<link>` in `index.html` (the `fonts.googleapis.com` line).
2. In `style.css` change `--font-body` and `--font-script`, e.g. `--font-script:"Great Vibes",cursive;`.

## 16. Publish on GitHub Pages
1. Create a GitHub repository and upload all files, keeping the `assets` folder.
2. Go to **Settings → Pages**.
3. Under **Branch** choose `main` and `/ (root)`, then **Save**.
4. After about a minute your link appears, like `https://yourname.github.io/repository-name/`. Send it on WhatsApp.

Filenames are case-sensitive on GitHub: `Bride-Photo.jpg` is not `bride-photo.jpg`.

## Quick start for a new couple
1. Copy the whole folder and rename it.
2. Replace the five images (keep filenames).
3. Edit `weddingConfig` in `script.js` (names, date, times, venue, texts).
4. Paste the two Google Maps links.
5. Refresh, check on your phone, then publish.

## Good to know
- The gallery section from the sample structure is not included in this version.
- Image paths are set only in `weddingConfig.images`; the HTML comments next to each image point back there.
- Animations switch off automatically for visitors who prefer reduced motion.
