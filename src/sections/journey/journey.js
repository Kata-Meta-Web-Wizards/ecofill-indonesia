import "./journey.css";

import sachetIcon from "../../assets/images/journey-sachet.svg";
import handIcon from "../../assets/images/journey-hand.svg";
import trashIcon from "../../assets/images/journey-trash.svg";
import wavesIcon from "../../assets/images/journey-waves.svg";
import bottleIcon from "../../assets/images/journey-bottle.svg";
import dropletIcon from "../../assets/images/journey-droplet.svg";
import handPourIcon from "../../assets/images/journey-hand-pour.svg";
import refreshBaseIcon from "../../assets/images/journey-refresh-base.svg";
import refreshArrowsIcon from "../../assets/images/journey-refresh-arrows.png";

const SACHET_STEPS = [
  { label: "Beli Sachet", icon: sachetIcon },
  { label: "Dipakai Sekali", icon: handIcon },
  { label: "Dibuang", icon: trashIcon },
  { label: "TPA/sungai/laut", icon: wavesIcon, floating: true },
];

const REFILL_STEPS = [
  { label: "Beli Botol Sekali", icon: bottleIcon },
  { label: "Isi Ulang", icon: dropletIcon },
  { label: "Dipakai Lagi", icon: handPourIcon },
  { label: "Isi ulang lagi", icon: refreshBaseIcon, overlay: refreshArrowsIcon },
];

function renderStep(step, index, dotClass) {
  const floatClass = step.floating ? "step-icon-floating" : "";
  const overlay = step.overlay
    ? `<img src="${step.overlay}" alt="" class="step-icon-overlay-spin" />`
    : "";
  return `
    <div class="journey-step" style="transition-delay:${index * 0.12}s">
      <div class="step-icon-box ${floatClass}">
        <img src="${step.icon}" alt="" class="step-icon-img" />
        ${overlay}
      </div>
      <span class="step-label-dot ${dotClass}"></span>
      <p class="step-label">${step.label}</p>
    </div>
  `;
}

function renderArrow(index) {
  return `
    <div class="journey-arrow" style="transition-delay:${index * 0.12 + 0.06}s" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `;
}

function renderRow(steps, dotClass) {
  return steps
    .map((step, i) => {
      const arrow = i < steps.length - 1 ? renderArrow(i) : "";
      return renderStep(step, i, dotClass) + arrow;
    })
    .join("");
}

function renderMarkup() {
  return `
    <div class="journey-block">
      <p class="journey-heading"><span class="journey-bar journey-bar-bad"></span>Jalur sachet sekali pakai</p>
      <div class="journey-row">
        ${renderRow(SACHET_STEPS, "dot-bad")}
      </div>
      <div class="journey-callout callout-bad">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="callout-icon">
          <path d="M12 9v4M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
        <p>Sachet terbuat dari 3&ndash;4 lapisan plastik berbeda &mdash; hampir tidak bisa didaur ulang oleh industri manapun.</p>
      </div>
    </div>

    <div class="journey-block">
      <p class="journey-heading"><span class="journey-bar journey-bar-good"></span>Jalur refill isi ulang</p>
      <div class="journey-row">
        ${renderRow(REFILL_STEPS, "dot-good")}
      </div>
      <div class="journey-callout callout-good">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="callout-icon">
          <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Satu botol bisa menggantikan ratusan sachet &mdash; dan terus digunakan selama bertahun-tahun.</p>
      </div>
    </div>
  `;
}

function initAnimation(section) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("journey-visible");
      });
    },
    { threshold: 0.25 }
  );

  section.querySelectorAll(".journey-block").forEach((block) => observer.observe(block));
}

export function initJourney() {
  const section = document.getElementById("journey");
  if (!section) return;

  section.innerHTML = renderMarkup();
  initAnimation(section);
}