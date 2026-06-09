// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navbar scroll state + scroll-spy =====
const nav = document.getElementById("nav");
const spySections = ["home", "results", "testimonials", "partner", "packages", "contact", "login"];
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
  { threshold: 0.12 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ===== Testimonials slider (single-video carousel) =====
const testiSlides = document.querySelectorAll('.testi-slide');
let testiIdx = 0;
const testiPrevBtn = document.querySelector('.testi-prev');
const testiNextBtn = document.querySelector('.testi-next');
function showTestiSlide(i) {
  testiSlides.forEach(s => s.classList.remove('active'));
  testiSlides[i].classList.add('active');
}
if (testiPrevBtn && testiNextBtn && testiSlides.length) {
  testiPrevBtn.addEventListener('click', () => {
    testiIdx = (testiIdx - 1 + testiSlides.length) % testiSlides.length;
    showTestiSlide(testiIdx);
  });
  testiNextBtn.addEventListener('click', () => {
    testiIdx = (testiIdx + 1) % testiSlides.length;
    showTestiSlide(testiIdx);
  });
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

// ===== Shopping Cart =====
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartCloseBtn = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartFoot = document.getElementById("cartFoot");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartFab = document.getElementById("cartFab");
const cartBadge = document.getElementById("cartBadge");
const cartCountEl = document.getElementById("cartCount");

let cart = [];

const openCart = () => {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
};
const closeCart = () => {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
};

cartCloseBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
cartFab.addEventListener("click", openCart);

const formatPrice = (n) => "$" + Number(n).toLocaleString("en-US");

const renderCart = () => {
  const total = cart.reduce((s, i) => s + i.price, 0);
  const count = cart.length;
  cartBadge.textContent = count;
  cartCountEl.textContent = count;
  cartFab.style.display = count ? "flex" : "none";
  cartFoot.style.display = count ? "block" : "none";
  cartSubtotalEl.textContent = formatPrice(total);
  if (!count) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }
  cartItemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">1 × ${formatPrice(item.price)} = ${formatPrice(item.price)}</div>
      </div>
      <button class="cart-item-remove" data-index="${i}" aria-label="Remove">🗑</button>
    </div>`).join("");
  cartItemsEl.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      cart.splice(Number(btn.dataset.index), 1);
      renderCart();
    });
  });
};

document.querySelectorAll(".btn-cart").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);
    if (!name || !price) return;
    if (cart.some((i) => i.name === name)) { openCart(); return; }
    cart.push({ name, price });
    renderCart();
    openCart();
  });
});

document.querySelector('.cart-checkout')?.addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCart();
  setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 300);
});

renderCart();
