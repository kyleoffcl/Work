/* ===================================================================
   Clear Touch Tourism — interactions
   =================================================================== */

// ===== Year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Navbar scroll state + scroll-spy =====
const nav = document.getElementById("nav");
const spySections = ["home", "tours", "experiences", "why", "reviews", "faq", "contact"];
const spyLinks = document.querySelectorAll(".nav-links > a[href^='#']");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  let currentId = "";
  for (const id of spySections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 120) currentId = id;
  }
  spyLinks.forEach((a) => {
    const href = a.getAttribute("href").replace("#", "");
    a.classList.toggle("active", href === currentId);
  });

  toTop.classList.toggle("show", window.scrollY > 600);
};

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navLinks = document.getElementById("navLinks");
const navBackdrop = document.getElementById("navBackdrop");

const setMenu = (open) => {
  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navBackdrop.classList.toggle("visible", open);
  document.body.style.overflow = open ? "hidden" : "";
};
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navClose.addEventListener("click", () => setMenu(false));
navBackdrop.addEventListener("click", () => setMenu(false));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.parentElement
          ? Array.from(el.parentElement.children).indexOf(el) * 60
          : 0;
        setTimeout(() => el.classList.add("in"), Math.min(delay, 300));
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Animated stat counters =====
const formatNum = (n) => n.toLocaleString("en-US");
const animateCount = (el) => {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const decimals = (el.dataset.target.split(".")[1] || "").length;
  const duration = 1700;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = formatNum(Number(val.toFixed(decimals))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = formatNum(target) + suffix;
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ===== Image fallback (graceful gradient if Unsplash blocked) =====
const FALLBACK = {
  hero:   "linear-gradient(135deg,#0a3450,#06243b)",
  desert: "linear-gradient(135deg,#e8b54b,#d39a2c)",
  city:   "linear-gradient(135deg,#16b5c3,#0e7c86)",
  cruise: "linear-gradient(135deg,#0e4661,#06243b)",
  mosque: "linear-gradient(135deg,#f3cf7a,#d39a2c)",
};
document.querySelectorAll("img[data-fallback], img[src*='unsplash']").forEach((img) => {
  img.addEventListener("error", () => {
    const key = img.dataset.fallback || "hero";
    img.classList.add("img-failed");
    img.removeAttribute("src");
    img.style.background = FALLBACK[key] || FALLBACK.hero;
  });
});

// ===== Favourite hearts =====
document.querySelectorAll(".tc-fav").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("on");
    btn.textContent = btn.classList.contains("on") ? "♥" : "♡";
  });
});

// ===== Reviews slider =====
const revTrack = document.getElementById("revTrack");
const revPrev = document.querySelector(".rev-prev");
const revNext = document.querySelector(".rev-next");
const revDots = document.getElementById("revDots");

if (revTrack) {
  const cards = Array.from(revTrack.children);
  // dots
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to review ${i + 1}`);
    if (i === 0) dot.classList.add("on");
    dot.addEventListener("click", () => {
      cards[i].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    });
    revDots.appendChild(dot);
  });
  const dots = Array.from(revDots.children);

  const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 320);
  revPrev.addEventListener("click", () => revTrack.scrollBy({ left: -step(), behavior: "smooth" }));
  revNext.addEventListener("click", () => revTrack.scrollBy({ left: step(), behavior: "smooth" }));

  revTrack.addEventListener("scroll", () => {
    const idx = Math.round(revTrack.scrollLeft / step());
    dots.forEach((d, i) => d.classList.toggle("on", i === idx));
  }, { passive: true });
}

// ===== Booking modal =====
const modal = document.getElementById("bookingModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalTour = document.getElementById("modalTour");
const modalForm = document.getElementById("modalForm");
const modalNote = document.getElementById("modalNote");
const modalWhatsApp = document.getElementById("modalWhatsApp");
const WA_NUMBER = "971501234567";
let activeTour = "";

const openModal = (name, price) => {
  activeTour = name;
  modalTour.textContent = price ? `${name} — from $${price} per person` : name;
  const msg = encodeURIComponent(`Hi Clear Touch Tourism! I'd like to book: ${name}.`);
  modalWhatsApp.href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
  modalNote.textContent = "";
  modal.classList.add("open");
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
};
const closeModal = () => {
  modal.classList.remove("open");
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
};

document.querySelectorAll(".btn-book").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(btn.dataset.name, btn.dataset.price);
  });
});
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

if (modalForm) {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(modalForm);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    if (!name || !email) {
      modalNote.style.color = "#e8485b";
      modalNote.textContent = "Please add your name and email.";
      return;
    }
    modalNote.style.color = "#0e7c86";
    modalNote.textContent = `Thanks ${name.split(" ")[0]}! We'll confirm "${activeTour}" at ${email} shortly. 🌅`;
    modalForm.reset();
    setTimeout(closeModal, 2600);
  });
}

// ===== Hero booking bar -> contact =====
const bookingBar = document.getElementById("bookingBar");
const tourSelect = document.getElementById("tourSelect");
if (bookingBar) {
  bookingBar.addEventListener("submit", (e) => {
    e.preventDefault();
    const exp = bookingBar.querySelector("select[name='experience']").value;
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    if (tourSelect) {
      const match = Array.from(tourSelect.options).find((o) => o.value.toLowerCase().includes(exp.toLowerCase().split(" ")[0]));
      if (match) tourSelect.value = match.value;
    }
  });
}

// ===== Contact form =====
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    if (!name || !email) {
      note.style.color = "#e8485b";
      note.textContent = "Please add your name and email so we can reply.";
      return;
    }
    note.style.color = "#0e7c86";
    note.textContent = `Thank you, ${name.split(" ")[0]}! Our team will reach out to ${email} within minutes. 🐪`;
    form.reset();
  });
}

// ===== Back to top =====
const toTop = document.getElementById("toTop");
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== init =====
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
