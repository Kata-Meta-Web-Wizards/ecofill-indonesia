import "./calculator.css";
import {
  calcKemasanPerTahun,
  calcKgLimbahPerTahun,
} from "../../js/data/calculator-constants.js";

import leafIcon from "../../assets/icons/leaf.svg";
import bottleSliderIcon from "../../assets/icons/bottle-slider.svg";
import recycleIcon from "../../assets/images/recycle.svg";
import bottleStatIcon from "../../assets/images/bottle.svg";

const SLIDER_MIN = 0;
const SLIDER_MAX = 30;
const SLIDER_DEFAULT = 0;

// Format an integer with "." as the thousands separator (e.g. 1040 -> "1.040"),
function formatThousands(value) {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderMarkup() {
  return `
    <div class="calculator-card">
      <div class="calculator-header">
        <h2 class="calculator-title">
          Calculate Your <span class="text-primary">Impact</span>
          <img class="calculator-icon-inline" src="${leafIcon}" alt="" />
        </h2>
        <p class="calculator-subtitle">
          Discover how much plastic waste you can reduce by using refills.
        </p>
      </div>

      <div class="calculator-columns">
        <div class="calculator-col-left">
          <p class="calculator-question">
            How many single-use plastic packages do you use per week?
          </p>

          <div class="calculator-value">
            <span class="calculator-value-number" id="calculator-slider-value">${SLIDER_DEFAULT}</span>
          </div>
          <span class="calculator-value-unit">packages/week</span>

          <div class="calculator-slider-wrapper">
            <img
              class="calculator-slider-icon"
              id="calculator-slider-icon"
              src="${bottleSliderIcon}"
              alt=""
            />
            <input
              type="range"
              id="calculator-slider"
              min="${SLIDER_MIN}"
              max="${SLIDER_MAX}"
              value="${SLIDER_DEFAULT}"
              step="1"
              aria-label="Single-use plastic packages per week"
            />
            <div class="calculator-slider-labels">
              <span>0</span>
              <span>15</span>
              <span>30+</span>
            </div>
          </div>
        </div>

        <div class="calculator-col-right">
          <p class="calculator-result-title">With refills, you can reduce:</p>

          <div class="calculator-stat">
            <div class="calculator-stat-icon">
              <img src="${recycleIcon}" alt="" />
            </div>
            <div class="calculator-stat-text">
              <span class="calculator-stat-number">±<span id="calculator-stat-kemasan">0</span></span>
              <span class="calculator-stat-label">plastic packages<br />per year</span>
            </div>
          </div>

          <div class="calculator-stat-divider"></div>

          <div class="calculator-stat">
            <div class="calculator-stat-icon">
              <img src="${bottleStatIcon}" alt="" />
            </div>
            <div class="calculator-stat-text">
              <span class="calculator-stat-number">±<span id="calculator-stat-kg">0</span><span class="calculator-stat-unit">kg</span></span>
              <span class="calculator-stat-label">plastic waste<br />per year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateSliderVisual(slider, iconEl) {
  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);
  const percent = ((value - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(to right,
    #396633 0%,
    #396633 ${percent}%,
    #e5e7eb ${percent}%,
    #e5e7eb 100%)`;

  iconEl.style.left = `calc(${percent}% + ${12 - (percent * 0.24)}px)`;
}

function updateResults(value) {
  const kemasanPerTahun = calcKemasanPerTahun(value);
  const kgLimbahPerTahun = calcKgLimbahPerTahun(value);

  document.getElementById("calculator-slider-value").textContent = value;
  document.getElementById("calculator-stat-kemasan").textContent =
    formatThousands(kemasanPerTahun);
  document.getElementById("calculator-stat-kg").textContent =
    kgLimbahPerTahun.toFixed(1);
}

export function initCalculator() {
  const section = document.getElementById("calculator");
  if (!section) return;

  section.innerHTML = renderMarkup();

  const slider = document.getElementById("calculator-slider");
  const sliderIcon = document.getElementById("calculator-slider-icon");

  const handleInput = () => {
    const value = Number(slider.value);
    updateSliderVisual(slider, sliderIcon);
    updateResults(value);
  };

  slider.addEventListener("input", handleInput);
  handleInput();
}