/* =====================================================================
   WEDDING CONFIGURATION  —  EDIT ONLY THIS BLOCK TO MAKE A NEW INVITATION
   Change the text between the quotes. Do not remove the quotes or commas.
   ===================================================================== */
const weddingConfig = {
  // Names shown on the opening screen, couple section and thank-you section
  brideName: "Emma Rose",
  groomName: "James Wilson",

  // Wedding date and time. Format: "YYYY-MM-DDTHH:MM:SS" (24-hour clock).
  // The big date, the details and the countdown all use this one value.
  weddingDate: "2026-12-25T10:00:00",

  // Times shown in the Wedding details cards (any text you like)
  ceremonyTime: "10:00 AM",
  receptionTime: "6:00 PM",

  // Venue name and address shown in the Venue section
  venueName: "The Grand Garden",
  venueAddress: "Your wedding venue address",

  // GOOGLE MAPS: paste ONLY the link from src="..." of the "Embed a map" code.
  // It looks like https://www.google.com/maps/embed?pb=... (see README).
  // Leave the PASTE text as it is to show a neat placeholder instead.
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6523675143762!2d79.99148937409856!3d6.438671993552576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae22dd515555555%3A0xe52f6659d1618548!2sResort%20Sun%20%26%20Moon!5e0!3m2!1sen!2slk!4v1793437136299!5m2!1sen!2slk",

  // GOOGLE MAPS: paste the normal Share link, used by the "Get directions" button.
  googleMapsDirectionsUrl: "https://maps.app.goo.gl/kNHzydPByyDee8WJ8",

  // Short texts
  brideDescription: "Warm, thoughtful and endlessly kind. She loves lavender fields, old books and long walks at sunset.",
  groomDescription: "Calm, funny and loyal. He loves good music, early mornings and making her laugh.",
  invitationMessage: "With joyful hearts, we invite you to celebrate the beginning of our forever.",
  thankYouMessage: "Thank you for being part of our story. Your love and blessings mean the world to us.",

  // IMAGE PATHS — to change a picture, replace the file with the SAME filename
  // (or change the filename here). All pictures live in assets/images/
  images: {
    // Transparent PNG of the couple (opening screen + thank-you section)
    coupleIllustration: "./wedding-couple.png",
    // Bride photo, 4:5 portrait (Couple section)
    bridePhoto: "./bride-photo.jpg",
    // Groom photo, 4:5 portrait (Couple section)
    groomPhoto: "./groom-photo.jpg",
    // Venue photo, 3:2 landscape (Venue section)
    venuePhoto: "https://lh3.googleusercontent.com/grass-cs/AABkmLdOS5UMhtKIefQ4FSX2oKRrNC9X8q0IcjacI_Ehwt07FWMIddaDBg2I_-rmrGO-kpFYCfoVAgwGjXNEfToAfp5MPLs1H4_FZERm9QVRz9VjCetXSKivuLNyi6Iyrm7bs93vB19h=w408-h272-k-no",
    // Soft floral background behind the date (Date section)
    backgroundFloral: "./background-floral.jpg"
  }
};
/* ======================= END OF CONFIGURATION ======================= */

