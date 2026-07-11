import "./composition.css";

const DATA = [
  { label: "Sachets", value: 38, color: "#D85A30" },
  { label: "Plastic bags", value: 27, color: "#EF9F27" },
  { label: "Bottles", value: 19, color: "var(--color-hunter-green-500)" },
  { label: "Other", value: 16, color: "var(--color-neutral-600)" },
];

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function buildArcs() {
  let cumulative = 0;
  return DATA.map((d) => {
    const arcLength = (d.value / 100) * CIRCUMFERENCE;
    const offset = (cumulative / 100) * CIRCUMFERENCE;
    cumulative += d.value;
    return { ...d, arcLength, offset };
  });
}

function renderMarkup() {
  const arcs = buildArcs();

  const circles = arcs
    .map(
      (a, i) => `
      <circle
        class="donut-arc"
        cx="100" cy="100" r="${RADIUS}"
        fill="none"
        stroke="${a.color}"
        stroke-width="28"
        stroke-dasharray="0 ${CIRCUMFERENCE}"
        stroke-dashoffset="${-a.offset}"
        data-target-length="${a.arcLength}"
        data-delay="${i * 150}"
        transform="rotate(-90 100 100)"
      />`
    )
    .join("");

  const legendItems = DATA.map(
    (d, i) => `
      <div class="legend-item" style="transition-delay:${0.3 + i * 0.12}s">
        <span class="legend-dot" style="background:${d.color}"></span>
        <span class="legend-label">${d.label}</span>
        <span class="legend-value">${d.value}%</span>
      </div>`
  ).join("");

  return `
    <div class="composition-header">
      <p class="composition-eyebrow">A problem we face every day</p>
      <h2 class="composition-title">Indonesia's Sachet Habit</h2>
      <p class="composition-subtitle">
        Millions of plastic sachets are used and discarded every day. Their
        journey almost always ends up in the same place.
      </p>
    </div>

    <div class="composition-body">
      <div class="donut-wrap">
        <svg viewBox="0 0 200 200" class="donut-svg" role="img" aria-label="Donut chart of Indonesia's plastic waste composition: sachets 38 percent, plastic bags 27 percent, bottles 19 percent, other 16 percent">
          ${circles}
        </svg>
      </div>

      <div class="legend-block">
        <p class="legend-title">Composition of Indonesia's plastic waste</p>
        <div class="legend-list">
          ${legendItems}
        </div>
      </div>
    </div>
  `;
}

function initAnimation(section) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        section.classList.add("composition-visible");

        section.querySelectorAll(".donut-arc").forEach((arc) => {
          const target = arc.getAttribute("data-target-length");
          const delay = Number(arc.getAttribute("data-delay"));
          setTimeout(() => {
            arc.style.transition = "stroke-dasharray 0.9s ease-out";
            arc.setAttribute("stroke-dasharray", `${target} ${CIRCUMFERENCE}`);
          }, delay);
        });

        observer.disconnect();
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);
}

export function initComposition() {
  const section = document.getElementById("composition");
  if (!section) return;

  section.innerHTML = renderMarkup();
  initAnimation(section);
}