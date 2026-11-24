# Quiero Más Tacos: concept website

A concept, one-page marketing site for **Quiero Más Tacos**, a Mexican food truck and mobile caterer in North Sarasota, FL. It's a bilingual (ES / EN) static site built with plain HTML, CSS and vanilla JS. There's no framework, no build step and no backend.

```
/index.html    page markup (all sections)
/styles.css    styles, mobile first
/script.js     language toggle + all translations, nav, photo slots, catering form
/images/       photos go here (see "Photo slots" below)
/README.md
/.gitignore
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy: Cloudflare Pages

Connect this GitHub repo in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git) with:

| Setting | Value |
|---|---|
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | **/** |

After that, every push to `main` redeploys automatically.

## Placeholders still to fill in

Anything that couldn't be confirmed from the business's Facebook page or GoTruckster listing appears on the page as a **yellow striped `[PLACEHOLDER]`** box, so it's easy to spot. Search the repo for `[` to find them all.

| Placeholder | Where |
|---|---|
| `[DISH_NAME]`, `[DISH_DESCRIPTION]`, `[PRICE]` (9 items, 3 groups) | `index.html` → Menu section |
| `[CATERING_PACKAGES_AND_PRICING]` | `script.js` → `cat.details` (en + es) |
| `[LOCATION & HOURS]` × 7 days | `index.html` → Find the Truck |
| `[SERVICE_AREA_DETAILS]` | `script.js` → `find.areaMore` (en + es) |
| `[OWNER_STORY …]` | `script.js` → `about.p2` (en + es) |
| `[PHONE_NUMBER]`, `[EMAIL]`, `[HOURS]`, `[INSTAGRAM_URL]` | `index.html` → Contact |
| `[SITE_URL]` | `index.html` → Open Graph meta tags (use the live Cloudflare URL) |

The menu group names ("Tacos", "Specialties", "Sides & drinks") are a suggested structure. Rename them in `script.js` (`menu.g1`–`menu.g3`) once the real menu is known.

> Text that has a `data-i18n` / `data-i18n-html` attribute is controlled by the `TRANSLATIONS` object in `script.js`. Edit it there, in **both** `en` and `es`.

## Photo slots

Each photo slot shows a labeled placeholder box until a matching file exists in `/images`. As soon as you add a file with the exact name below, it appears; no code changes are needed. Export photos as JPG at roughly the size shown (quality ~80, ideally under 300 KB each).

| File (`/images/…`) | What it should show | Suggested size |
|---|---|---|
| `hero-tacos.jpg` | Hero: close-up of signature tacos, bright | 1600×1200 |
| `catering-event-setup.jpg` | Truck or taco bar set up at an event, guests in line | 1200×1500 (portrait) |
| `truck-exterior.jpg` | Truck exterior, wide shot, daytime | 1400×1050 |
| `gallery-tacos-closeup.jpg` | Tacos close-up | 900×1200 (portrait) |
| `gallery-plate-overhead.jpg` | Full plate, shot from overhead | 1200×900 |
| `gallery-salsas.jpg` | Salsas and toppings | 1200×900 |
| `gallery-event-crowd.jpg` | Guests lined up at an event, wide | 1600×900 |
| `gallery-service-window.jpg` | Team serving at the truck window | 1200×900 |
| `gallery-truck-evening.jpg` | Truck lit up in the evening | 1200×900 |
| `og-image.jpg` | Social share preview (not shown on page) | 1200×630 |

Alt text for every photo already exists in both languages (`alt.*` keys in `script.js`). Until the files are added, the browser console shows a "404" for each missing photo. That's expected, and the messages go away once the photos are in place.

There is no logo file yet. The header uses a styled wordmark plus a simple taco icon. To use a real logo, replace the `.brand-mark` SVG in `index.html` with an `<img src="images/logo.png" …>`.

## Catering form

- Validates in the browser with inline errors in the active language (required fields, phone ≥ 10 digits, valid email, no past dates, at least 10 guests).
- On a valid submit, it shows a "Request received" confirmation and resets the form.
- **It sends nothing anywhere.** All submit logic is in `submitCateringRequest(data)` in `script.js`. A comment there shows exactly where to connect an n8n webhook or a form service later.

## Language toggle

- The ES / EN buttons in the header switch all text instantly: nav, buttons, menu, form labels, errors, confirmation, photo labels, alt text, page title and meta description.
- The default comes from the browser language (Spanish if it starts with `es`, otherwise English). The visitor's choice is remembered in `localStorage`.
- Dish names stay in Spanish in both languages.

## Sources used

- Facebook: https://www.facebook.com/p/Quiero-m%C3%A1s-tacosflavors-the-mexico-100056384622157/
- GoTruckster: https://gotruckster.com/food-truck/quiero-mas-tacos
