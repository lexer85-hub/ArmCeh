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
