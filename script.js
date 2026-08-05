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


// Модальное окно обратного звонка
const modal = document.querySelector("#callback-modal");
const modalProductInput = modal?.querySelector('input[name="product"]');
const modalTitle = modal?.querySelector("#modal-title");

function openModal(product = "Обратный звонок") {
  if (!modal) {
    return;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (modalProductInput) {
    modalProductInput.value = product;
  }

  if (modalTitle) {
    modalTitle.textContent =
      product === "Обратный звонок"
        ? "Свяжемся с вами"
        : `Уточнить цену: ${product}`;
  }

  setTimeout(() => {
    modal.querySelector("input")?.focus();
  }, 50);
}

function closeModal() {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}


// Кнопки открытия модального окна
document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    openModal();
  });
});


// Кнопки выбора товара
document.querySelectorAll("[data-product]").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product || "Запрос цены";
    openModal(product);
  });
});


// Кнопки закрытия модального окна
document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});


// Закрытие по клавише Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMenu();
  }
});


// Демонстрационная обработка форм
// Сейчас формы никуда не отправляют данные.
// Для реальной отправки потребуется серверный обработчик,
// Telegram-бот, CRM или почтовый сервис.
document.querySelectorAll(".js-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector(".form-status");
    const originalText = submitButton?.textContent;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Отправляем...";
    }

    setTimeout(() => {
      form.reset();

      if (status) {
        status.textContent =
          "Заявка принята в демонстрационном режиме. Для реальной отправки нужно подключить обработчик формы.";

        status.classList.add("is-visible");
      } else {
        alert(
          "Форма работает в демонстрационном режиме. Для реальной отправки нужно подключить обработчик."
        );
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }

      if (form.closest(".modal")) {
        setTimeout(closeModal, 1400);
      }
    }, 700);
  });
});


// Автоматическая установка текущего года в подвале
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}