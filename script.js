const plans = {
  esencial: {
    label: "Esencial",
    price: 17.5,
    minimum: 100,
  },
  celebracion: {
    label: "Celebracion",
    price: 20,
    minimum: 50,
  },
  experiencia: {
    label: "Experiencia Olympo",
    price: 25,
    minimum: 50,
  },
};

const extras = {
  dj: { label: "DJ y animacion", price: 180 },
  foto: { label: "Fotografia adicional", price: 160 },
  decoracion: { label: "Decoracion especial", price: 220 },
  hora: { label: "Hora loca", price: 140 },
};

const quoteForm = document.querySelector("#quote-form");
const guestsInput = document.querySelector("#guests");
const typeInput = document.querySelector("#event-type");
const dateInput = document.querySelector("#event-date");
const totalElement = document.querySelector("#estimated-total");
const messageElement = document.querySelector("#quote-message");
const whatsappLink = document.querySelector("#whatsapp-quote");
const packageButtons = document.querySelectorAll(".package-select");
const money = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
});

function getSelectedPlan() {
  return document.querySelector('input[name="plan"]:checked').value;
}

function getSelectedExtras() {
  return [...document.querySelectorAll('input[name="extra"]:checked')].map(
    (input) => input.value
  );
}

function updateQuote() {
  const planKey = getSelectedPlan();
  const plan = plans[planKey];
  let guests = Number(guestsInput.value) || plan.minimum;

  if (guests < plan.minimum) {
    guests = plan.minimum;
    guestsInput.value = guests;
  }

  if (guests > 150) {
    guests = 150;
    guestsInput.value = guests;
  }

  const selectedExtras = getSelectedExtras();
  const extrasTotal = selectedExtras.reduce(
    (total, extraKey) => total + extras[extraKey].price,
    0
  );
  const total = guests * plan.price + extrasTotal;
  const extrasText = selectedExtras.length
    ? ` Extras: ${selectedExtras.map((extraKey) => extras[extraKey].label).join(", ")}.`
    : "";
  const dateText = dateInput.value ? ` Fecha tentativa: ${dateInput.value}.` : "";

  totalElement.textContent = money.format(total);
  messageElement.textContent = `Paquete ${plan.label} para ${guests} invitados.${extrasText}`;

  const whatsappMessage = [
    "Hola, quisiera consultar una cotizacion para Olympo Recepciones.",
    `Evento: ${typeInput.value}.`,
    `Paquete: ${plan.label}.`,
    `Invitados: ${guests}.`,
    `Estimado referencial: ${money.format(total)}.`,
    selectedExtras.length ? `Extras: ${selectedExtras.map((key) => extras[key].label).join(", ")}.` : "",
    dateText,
  ]
    .filter(Boolean)
    .join(" ");

  whatsappLink.href = `https://wa.me/593959634548?text=${encodeURIComponent(
    whatsappMessage
  )}`;
}

quoteForm.addEventListener("change", updateQuote);
guestsInput.addEventListener("input", updateQuote);

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const planKey = button.dataset.plan;
    document.querySelector(`input[name="plan"][value="${planKey}"]`).checked = true;
    guestsInput.value = Math.max(Number(guestsInput.value), plans[planKey].minimum);
    updateQuote();
    document.querySelector("#cotizador").scrollIntoView({ behavior: "smooth" });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-menu");

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();
updateQuote();
