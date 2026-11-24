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
| `[PRICE]` × 16 menu items | `index.html` → Menu section (text in `script.js`, `ph.price`) |
| `[CATERING_PACKAGES_AND_PRICING]` | `script.js` → `cat.details` (en + es) |
| `[LOCATION & HOURS]` × 7 days | `index.html` → Find the Truck |
| `[SERVICE_AREA_DETAILS]` | `script.js` → `find.areaMore` (en + es) |
| `[OWNER_STORY …]` | `script.js` → `about.p2` (en + es) |
| `[PHONE_NUMBER]`, `[EMAIL]`, `[HOURS]`, `[INSTAGRAM_URL]` | `index.html` → Contact |
| `[SITE_URL]` | `index.html` → Open Graph meta tags (use the live Cloudflare URL) |

The menu items come from the signs and photos at their setup: street corn, corn in a cup, taco salad in a shell, carne asada fries, cheesy fries, burgers & hot dogs, chicken tenders & fries, corn dogs, boiled peanuts, aguas frescas, crepes, churros, funnel cake, fried Oreos and a mangonada. Short descriptions are based on what the photos show, so confirm them with the owners. Menu text lives in `script.js` (`m.*` keys).

> Text that has a `data-i18n` / `data-i18n-html` attribute is controlled by the `TRANSLATIONS` object in `script.js`. Edit it there, in **both** `en` and `es`.

## Photo slots

Each photo slot shows a labeled placeholder box with a moving dashed border until a matching file exists in `/images`. As soon as you add a file with the exact name, it appears; no code change is needed.

| File (`/images/…`) | Shows | Status |
|---|---|---|
| `hero-loaded-taco-tray.jpg` | Hero: loaded tray with cilantro, crema, pico and lime | ✅ added |
| `catering-night-setup.jpg` | Stand at night, lit-up sign, guests in line (portrait) | ⬜ needed |
| `setup-daytime.jpg` | Full daytime setup with tents, menu signs, flags | ⬜ needed |
| `gallery-mangonada.jpg` | Mangonada with tamarind straw (portrait) | ⬜ needed |
| `gallery-churros.jpg` | Churros with chocolate | ✅ added (low-res) |
| `gallery-crepas-fresas.jpg` | Crepes with strawberries | ✅ added (low-res) |
| `gallery-elote.jpg` | Elote / street corn (wide) | ⬜ needed |
| `gallery-oreos-fritas.jpg` | Fried Oreos | ✅ added (low-res) |
| `gallery-funnel-cake.jpg` | Funnel cake with cream and chocolate | ✅ added (low-res) |
| `og-image.jpg` | Social share preview, 1200×630 (not on page) | ✅ added |

Export photos as JPG, quality ~80, ideally under 300 KB. The four dessert photos came from small flyer tiles (~270 px). Swap in larger originals if the owners have them.

Alt text for every photo is in both languages (`alt.*` keys in `script.js`). A missing file shows as a "404" in the browser console until it's added; that's expected.

There is no logo file yet. The header uses a styled wordmark plus a simple taco icon.

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
