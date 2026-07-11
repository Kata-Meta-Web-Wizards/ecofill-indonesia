import "./impact.css";

const STATS = [
  {
    value: 50284,
    suffix: "",
    label: "refill dilakukan",
    icon: `<path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18 4v4h-4M6 20v-4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  },
  {
    value: 1200,
    suffix: " kg",
    label: "sampah plastik dicegah",
    icon: `<path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 3l18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  },
  {
    value: 8420,
    suffix: "",
    label: "botol digunakan kembali",
    icon: `<path d="M10 3h4v3l2 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3V3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
  },
  {
    value: 542,
    suffix: "",
    label: "komunitas bergabung",
    icon: `<circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M16 8a3 3 0 1 1 0-6M17 14c2.8.4 5 2.8 5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
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
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            ${stat.icon}
          </svg>
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