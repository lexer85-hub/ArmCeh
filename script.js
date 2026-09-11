// Мобильное меню
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".nav");

function closeMenu() {
  menuButton?.classList.remove("is-open");
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");

  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});


// Закрытие мобильного меню по Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

// Автоматическая установка текущего года в подвале
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const COOKIE_KEY = "armceh-map-consent";
const cookieBanner = document.querySelector("#cookie-banner");
const cookieAccept = document.querySelector("#cookie-accept");

function hideCookieBanner() {
  cookieBanner?.setAttribute("hidden", "");
}

try {
  if (cookieBanner && localStorage.getItem(COOKIE_KEY) !== "1") {
    cookieBanner.removeAttribute("hidden");
  }
} catch {
  cookieBanner?.removeAttribute("hidden");
}

cookieAccept?.addEventListener("click", () => {
  try {
    localStorage.setItem(COOKIE_KEY, "1");
  } catch {
    // ignore storage errors
  }
  hideCookieBanner();
});

const YANDEX_METRIKA_ID = "112493161";

function reachGoal(name) {
  if (!YANDEX_METRIKA_ID || typeof ym !== "function") return;
  ym(Number(YANDEX_METRIKA_ID), "reachGoal", name);
}

if (YANDEX_METRIKA_ID) {
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) {
        return;
      }
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(Number(YANDEX_METRIKA_ID), "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  if (href.startsWith("tel:")) reachGoal("tel");
  else if (href.startsWith("mailto:")) reachGoal("mailto");
  else if (href.includes("max.ru")) reachGoal("max");
  else if (href.includes(".xlsx")) reachGoal("price_xlsx");
});