(function () {
  "use strict";
  const cfg = weddingConfig;
  const $ = (s) => document.querySelector(s);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isUrl = (u) => /^https?:\/\//i.test(u || "");

  /* ---- 1. Fill text and images from the config ---- */
  const d = new Date(cfg.weddingDate);
  const texts = Object.assign({}, cfg, {
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
    dayNumber: d.getDate(),
    monthYear: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    dateLong: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
  });
  document.querySelectorAll("[data-text]").forEach((el) => { el.textContent = texts[el.dataset.text] ?? ""; });
  document.querySelectorAll("[data-image]").forEach((el) => {
    el.addEventListener("error", () => el.classList.add("img-missing"));
    el.src = cfg.images[el.dataset.image];
  });
  // Background image used in the CSS variable --bg-floral
  document.documentElement.style.setProperty("--bg-floral", `url("${cfg.images.backgroundFloral}")`);
  document.title = `${cfg.brideName} & ${cfg.groomName} — Wedding Invitation`;

  /* ---- 2. Google Maps: show the map, or a neat placeholder ---- */
  if (isUrl(cfg.googleMapsEmbedUrl)) {
    const f = document.createElement("iframe");
    f.src = cfg.googleMapsEmbedUrl;
    f.title = "Map of " + cfg.venueName;
    f.loading = "lazy";
    f.referrerPolicy = "no-referrer-when-downgrade";
    f.allowFullscreen = true;
    $("#mapBox").replaceChildren(f);
  }
  const dir = $("#directionsBtn");
  if (isUrl(cfg.googleMapsDirectionsUrl)) dir.href = cfg.googleMapsDirectionsUrl;
  else { dir.setAttribute("aria-disabled", "true"); dir.textContent = "Directions coming soon"; }

  /* ---- 3. Live countdown (uses weddingDate) ---- */
  const pad = (n) => String(n).padStart(2, "0");
  function tick() {
    const ms = d - new Date();
    if (isNaN(ms) || ms <= 0) { $("#countdown").hidden = true; $("#cdDone").hidden = false; clearInterval(timer); return; }
    $("#cdDays").textContent = Math.floor(ms / 864e5);
    $("#cdHours").textContent = pad(Math.floor(ms / 36e5) % 24);
    $("#cdMins").textContent = pad(Math.floor(ms / 6e4) % 60);
    $("#cdSecs").textContent = pad(Math.floor(ms / 1e3) % 60);
  }
  const timer = setInterval(tick, 1000); tick();

  /* ---- 4. Scratch-to-reveal date ---- */
  const box = $("#scratch"), cv = $("#scratchCanvas"), ctx = cv.getContext("2d", { willReadFrequently: true });
  let done = false, touched = false, drawing = false, last = null, moves = 0, lastW = 0;

  function paintCover() {
    const r = box.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    lastW = r.width; cv.width = r.width * dpr; cv.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, r.width, r.height);   // soft metallic-lavender foil
    [[0, "#c9b4e6"], [.3, "#f0e7fb"], [.55, "#b49bdb"], [.8, "#e6d8f6"], [1, "#bfa8e0"]].forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
    for (let i = 0; i < 1100; i++) {                              // paper grain
      ctx.fillStyle = `rgba(${Math.random() < .5 ? "255,255,255" : "120,90,170"},${Math.random() * .16})`;
      ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1.3, 1.3);
    }
    ctx.strokeStyle = "rgba(201,169,110,.9)"; ctx.lineWidth = 1.5; ctx.strokeRect(10, 10, r.width - 20, r.height - 20);
    ctx.strokeRect(14, 14, r.width - 28, r.height - 28);
    ctx.fillStyle = "rgba(63,42,99,.7)"; ctx.textAlign = "center";
    ctx.font = 'italic 600 ' + Math.max(16, r.width / 17) + 'px "Cormorant Garamond",Georgia,serif';
    ctx.fillText("Scratch to reveal the date", r.width / 2, r.height / 2 + 6);
  }
  function erase(x1, y1, x2, y2) {
    ctx.globalCompositeOperation = "destination-out"; ctx.lineCap = ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(34, box.clientWidth * .1);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }
  function cleared() {                                             // share of erased pixels
    const w = cv.width, h = cv.height, a = ctx.getImageData(0, 0, w, h).data; let n = 0, t = 0;
    for (let y = 0; y < h; y += 12) for (let x = 0; x < w; x += 12) { t++; if (a[(y * w + x) * 4 + 3] < 40) n++; }
    return n / t;
  }
  function finish() { if (done) return; done = true; box.classList.add("is-revealed"); $("#revealBtn").hidden = true; }
  const at = (e) => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

  cv.addEventListener("pointerdown", (e) => { drawing = touched = true; last = at(e); cv.setPointerCapture(e.pointerId); erase(...last, ...last); });
  cv.addEventListener("pointermove", (e) => {
    if (!drawing) return; const p = at(e); erase(...last, ...p); last = p;
    if (++moves % 14 === 0 && cleared() > .55) finish();
  });
  const stop = () => { if (!drawing) return; drawing = false; if (cleared() > .55) finish(); };
  cv.addEventListener("pointerup", stop); cv.addEventListener("pointercancel", stop);
  $("#revealBtn").addEventListener("click", finish);               // keyboard / one-tap alternative
  window.addEventListener("resize", () => { if (!done && !touched && Math.abs(box.clientWidth - lastW) > 2) paintCover(); });

  function autoReveal() {                                          // gentle first swipe so guests see how it works
    const r = box.getBoundingClientRect(), W = r.width, H = r.height;
    const path = [[.1, .8], [.9, .2]].map(([x, y]) => [x * W, y * H]);
    let seg = 0, t = 0;
    (function step() {
      if (touched || done) return;
      const [a, b] = [path[seg], path[seg + 1]]; t += reduceMotion ? 1 : .05;
      const p = [a[0] + (b[0] - a[0]) * Math.min(t, 1), a[1] + (b[1] - a[1]) * Math.min(t, 1)];
      erase(...(seg === 0 && t <= .06 ? a : last || a), ...p); last = p;
      if (t >= 1) { seg++; t = 0; last = null; if (seg >= path.length - 1) return; }
      requestAnimationFrame(step);
    })();
  }

  /* ---- 5. Opening interaction ---- */
  $("#openBtn").addEventListener("click", () => {
    $("#intro").classList.add("is-open"); document.body.classList.remove("is-locked");
    window.scrollTo(0, 0);
    setTimeout(() => { $("#intro").hidden = true; }, 1200);
    setTimeout(() => { paintCover(); setTimeout(autoReveal, 400); }, 500);
  });
  paintCover();

  /* ---- 6. Scroll reveals, parallax, falling petals ---- */
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add("in"));

  if (!reduceMotion) {
    let ticking = false;
    addEventListener("scroll", () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { document.documentElement.style.setProperty("--py", scrollY); ticking = false; }); }, { passive: true });
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("i"), s = (Math.random() * .8 + .6).toFixed(2);
      p.style.cssText = `left:${Math.random() * 100}%;transform:scale(${s});animation-duration:${14 + Math.random() * 12}s;animation-delay:-${Math.random() * 20}s`;
      $("#petals").appendChild(p);
    }
  }
})();
