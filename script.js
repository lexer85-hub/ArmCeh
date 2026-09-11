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

const COOKIE_KEY = "armceh-analytics-consent-v2";
const cookieBanner = document.querySelector("#cookie-banner");
let analyticsAllowed = false;
let analyticsStarted = false;
try { analyticsAllowed = localStorage.getItem(COOKIE_KEY) === "accepted"; } catch {}

function saveConsent(allowed) {
  analyticsAllowed = allowed;
  try { localStorage.setItem(COOKIE_KEY, allowed ? "accepted" : "rejected"); } catch {}
  cookieBanner?.setAttribute("hidden", "");
  if (allowed) startAnalytics();
  else if (analyticsStarted) {
    window.ym?.(Number(YANDEX_METRIKA_ID), "destruct");
    analyticsStarted = false;
  }
}
document.querySelector("#cookie-accept")?.addEventListener("click", () => saveConsent(true));
document.querySelector("#cookie-reject")?.addEventListener("click", () => saveConsent(false));
document.querySelectorAll(".cookie-settings").forEach(button => button.addEventListener("click", () => {
  cookieBanner?.removeAttribute("hidden");
  document.querySelector("#cookie-reject")?.focus();
}));
try {
  if (!["accepted", "rejected"].includes(localStorage.getItem(COOKIE_KEY))) cookieBanner?.removeAttribute("hidden");
} catch { cookieBanner?.removeAttribute("hidden"); }

const YANDEX_METRIKA_ID = "112493161";

function reachGoal(name) {
  if (!analyticsAllowed || !YANDEX_METRIKA_ID || typeof ym !== "function") return;
  ym(Number(YANDEX_METRIKA_ID), "reachGoal", name);
}

function startAnalytics() {
  if (!analyticsAllowed || analyticsStarted) return;
  analyticsStarted = true;
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

if (analyticsAllowed) startAnalytics();

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const href = link.getAttribute("href") || "";
  if (href.startsWith("tel:")) reachGoal("tel");
  else if (href.startsWith("mailto:")) reachGoal("mailto");
  else if (href.includes("max.ru")) reachGoal("max");
  else if (href.includes(".xlsx")) reachGoal("price_xlsx");
});

