// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state + scroll-spy =====
const nav = document.getElementById("nav");
const spySections = ["home", "services", "testimonials", "partner", "packages", "contact", "login"];
const spyLinks = document.querySelectorAll(".nav-links > a[href^='#']");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  // scroll-spy: mark the nav link whose section is nearest the top
  let currentId = "";
  for (const id of spySections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 100) currentId = id;
  }
  spyLinks.forEach((a) => {
    const href = a.getAttribute("href").replace("#", "");
    a.classList.toggle("active", href === currentId || (currentId === "" && href === "home"));
  });
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobile menu open/close =====
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navLinks = document.getElementById("navLinks");

const setMenu = (open) => {
  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};
navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navClose.addEventListener("click", () => setMenu(false));

// Close on nav link click (but not on a dropdown trigger)
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => setMenu(false))
);

// ===== Mobile accordion for mega menus =====
const isMobile = () => window.matchMedia("(max-width: 960px)").matches;
document.querySelectorAll("[data-menu] .menu-trigger").forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    if (!isMobile()) return; // desktop uses hover
    e.preventDefault();
    const parent = trigger.closest("[data-menu]");
    const open = parent.classList.toggle("open");
    trigger.setAttribute("aria-expanded", String(open));
  });
});

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.parentElement
          ? Array.from(el.parentElement.children).indexOf(el) * 70
          : 0;
        setTimeout(() => el.classList.add("in"), Math.min(delay, 320));
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
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const decimals = (el.dataset.target.split(".")[1] || "").length;
  const duration = 1700;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = prefix + formatNum(Number(val.toFixed(decimals))) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + formatNum(target) + suffix;
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
  { threshold: 0.5 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ===== Testimonials carousel =====
const track = document.getElementById("carTrack");
const prev = document.getElementById("carPrev");
const next = document.getElementById("carNext");
if (track) {
  const step = () => {
    const card = track.querySelector(".testi-card");
    return card ? card.offsetWidth + 20 : 320;
  };
  prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
}

// ===== Contact form (front-end only) =====
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const msg = (data.get("message") || "").toString().trim();
    if (!name || !email || !msg) {
      note.style.color = "#ff6b6b";
      note.textContent = "Please fill in your name, email, and message.";
      return;
    }
    note.style.color = "";
    note.textContent = `Thanks, ${name.split(" ")[0]}! We'll reach out to ${email} shortly. 🚀`;
    form.reset();
  });
}

// ===== Login form (front-end only) =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login is a demo on this build — connect it to your backend to enable accounts.");
  });
}

// ===== Social Growth Packages tab switcher =====
const sgpTabs = document.querySelectorAll(".sgp-tab");
sgpTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    sgpTabs.forEach((t) => t.classList.remove("sgp-tab--active"));
    tab.classList.add("sgp-tab--active");
  });
});
