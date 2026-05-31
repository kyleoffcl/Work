// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // gentle stagger for grouped siblings
        const delay = el.parentElement
          ? Array.from(el.parentElement.children).indexOf(el) * 80
          : 0;
        setTimeout(() => el.classList.add("in"), Math.min(delay, 320));
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ===== Animated stat counters =====
const formatNum = (n) => n.toLocaleString("en-US");
const animateCount = (el) => {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  const isDecimal = !Number.isInteger(target) || target < 10;
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const val = target * eased;
    const shown = isDecimal && target < 10 ? Math.round(val) : Math.round(val);
    el.textContent = prefix + formatNum(shown) + suffix;
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

// ===== FAQ: only one open at a time =====
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) =>
  item.addEventListener("toggle", () => {
    if (item.open) faqItems.forEach((o) => o !== item && (o.open = false));
  })
);

// ===== Active nav link on scroll (scroll-spy) =====
const sections = ["services", "process", "packages", "about", "faq", "locations"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navAnchors = Array.from(navLinks.querySelectorAll('a[href^="#"]'));
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// ===== Hide sticky CTA when the contact section is in view =====
const stickyCta = document.querySelector(".sticky-cta");
const contactSection = document.getElementById("contact");
if (stickyCta && contactSection) {
  new IntersectionObserver(
    ([entry]) => (stickyCta.style.opacity = entry.isIntersecting ? "0" : "1"),
    { threshold: 0.15 }
  ).observe(contactSection);
}

// ===== Contact form (front-end only) =====
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const msg = (data.get("message") || "").toString().trim();

  if (!name || !email || !msg) {
    note.style.color = "#ff7a90";
    note.textContent = "Please fill in your name, email, and message.";
    return;
  }
  note.style.color = "";
  note.textContent = `Thanks, ${name.split(" ")[0]}! We'll reach out to ${email} shortly. 🚀`;
  form.reset();
});
