# Delaware Jiu Jitsu — Website

A modern, conversion-focused single-page website for **Delaware Jiu Jitsu**, a
Brazilian Jiu-Jitsu academy. Built as a fast, fully responsive static site with
a premium dark + gold martial-arts aesthetic, scroll-reveal animations, animated
stat counters, an interactive class schedule, and a prominent free-trial lead
capture form.

## Why it converts
- **One clear offer** repeated throughout: *Claim your Free Trial Week*
  (announcement bar, nav button, hero, dedicated section, pricing, floating CTA).
- **Lead-capture form** front-and-center with low friction (name, email, phone, program).
- **Trust signals**: 4.9★ rating, member counts, IBJJF lineage, medals, guarantee.
- **Risk reversal**: free week, free loaner gi, no contracts, 30-day happiness guarantee.
- **Objection handling**: beginner-focused copy + FAQ ("never trained", "not fit", "is it safe").
- **Local SEO**: `SportsActivityLocation` structured data, location, hours, map.

## Sections
Announcement bar · Sticky nav · Hero · Stat strip · Programs (Gi, No-Gi, Kids,
Fundamentals, Women's, Competition) · Free Trial offer + form · Why Us ·
Head Coach · Weekly Schedule (tabbed) · Pricing · Reviews · FAQ · CTA band ·
Contact + map · Footer · Floating CTA.

## Images
The hero, program and coach photos are AI-generated Brazilian Jiu-Jitsu imagery
currently referenced from a public CDN (so they render for real visitors). For a
production deploy you should **download them into the repo** so the site has no
external image dependency. A helper script is included:

```bash
bash localize-assets.sh   # downloads CDN images into assets/ and rewrites index.html
```

Run it from a machine with normal internet access (the build environment used to
generate this site has a restricted network allowlist).

> Replace the AI-generated photos with real photos of your academy, coaches and
> members whenever possible — authentic photos convert best.

## Customize before launch
- Address, phone, email, hours (search `Newark, DE` / `302` / `info@delawarejiujitsu.com`).
- Coach name/bio (`Professor Marcus Andrade`), prices, and the schedule times.
- Hook the trial form up to your CRM / email (it's front-end only right now).
- Social links in the contact section and `og:image` URLs.

## Run locally
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Files
- `index.html` — markup & content
- `styles.css` — design tokens, layout, animations
- `script.js` — nav, scroll reveal, counters, schedule tabs, form handling
- `localize-assets.sh` — pull CDN images into `assets/`

No build step or dependencies required.
