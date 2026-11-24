/* =========================================================
   Quiero Más Tacos: site script
   - ES / EN language toggle (all strings live in TRANSLATIONS)
   - Mobile nav, sticky header state, scroll reveal
   - Photo slots: show the real photo if the file exists in /images,
     otherwise keep the labeled placeholder box
   - Catering form: browser-side validation + confirmation
     (sends NOTHING anywhere; see submitCateringRequest)
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     TRANSLATIONS: every piece of site text, in one object.
     Dish names stay in Spanish in both languages.
     Anything in [BRACKETS] is a placeholder to fill in.
     --------------------------------------------------------- */
  var TRANSLATIONS = {
    en: {
      "meta.title": "Quiero Más Tacos | Mexican Food Truck & Catering in North Sarasota, FL",
      "meta.description": "Quiero Más Tacos brings the flavors of Mexico to North Sarasota, FL. Find the food truck, see the menu, and book taco catering for your next event.",
      /* Placeholders (yellow boxes): replace with real info */
      "ph.dish": "[DISH_NAME]",
      "ph.price": "[PRICE]",
      "ph.locHours": "[LOCATION & HOURS]",
      "ph.phone": "[PHONE_NUMBER]",
      "ph.email": "[EMAIL]",
      "ph.hours": "[HOURS]",
      "ph.instagram": "[INSTAGRAM_URL]",

      /* Menu: dish names stay the same in both languages */
      "m.tacos.n": "Tacos",
      "m.elote.n": "Elote",
      "m.elotevaso.n": "Elote en vaso",
      "m.tacosalad.n": "Taco salad",
      "m.carnefries.n": "Carne asada fries",
      "m.burger.n": "Burgers & hot dogs",
      "m.tenders.n": "Chicken tenders & fries",
      "m.cheesyfries.n": "Cheesy fries",
      "m.corndog.n": "Corn dog",
      "m.peanuts.n": "Boiled peanuts",
      "m.churros.n": "Churros",
      "m.crepas.n": "Crepas",
      "m.funnel.n": "Funnel cake",
      "m.oreos.n": "Oreos fritas",
      "m.aguas.n": "Aguas frescas",
      "m.mangonada.n": "Mangonada",
      "menu.intro": "From tacos and elotes to fair-style favorites and something sweet. Ask at the window about today's specials.",
      "menu.g1": "Tacos & Mexican favorites",
      "menu.g2": "American favorites",
      "menu.g3": "Desserts",
      "menu.g4": "Drinks",
      "m.tacos.d": "Ask at the window for today's fillings.",
      "m.elote.d": "Street corn on a stick with crema, cheese and chile.",
      "m.elotevaso.d": "Street corn off the cob, served in a cup.",
      "m.tacosalad.d": "Served in a crispy shell.",
      "m.carnefries.d": "Fries loaded with carne asada.",
      "m.burger.d": "Classic burgers and hot dogs.",
      "m.tenders.d": "Crispy chicken tenders with fries.",
      "m.cheesyfries.d": "Fries smothered in melted cheese.",
      "m.corndog.d": "A fair-style favorite.",
      "m.peanuts.d": "Warm, salty and made for snacking.",
      "m.churros.d": "Cinnamon-sugar churros with chocolate for dipping.",
      "m.crepas.d": "Filled with fresh strawberries and drizzled with chocolate.",
      "m.funnel.d": "Topped with whipped cream and a chocolate drizzle.",
      "m.oreos.d": "Fried golden and dusted with powdered sugar.",
      "m.aguas.d": "Ask about today's flavors.",
      "m.mangonada.d": "Mango with chamoy, chile and a tamarind straw.",
      "slot.hero": "Hero: loaded taco tray",
      "slot.catering": "Night setup with lit-up sign and guests in line",
      "slot.truck": "Daytime setup: tents, menu signs and flags",
      "slot.g1": "Mangonada",
      "slot.g2": "Churros",
      "slot.g3": "Crepas with strawberries",
      "slot.g4": "Elote (street corn)",
      "slot.g5": "Fried Oreos",
      "slot.g6": "Funnel cake",
      "alt.hero": "A loaded tray from Quiero Más Tacos topped with cilantro, crema, pico de gallo and fresh lime",
      "alt.catering": "The Quiero Más Tacos stand lit up at night with papel picado and customers in line",
      "alt.truck": "The full Quiero Más Tacos setup by day, with colorful tents, menu signs and papel picado",
      "alt.g1": "A mangonada with chamoy and a tamarind straw",
      "alt.g2": "Churros with a cup of chocolate for dipping",
      "alt.g3": "Crepes filled with strawberries and drizzled with chocolate",
      "alt.g4": "Mexican street corn with crema, cheese and chile",
      "alt.g5": "Fried Oreos dusted with powdered sugar",
      "alt.g6": "Funnel cake with whipped cream and chocolate",
      "skip": "Skip to content",
      "aria.home": "Quiero Más Tacos, home",
      "aria.nav": "Main",
      "nav.menu": "Menu",
      "nav.catering": "Catering",
      "nav.find": "Find the Truck",
      "nav.about": "About",
      "nav.gallery": "Gallery",
      "nav.contact": "Contact",
      "nav.toggle": "Menu",
      "nav.open": "Open menu",
      "nav.close": "Close menu",
      "cta.book": "Book Catering",
      "cta.menu": "See the Menu",
      "hero.title": "The flavors of Mexico. <span class=\"accent\">You'll want more.</span>",
      "hero.lede": "Real Mexican flavor in North Sarasota, FL. Grab your tacos at our truck window, or let us bring them straight to your party, office or celebration.",
      "menu.title": "What's cooking",
      "menu.note": "Prices and availability may change. Menu items vary by location and event.",
      "cat.title": "We bring the taco truck to you",
      "cat.intro": "From backyard birthdays to office lunches, we roll up, set up and keep the tacos coming so you can enjoy your own party.",
      "cat.f1.t": "Celebrations",
      "cat.f1.d": "Weddings, quinceañeras, birthdays and graduations.",
      "cat.f2.t": "Corporate & community",
      "cat.f2.d": "Team lunches, open houses and community gatherings.",
      "cat.f3.t": "Hot off the truck",
      "cat.f3.d": "Served hot from the truck, right where your guests are.",
      "cat.details": "Packages and pricing: <span class=\"ph\">[CATERING_PACKAGES_AND_PRICING]</span>",

      "form.title": "Request catering",
      "form.sub": "Tell us about your event and we'll get back to you with availability and a quote.",
      "form.reqNote": "<span aria-hidden=\"true\">*</span> Required field",
      "form.name": "Name",
      "form.phone": "Phone",
      "form.email": "Email",
      "form.type": "Event type",
      "form.typeChoose": "Choose one",
      "form.type.wedding": "Wedding",
      "form.type.birthday": "Birthday",
      "form.type.corporate": "Corporate",
      "form.type.quince": "Quinceañera",
      "form.type.graduation": "Graduation",
      "form.type.other": "Other",
      "form.date": "Event date",
      "form.time": "Event start time",
      "form.guests": "Guest count",
      "form.guestsHint": "Minimum 10 guests",
      "form.location": "Event location or address",
      "form.notes": "Notes or special requests",
      "form.submit": "Send request",
      "form.successTitle": "Request received!",
      "form.successBody": "Thanks for thinking of us. We'll reach out soon to confirm the details for your event.",
      "form.again": "Send another request",
      "form.summary": "Please fix the highlighted fields and try again.",

      "err.name": "Please enter your name.",
      "err.phoneRequired": "Please enter a phone number.",
      "err.phoneInvalid": "Please enter a valid phone number (at least 10 digits).",
      "err.emailRequired": "Please enter your email.",
      "err.emailInvalid": "Please enter a valid email, like name@example.com.",
      "err.dateRequired": "Please choose the date of your event.",
      "err.datePast": "That date has already passed. Please pick today or a future date.",
      "err.guestsRequired": "Please tell us how many guests you expect.",
      "err.guestsInvalid": "Please enter a whole number.",
      "err.guestsMin": "Catering starts at 10 guests.",
      "err.location": "Please enter the event location or address.",
      "find.title": "Find the truck",
      "find.intro": "We're rolling around North Sarasota. Check this week's stops below, or follow the truck live on GoTruckster.",
      "find.schedule": "This week's schedule",
      "find.area": "Service area",
      "find.areaMore": "Catering travel radius: <span class=\"ph\">[SERVICE_AREA_DETAILS]</span>",
      "find.gt": "Track us on GoTruckster",
      "find.gtNote": "Opens GoTruckster in a new tab.",
      "day.mon": "Monday", "day.tue": "Tuesday", "day.wed": "Wednesday", "day.thu": "Thursday",
      "day.fri": "Friday", "day.sat": "Saturday", "day.sun": "Sunday",
      "about.title": "Flavors from Mexico, made in Sarasota",
      "about.p1": "Quiero Más Tacos brings the flavors of Mexico to North Sarasota, one taco at a time. The name says it all: once you try one, you'll want more.",
      "about.p2": "<span class=\"ph\">[OWNER_STORY: who started the truck, when, and where the family recipes come from]</span>",
      "about.signoff": "¡Gracias por apoyar lo local!",
      "gal.title": "Straight from the truck",
      "contact.title": "Let's talk tacos",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.hours": "Hours",
      "contact.follow": "Follow us",

      "footer.tag": "The flavors of Mexico · North Sarasota, FL",
      "footer.rights": "All rights reserved.",
      "footer.top": "Back to top"
    },

    es: {
      "meta.title": "Quiero Más Tacos | Food truck y catering mexicano en North Sarasota, FL",
      "meta.description": "Quiero Más Tacos trae los sabores de México a North Sarasota, FL. Encuentra el food truck, checa el menú y aparta tu taquiza para tu próximo evento.",
      "ph.dish": "[NOMBRE_DEL_PLATILLO]",
      "ph.price": "[PRECIO]",
      "ph.locHours": "[UBICACIÓN Y HORARIO]",
      "ph.phone": "[TELÉFONO]",
      "ph.email": "[CORREO]",
      "ph.hours": "[HORARIO]",
      "ph.instagram": "[ENLACE_DE_INSTAGRAM]",

      "m.tacos.n": "Tacos",
      "m.elote.n": "Elote",
      "m.elotevaso.n": "Elote en vaso",
      "m.tacosalad.n": "Taco salad",
      "m.carnefries.n": "Carne asada fries",
      "m.burger.n": "Burgers & hot dogs",
      "m.tenders.n": "Chicken tenders & fries",
      "m.cheesyfries.n": "Cheesy fries",
      "m.corndog.n": "Corn dog",
      "m.peanuts.n": "Boiled peanuts",
      "m.churros.n": "Churros",
      "m.crepas.n": "Crepas",
      "m.funnel.n": "Funnel cake",
      "m.oreos.n": "Oreos fritas",
      "m.aguas.n": "Aguas frescas",
      "m.mangonada.n": "Mangonada",
      "menu.intro": "De tacos y elotes a los clásicos de feria y algo dulce. Pregunta en la ventanilla por las especialidades del día.",
      "menu.g1": "Tacos y antojitos",
      "menu.g2": "Clásicos americanos",
      "menu.g3": "Postres",
      "menu.g4": "Bebidas",
      "m.tacos.d": "Pregunta en la ventanilla por los guisos del día.",
      "m.elote.d": "Elote en palito con crema, queso y chile.",
      "m.elotevaso.d": "Elote desgranado servido en vaso.",
      "m.tacosalad.d": "Servida en una concha crujiente.",
      "m.carnefries.d": "Papas cargadas con carne asada.",
      "m.burger.d": "Hamburguesas y hot dogs clásicos.",
      "m.tenders.d": "Tiras de pollo crujientes con papas.",
      "m.cheesyfries.d": "Papas bañadas en queso derretido.",
      "m.corndog.d": "El favorito de la feria.",
      "m.peanuts.d": "Cacahuates hervidos, calientitos y con sal.",
      "m.churros.d": "Churros con azúcar y canela, con chocolate para remojar.",
      "m.crepas.d": "Rellenas de fresas frescas y bañadas en chocolate.",
      "m.funnel.d": "Con crema batida y un chorrito de chocolate.",
      "m.oreos.d": "Fritas, doraditas y con azúcar glas.",
      "m.aguas.d": "Pregunta por los sabores del día.",
      "m.mangonada.d": "Mango con chamoy, chilito y popote de tamarindo.",
      "slot.hero": "Portada: charola de tacos",
      "slot.catering": "El puesto de noche, con letrero iluminado y clientes en fila",
      "slot.truck": "El puesto de día: carpas, letreros y banderas",
      "slot.g1": "Mangonada",
      "slot.g2": "Churros",
      "slot.g3": "Crepas con fresas",
      "slot.g4": "Elote preparado",
      "slot.g5": "Oreos fritas",
      "slot.g6": "Funnel cake",
      "alt.hero": "Charola cargada de Quiero Más Tacos con cilantro, crema, pico de gallo y limón fresco",
      "alt.catering": "El puesto de Quiero Más Tacos iluminado de noche, con papel picado y clientes haciendo fila",
      "alt.truck": "El puesto completo de Quiero Más Tacos de día, con carpas de colores, letreros del menú y papel picado",
      "alt.g1": "Una mangonada con chamoy y popote de tamarindo",
      "alt.g2": "Churros con una taza de chocolate para remojar",
      "alt.g3": "Crepas rellenas de fresa con chocolate",
      "alt.g4": "Elotes preparados con crema, queso y chile",
      "alt.g5": "Oreos fritas con azúcar glas",
      "alt.g6": "Funnel cake con crema batida y chocolate",
      "skip": "Saltar al contenido",
      "aria.home": "Quiero Más Tacos, inicio",
      "aria.nav": "Principal",
      "nav.menu": "Menú",
      "nav.catering": "Taquizas",
      "nav.find": "¿Dónde estamos?",
      "nav.about": "Nosotros",
      "nav.gallery": "Galería",
      "nav.contact": "Contacto",
      "nav.toggle": "Menú",
      "nav.open": "Abrir menú",
      "nav.close": "Cerrar menú",
      "cta.book": "Aparta tu taquiza",
      "cta.menu": "Ver el menú",
      "hero.title": "El sabor de México. <span class=\"accent\">Vas a querer más.</span>",
      "hero.lede": "Puro sabor mexicano en North Sarasota, FL. Pide tus tacos en la ventanilla del truck o te los llevamos a tu fiesta, oficina o celebración.",
      "menu.title": "¿Qué hay de comer?",
      "menu.note": "Precios y disponibilidad sujetos a cambio. El menú puede variar según la ubicación y el evento.",
      "cat.title": "Llevamos el taco truck hasta tu evento",
      "cat.intro": "Desde cumpleaños en el patio hasta comidas de oficina: llegamos, nos instalamos y no paramos de servir tacos para que tú disfrutes tu fiesta.",
      "cat.f1.t": "Celebraciones",
      "cat.f1.d": "Bodas, quinceañeras, cumpleaños y graduaciones.",
      "cat.f2.t": "Empresas y comunidad",
      "cat.f2.d": "Comidas de equipo, open houses y reuniones de la comunidad.",
      "cat.f3.t": "Calientitos del truck",
      "cat.f3.d": "Servidos al momento desde el truck, ahí mismo donde están tus invitados.",
      "cat.details": "Paquetes y precios: <span class=\"ph\">[PAQUETES_Y_PRECIOS]</span>",

      "form.title": "Cotiza tu taquiza",
      "form.sub": "Cuéntanos de tu evento y te contactamos con disponibilidad y una cotización.",
      "form.reqNote": "<span aria-hidden=\"true\">*</span> Campo obligatorio",
      "form.name": "Nombre",
      "form.phone": "Teléfono",
      "form.email": "Correo electrónico",
      "form.type": "Tipo de evento",
      "form.typeChoose": "Elige una opción",
      "form.type.wedding": "Boda",
      "form.type.birthday": "Cumpleaños",
      "form.type.corporate": "Empresarial",
      "form.type.quince": "Quinceañera",
      "form.type.graduation": "Graduación",
      "form.type.other": "Otro",
      "form.date": "Fecha del evento",
      "form.time": "Hora de inicio",
      "form.guests": "Número de invitados",
      "form.guestsHint": "Mínimo 10 invitados",
      "form.location": "Lugar o dirección del evento",
      "form.notes": "Notas o peticiones especiales",
      "form.submit": "Enviar solicitud",
      "form.successTitle": "¡Recibimos tu solicitud!",
      "form.successBody": "Gracias por pensar en nosotros. Muy pronto te contactamos para confirmar los detalles de tu evento.",
      "form.again": "Enviar otra solicitud",
      "form.summary": "Revisa los campos marcados e inténtalo de nuevo.",

      "err.name": "Escribe tu nombre.",
      "err.phoneRequired": "Escribe un número de teléfono.",
      "err.phoneInvalid": "Escribe un teléfono válido (mínimo 10 dígitos).",
      "err.emailRequired": "Escribe tu correo electrónico.",
      "err.emailInvalid": "Escribe un correo válido, por ejemplo nombre@ejemplo.com.",
      "err.dateRequired": "Elige la fecha de tu evento.",
      "err.datePast": "Esa fecha ya pasó. Elige hoy o una fecha futura.",
      "err.guestsRequired": "Dinos cuántos invitados esperas.",
      "err.guestsInvalid": "Escribe un número entero.",
      "err.guestsMin": "Las taquizas son a partir de 10 invitados.",
      "err.location": "Escribe el lugar o la dirección del evento.",
      "find.title": "Encuentra el truck",
      "find.intro": "Andamos por North Sarasota. Checa las paradas de esta semana o sigue el truck en vivo en GoTruckster.",
      "find.schedule": "Horario de esta semana",
      "find.area": "Zona de servicio",
      "find.areaMore": "Distancia para taquizas: <span class=\"ph\">[DETALLES_DE_LA_ZONA]</span>",
      "find.gt": "Síguenos en GoTruckster",
      "find.gtNote": "Abre GoTruckster en otra pestaña.",
      "day.mon": "Lunes", "day.tue": "Martes", "day.wed": "Miércoles", "day.thu": "Jueves",
      "day.fri": "Viernes", "day.sat": "Sábado", "day.sun": "Domingo",
      "about.title": "Sabores de México, hechos en Sarasota",
      "about.p1": "Quiero Más Tacos trae los sabores de México a North Sarasota, taco por taco. El nombre lo dice todo: con uno nunca es suficiente.",
      "about.p2": "<span class=\"ph\">[HISTORIA_DE_LOS_DUEÑOS: quién empezó el truck, cuándo y de dónde vienen las recetas de la familia]</span>",
      "about.signoff": "¡Gracias por apoyar lo local!",
      "gal.title": "Directo del truck",
      "contact.title": "Hablemos de tacos",
      "contact.phone": "Teléfono",
      "contact.email": "Correo",
      "contact.hours": "Horario",
      "contact.follow": "Síguenos",

      "footer.tag": "El sabor de México · North Sarasota, FL",
      "footer.rights": "Todos los derechos reservados.",
      "footer.top": "Volver arriba"
    }
  };

  var STORAGE_KEY = "qmt-lang";
  var currentLang = "en";

  function t(key) {
    var dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return dict[key] != null ? dict[key] : (TRANSLATIONS.en[key] != null ? TRANSLATIONS.en[key] : key);
  }

  function getSavedLang() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveLang(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable: ignore */ }
  }
  function detectLang() {
    var saved = getSavedLang();
    if (saved === "es" || saved === "en") return saved;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    return /^es\b/i.test(nav) ? "es" : "en";
  }

  /* ---------- Apply a language to the whole page (no reload) ---------- */
  function applyLanguage(lang) {
    currentLang = TRANSLATIONS[lang] ? lang : "en";
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html")); // trusted static strings only
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
    });

    document.title = t("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.description"));
    var brand = document.querySelector(".brand");
    if (brand) brand.setAttribute("aria-label", t("aria.home"));
    var nav = document.getElementById("main-nav");
    if (nav) nav.setAttribute("aria-label", t("aria.nav"));

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === currentLang));
    });

    updateNavToggleLabel();
    refreshFormErrors();
  }

  /* ---------- Language toggle ---------- */
  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (lang === currentLang) return;
      applyLanguage(lang);
      saveLang(lang);
    });
  });

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  function updateNavToggleLabel() {
    if (!navToggle) return;
    var open = navToggle.getAttribute("aria-expanded") === "true";
    var label = navToggle.querySelector(".sr-only");
    if (label) label.textContent = t(open ? "nav.close" : "nav.open");
  }
  function setNav(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    mainNav.classList.toggle("open", open);
    updateNavToggleLabel();
  }
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Photo slots ----------
     Each slot expects a file in /images (see README). If the file is
     there it shows; if not, the labeled placeholder box stays visible. */
  document.querySelectorAll(".photo-slot").forEach(function (slot) {
    var img = slot.querySelector("img");
    if (!img) return;
    slot.insertAdjacentHTML("afterbegin",
      '<svg class="slot-border" aria-hidden="true" focusable="false"><rect x="1.5" y="1.5" rx="16" ry="16"/></svg>');
    function ok() { slot.classList.add("has-photo"); slot.classList.remove("is-missing"); }
    function missing() { slot.classList.add("is-missing"); slot.classList.remove("has-photo"); }
    if (img.complete) {
      if (img.naturalWidth > 0) ok(); else missing();
    }
    img.addEventListener("load", ok);
    img.addEventListener("error", missing);
  });

  /* ---------- Scroll reveal (progressive enhancement) ---------- */
  if ("IntersectionObserver" in window) {
    var targets = document.querySelectorAll(".section-head, .menu-group, .feature-list li, .form-card, .schedule-card, .area-card, .about-copy, .gallery-grid .photo-slot, .contact-card");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =========================================================
     CATERING FORM
     ========================================================= */
  var form = document.getElementById("cateringForm");
  var success = document.getElementById("formSuccess");
  var summary = document.getElementById("formSummary");
  var againBtn = document.getElementById("formAgain");
  var dateInput = document.getElementById("f-date");
  var errorState = {};      // fieldId -> translation key of the current error
  var attempted = false;    // only show live errors after the first submit attempt

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  if (dateInput) dateInput.min = todayISO();

  var validators = {
    "f-name": function (v) { return v.trim() ? null : "err.name"; },
    "f-phone": function (v) {
      if (!v.trim()) return "err.phoneRequired";
      var digits = v.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15 ? null : "err.phoneInvalid";
    },
    "f-email": function (v) {
      if (!v.trim()) return "err.emailRequired";
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "err.emailInvalid";
    },
    "f-date": function (v) {
      if (!v) return "err.dateRequired";
      return v < todayISO() ? "err.datePast" : null;
    },
    "f-guests": function (v, el) {
      if (el && el.validity && el.validity.badInput) return "err.guestsInvalid";
      if (!String(v).trim()) return "err.guestsRequired";
      if (!/^\d+$/.test(String(v).trim())) return "err.guestsInvalid";
      return parseInt(v, 10) >= 10 ? null : "err.guestsMin";
    },
    "f-location": function (v) { return v.trim() ? null : "err.location"; }
  };

  function showError(id, key) {
    var input = document.getElementById(id);
    var err = document.getElementById("e-" + id.slice(2));
    if (key) {
      errorState[id] = key;
      input.setAttribute("aria-invalid", "true");
      if (err) err.textContent = t(key);
    } else {
      delete errorState[id];
      input.removeAttribute("aria-invalid");
      if (err) err.textContent = "";
    }
  }

  function validateField(id) {
    var el = document.getElementById(id);
    var key = validators[id](el.value, el);
    showError(id, key);
    return !key;
  }

  function validateAll() {
    var firstInvalid = null;
    Object.keys(validators).forEach(function (id) {
      if (!validateField(id) && !firstInvalid) firstInvalid = document.getElementById(id);
    });
    return firstInvalid;
  }

  // Re-translate visible errors when the language changes
  function refreshFormErrors() {
    Object.keys(errorState).forEach(function (id) { showError(id, errorState[id]); });
    if (summary && summary.textContent) summary.textContent = t("form.summary");
  }

  function collectFormData() {
    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (value, key) { data[key] = typeof value === "string" ? value.trim() : value; });
    data.guests = parseInt(data.guests, 10);
    data.language = currentLang;
    data.submittedAt = new Date().toISOString();
    return data;
  }

  /* ---------------------------------------------------------
     submitCateringRequest(data)
     The ONE place a catering request is "sent".

     Right now it sends NOTHING: no fetch, no form service,
     no backend. It only resolves so the UI can confirm.

     >>> WEBHOOK HOOK-UP POINT <<<
     To connect n8n (or Formspree, Zapier, etc.) later, replace the
     body below with something like:

       return fetch("https://YOUR-N8N-HOST/webhook/catering-request", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
       }).then(function (res) {
         if (!res.ok) throw new Error("Request failed: " + res.status);
       });

     `data` contains: name, phone, email, eventDate, startTime, guests,
     location, eventType, notes, language, submittedAt.
     --------------------------------------------------------- */
  function submitCateringRequest(data) {
    void data; // intentionally unused until a webhook is connected
    return Promise.resolve();
  }

  if (form) {
    Object.keys(validators).forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener("blur", function () { if (attempted || el.value) validateField(id); });
      el.addEventListener("input", function () { if (attempted || errorState[id]) validateField(id); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      attempted = true;
      var firstInvalid = validateAll();
      if (firstInvalid) {
        summary.textContent = t("form.summary");
        firstInvalid.focus();
        return;
      }
      summary.textContent = "";
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;

      submitCateringRequest(collectFormData()).then(function () {
        form.reset();
        attempted = false;
        Object.keys(errorState).forEach(function (id) { showError(id, null); });
        form.hidden = true;
        success.hidden = false;
        success.focus();
      }).finally(function () {
        btn.disabled = false;
      });
    });

    againBtn.addEventListener("click", function () {
      success.hidden = true;
      form.hidden = false;
      if (dateInput) dateInput.min = todayISO();
      document.getElementById("f-name").focus();
    });
  }

  /* ---------- Init ---------- */
  applyLanguage(detectLang());
})();
