/* =========================================================
   Grow With Us Agency — Proposal logic
   Edit CONFIG below to tailor the proposal per client.
   ========================================================= */
const CONFIG = {
  // Access code the client must enter to view the proposal
  accessCode: "2026",
  // Client details — these fill every [data-*] placeholder on the page
  clientName: "Roger Roys",   // full name shown on the cover
  clientFirst: "Roger",       // first name used in greetings
  date: "June 5, 2026",       // proposal date
  validUntil: "July 5, 2026", // expiry date
  ref: "GWU-2026-0612"        // proposal reference number
};

/* ---- Apply client config to the page ---- */
function applyConfig() {
  document.querySelectorAll("[data-client-name]").forEach(el => el.textContent = CONFIG.clientName);
  document.querySelectorAll("[data-client-first]").forEach(el => el.textContent = CONFIG.clientFirst);
  document.querySelectorAll("[data-client]").forEach(el => el.textContent = "Prepared for " + CONFIG.clientName);
  const d = document.querySelector("[data-date]"); if (d) d.textContent = CONFIG.date;
  const v = document.querySelector("[data-valid]"); if (v) v.textContent = CONFIG.validUntil;
  const r = document.querySelector("[data-ref]"); if (r) r.textContent = CONFIG.ref;
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  document.title = "Proposal for " + CONFIG.clientName + " · Grow With Us Agency";
}

/* ---- Password gate ---- */
function initGate() {
  const gate = document.getElementById("gate");
  const form = document.getElementById("gateForm");
  const input = document.getElementById("gateInput");
  const error = document.getElementById("gateError");
  const KEY = "gwu_proposal_unlocked";

  function unlock() {
    gate.classList.add("hidden");
    document.body.classList.remove("locked");
    startReveal();
    setTimeout(() => { if (gate.parentNode) gate.remove(); }, 700);
  }

  // Stay unlocked for the session once entered correctly
  if (sessionStorage.getItem(KEY) === "1") { unlock(); return; }

  setTimeout(() => input && input.focus(), 400);

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (input.value.trim() === CONFIG.accessCode) {
      sessionStorage.setItem(KEY, "1");
      unlock();
    } else {
      error.textContent = "Incorrect code. Please try again.";
      form.classList.remove("gate-shake");
      void form.offsetWidth; // reflow to restart animation
      form.classList.add("gate-shake");
      input.value = "";
      input.focus();
    }
  });
}

/* ---- Scroll reveal ---- */
let revealStarted = false;
function startReveal() {
  if (revealStarted) return;
  revealStarted = true;
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  els.forEach(el => io.observe(el));
}

/* ---- Animated stat counters ---- */
function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-target]");
  if (!nums.length) return;
  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur = 1600, start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

/* ---- Reading progress bar ---- */
function initProgress() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    bar.style.width = (scrolled * 100) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---- Accept toast ---- */
function initAccept() {
  const btn = document.getElementById("acceptBtn");
  const toast = document.getElementById("toast");
  if (!btn || !toast) return;
  btn.addEventListener("click", () => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 4200);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initGate();
  initCounters();
  initProgress();
  initAccept();
});
