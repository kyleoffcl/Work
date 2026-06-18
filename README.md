# Clear Touch Tourism — Website

A modern, high-conversion single-page website for **Clear Touch Tourism**, a
Dubai-based tour operator. Built as a fast, fully responsive static site with a
luxury navy-and-gold design, full-bleed travel photography, an instant booking
flow, smooth scroll-reveal animations and WhatsApp-first contact.

## Highlights
- **Eye-catching hero** with full-screen Dubai imagery, animated zoom & a live booking bar
- **Popular Tours** grid (desert safari, Burj Khalifa, dhow cruise, city tour, Abu Dhabi, hot-air balloon) with a quick **Book Now** modal
- **Experiences** categories, **Why Us**, animated **stats**, **testimonials** slider, **FAQ** accordion
- **Conversion-focused contact**: enquiry form, click-to-call, email & floating **WhatsApp** button
- Sticky navbar with scroll-spy, back-to-top, graceful image fallbacks, reduced-motion support
- Fully responsive (desktop / tablet / mobile)

## ⚠️ Before going live — replace placeholders
The following are sensible placeholders — swap them for the real business details:
- **Phone / WhatsApp:** `+971 50 123 4567` (search `971501234567` in `index.html` & `script.js`)
- **Email:** `info@cleartouchtourism.com`
- **Address:** Business Bay, Dubai, UAE
- **Social links** (Instagram / Facebook / TripAdvisor) — currently `#`
- **Tour prices & inclusions** — confirm against your real packages
- Wire the **contact / booking forms** to a backend or email service (currently front-end only)
- Hero & tour images load from Unsplash; replace with your own photography for branding

## Run locally
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files
- `index.html` — markup & content
- `styles.css` — design tokens, layout, animations
- `script.js` — nav, scroll reveal, counters, reviews slider, booking modal, forms

No build step or dependencies required.
