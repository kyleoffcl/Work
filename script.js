// ===== Motion preference =====
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Particle constellation background =====
const canvas = document.getElementById("particles");
if (canvas && !reduceMotion) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: null, y: null };
  let raf;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
      hue: Math.random() < 0.75 ? "250,158,59" : "56,232,255",
    }));
  };

  const LINK_DIST = 130;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      // gentle drift away from the mouse
      if (mouse.x !== null) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14400 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          p.x += (dx / d) * 0.5;
          p.y += (dy / d) * 0.5;
        }
      }
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},0.55)`;
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(250,158,59,${0.13 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });
}

// ===== Custom cursor =====
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
if (cursorDot && !reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let rx = -100, ry = -100, tx = -100, ty = -100;
  window.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    cursorDot.style.left = tx + "px";
    cursorDot.style.top = ty + "px";
    document.body.classList.add("cursor-on");
  });
  const followRing = () => {
    rx += (tx - rx) * 0.16;
    ry += (ty - ry) * 0.16;
    cursorRing.style.left = rx + "px";
    cursorRing.style.top = ry + "px";
    requestAnimationFrame(followRing);
  };
  followRing();
  document.querySelectorAll("a, button, select, input, textarea, .sgp-tab").forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// ===== Scroll progress bar =====
const progressBar = document.querySelector(".scroll-progress");

// ===== Navbar scroll state + scroll-spy =====
const nav = document.getElementById("nav");
const spySections = ["home", "results", "testimonials", "partner", "packages", "contact", "login"];
const spyLinks = document.querySelectorAll(".nav-links > a[href^='#']");

const onScroll = () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);

  if (progressBar) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  }

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

// ===== Hero typewriter =====
const heroWord = document.getElementById("heroWord");
if (heroWord) {
  const phrases = ["Done For You", "Growth Driven", "AI Powered", "Built To Scale"];
  if (reduceMotion) {
    heroWord.textContent = phrases[0];
  } else {
    let pi = 0, ci = phrases[0].length, deleting = false;
    const tick = () => {
      const phrase = phrases[pi];
      heroWord.textContent = phrase.slice(0, ci);
      let delay = deleting ? 45 : 85;
      if (!deleting && ci === phrase.length) { delay = 2600; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
      ci += deleting ? -1 : 1;
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2600);
  }
}

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

// ===== 3D tilt on cards =====
if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".result-card, .price-card, .perk, .sgp-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // ===== Magnetic buttons =====
  document.querySelectorAll(".btn-gold, .btn-outline, .testi-arr").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

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
const testiSlides = document.querySelectorAll(".testi-slide");
let testiIdx = 0;
const testiPrevBtn = document.querySelector(".testi-prev");
const testiNextBtn = document.querySelector(".testi-next");
function showTestiSlide(i) {
  testiSlides.forEach((s) => s.classList.remove("active"));
  testiSlides[i].classList.add("active");
}
if (testiPrevBtn && testiNextBtn && testiSlides.length) {
  testiPrevBtn.addEventListener("click", () => {
    testiIdx = (testiIdx - 1 + testiSlides.length) % testiSlides.length;
    showTestiSlide(testiIdx);
  });
  testiNextBtn.addEventListener("click", () => {
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

document.querySelector(".cart-checkout")?.addEventListener("click", () => {
  if (cart.length === 0) return;
  closeCart();
  setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 300);
});

renderCart();
