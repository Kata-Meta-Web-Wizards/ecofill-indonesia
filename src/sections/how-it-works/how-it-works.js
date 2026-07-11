import "./how-it-works.css";

const steps = [
  {
    number: "01",
    title: "Bring Your Container",
    description:
      "Use your own clean container<br />or purchase one at any<br />EcoFill station.",
    image: "/images/how-it-works/bring-container.png",
    imageAlt: "EcoFill turtle bringing reusable containers",
  },
  {
    number: "02",
    title: "Find a Refill Station",
    description:
      "Locate a nearby EcoFill station<br />using our interactive map<br />and choose a location.",
    image: "/images/how-it-works/find-station.png",
    imageAlt: "EcoFill turtle finding a refill station on a map",
  },
  {
    number: "03",
    title: "Fill Your Container",
    description:
      "Use the EcoFill touchscreen<br />to select your product and<br />choose the amount you need.",
    image: "/images/how-it-works/fill-container.png",
    imageAlt: "EcoFill turtle filling a reusable container",
  },
  {
    number: "04",
    title: "Make Your Payment",
    description:
      "Choose your preferred<br />payment method and scan<br />the QR code.",
    image: "/images/how-it-works/make-payment.png",
    imageAlt: "EcoFill turtle showing a digital payment code",
  },
];

function renderStepCard(step, index) {
  return `
    <article
      class="how-it-works-card"
      data-aos="fade-up"
      data-aos-delay="${index * 100}"
    >
      <div class="how-it-works-card-main">
        <div class="how-it-works-step-number">${step.number}</div>

        <h3 class="how-it-works-card-title">${step.title}</h3>

        <div class="how-it-works-image-wrapper">
          <img
            class="how-it-works-image"
            src="${step.image}"
            alt="${step.imageAlt}"
          />
        </div>
      </div>

      <div class="how-it-works-details" aria-hidden="true">
        <p>${step.description}</p>
      </div>

      <button
        class="how-it-works-toggle"
        type="button"
        aria-expanded="false"
        aria-label="Pull down details for ${step.title}"
      >
        <span class="how-it-works-chevron" aria-hidden="true"></span>
      </button>
    </article>
  `;
}

function renderMarkup() {
  return `
    <div class="how-it-works-container">
      <header class="how-it-works-header" data-aos="fade-up">
        <h2 class="how-it-works-title">How It Works?</h2>

        <p class="how-it-works-subtitle">
          Get started in <span>four simple steps</span>!
        </p>
      </header>

      <div class="how-it-works-grid">
        ${steps.map(renderStepCard).join("")}
      </div>

      <div class="how-it-works-note" data-aos="fade-up">
        <h3>Need a container to start?</h3>
        <p>
          Bottles, jars, and jerry cans are also available at all EcoFill
          stations.
        </p>
      </div>
    </div>
  `;
}

function bindCardEvents(section) {
  const cards = section.querySelectorAll(".how-it-works-card");

  cards.forEach((card) => {
    const toggle = card.querySelector(".how-it-works-toggle");
    const details = card.querySelector(".how-it-works-details");
    const title = card.querySelector(".how-it-works-card-title").textContent;

    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";

      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.setAttribute(
        "aria-label",
        `${willOpen ? "Pull up" : "Pull down"} details for ${title}`
      );

      details.setAttribute("aria-hidden", String(!willOpen));
      card.classList.toggle("is-open", willOpen);
    });
  });
}

export function initHowItWorks() {
  const section = document.getElementById("how-it-works");
  if (!section) return;

  section.innerHTML = renderMarkup();
  bindCardEvents(section);
}