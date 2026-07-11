import "./impact.css";

import refillIcon from "../../assets/icons/refill.svg";
import wasteIcon from "../../assets/icons/waste-off.svg";
import bottleIcon from "../../assets/icons/bottle-stat.svg";
import communityIcon from "../../assets/icons/community.svg";

const STATS = [
  {
    value: 50284,
    suffix: "",
    label: "refill dilakukan",
    icon: refillIcon,
  },
  {
    value: 1200,
    suffix: " kg",
    label: "sampah plastik dicegah",
    icon: wasteIcon,
  },
  {
    value: 8420,
    suffix: "",
    label: "botol digunakan kembali",
    icon: bottleIcon,
  },
  {
    value: 542,
    suffix: "",
    label: "komunitas bergabung",
    icon: communityIcon,
  },
];

function formatNumber(value) {
  return Math.round(value).toLocaleString("id-ID");
}

function renderMarkup() {
  const statBoxes = STATS.map(
    (stat, i) => `
      <div class="impact-stat" style="transition-delay:${i * 0.12}s">
        <div class="impact-icon">
          <img src="${stat.icon}" alt="" class="impact-icon-img" />
        </div>
        <p class="impact-value" data-target="${stat.value}" data-suffix="${stat.suffix}">0</p>
        <p class="impact-label">${stat.label}</p>
      </div>`
  ).join("");

  return `
    <div class="impact-decor impact-decor-1"></div>
    <div class="impact-decor impact-decor-2"></div>

    <div class="impact-inner">
      <p class="impact-eyebrow">Bersama kita telah mengurangi</p>
      <h2 class="impact-title">Dampak nyata dari gerakan ini</h2>
      <p class="impact-subtitle">
        Setiap angka di bawah ini mewakili satu keputusan kecil yang, kalau
        dilakukan bersama, jadi perubahan besar.
      </p>

      <div class="impact-grid">
        ${statBoxes}
      </div>

      <p class="impact-footnote">
        <span class="impact-live-dot"></span>
        Diperbarui secara berkala dari jaringan mitra refill station
      </p>
    </div>
  `;
}

function animateValue(el, target, suffix, duration) {
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = target * eased;
    el.textContent = formatNumber(current) + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = formatNumber(target) + suffix;
    }
  }

  requestAnimationFrame(step);
}

function initAnimation(section) {
  const boxes = section.querySelectorAll(".impact-stat");
  const boxObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("impact-stat-visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  boxes.forEach((box) => boxObserver.observe(box));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        section.querySelectorAll(".impact-value").forEach((el, i) => {
          const target = Number(el.getAttribute("data-target"));
          const suffix = el.getAttribute("data-suffix");
          setTimeout(() => animateValue(el, target, suffix, 1300), i * 100);
        });

        counterObserver.disconnect();
      });
    },
    { threshold: 0.3 }
  );
  counterObserver.observe(section);
}

export function initImpact() {
  const section = document.getElementById("impact");
  if (!section) return;

  section.innerHTML = renderMarkup();
  initAnimation(section);
}