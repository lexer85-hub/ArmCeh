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

// Карта загружается только по запросу посетителя.
const loadMapButton = document.querySelector("#load-warehouse-map");
loadMapButton?.addEventListener("click", () => {
  const map = document.createElement("iframe");
  map.src = "https://yandex.ru/map-widget/v1/?ll=30.359724%2C59.989823&z=16&pt=30.359724%2C59.989823%2Cpm2rdm";
  map.title = "Склад Арматурный цех — 59.989823, 30.359724";
  map.referrerPolicy = "no-referrer";
  map.allowFullscreen = true;
  document.querySelector("#warehouse-map")?.replaceChildren(map);
  map.focus();
});
