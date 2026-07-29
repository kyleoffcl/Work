// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile nav =====
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navBackdrop = document.getElementById("navBackdrop");

function setNav(open) {
  navLinks.classList.toggle("open", open);
  navBackdrop.classList.toggle("show", open);
  navToggle.setAttribute("aria-expanded", String(open));
}
navToggle.addEventListener("click", () => setNav(true));
navClose.addEventListener("click", () => setNav(false));
navBackdrop.addEventListener("click", () => setNav(false));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));

// ===== Scroll-spy =====
const spyLinks = document.querySelectorAll(".nav-links a[href^='#']");
const spyTargets = [...spyLinks]
  .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
  .filter(Boolean);

window.addEventListener(
  "scroll",
  () => {
    let current = spyTargets[0];
    for (const sec of spyTargets) {
      if (sec.getBoundingClientRect().top <= 140) current = sec;
    }
    spyLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id)
    );
  },
  { passive: true }
);

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Stat counters =====
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const duration = 1600;
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ===== Percentage rings =====
const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

const meterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const meter = entry.target;
      const percent = parseInt(meter.dataset.percent, 10);
      const ring = meter.querySelector(".ring-fg");
      const val = meter.querySelector(".ring-val");

      ring.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - percent / 100);

      const duration = 1400;
      const start = performance.now();
      function frame(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        val.textContent = Math.round(percent * eased) + "%";
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
      meterObserver.unobserve(meter);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".meter").forEach((el) => meterObserver.observe(el));

// ===== Contact form (mailto handoff) =====
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in your name, email and message.";
    return;
  }

  const phone = (data.get("phone") || "").toString().trim();
  const interest = (data.get("interest") || "").toString().trim();
  const subject = encodeURIComponent("Gold purchase inquiry — " + name);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterested in: ${interest}\n\n${message}`
  );
  window.location.href = `mailto:info@jubileeintlminingco.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email app… or write to us directly at info@jubileeintlminingco.com.";
  contactForm.reset();
});
