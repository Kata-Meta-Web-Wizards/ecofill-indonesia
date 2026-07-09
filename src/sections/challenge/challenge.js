import "./challenge.css";
import { weeks } from "../../js/data/challenges.js";

const icons = {
  bottle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v3M9 5h6M9 9h6v10a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V9z"/>
    <path d="M9 9a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3"/>
  </svg>`,
  station: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
    <line x1="9" y1="18" x2="15" y2="18"/>
    <line x1="9" y1="14" x2="15" y2="14"/>
    <circle cx="12" cy="8" r="2"/>
  </svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>`,
};

function weekItemMarkup(weekData, index) {
  const align = index % 2 === 0 ? "right" : "left";
  return `
    <div class="challenge-item" data-align="${align}">
      <div class="challenge-node">
        <span class="challenge-node-number">${weekData.week}</span>
      </div>
      <div class="challenge-card">
        <div class="challenge-card-icon-wrapper">
          <div class="challenge-card-icon">${icons[weekData.icon] || ""}</div>
        </div>
        <div class="challenge-card-body">
          <span class="challenge-card-badge">WEEK ${weekData.week} · ${weekData.dayRange.toUpperCase()}</span>
          <h3 class="challenge-card-title">${weekData.title}</h3>
          <p class="challenge-card-description">${weekData.description}</p>
        </div>
      </div>
    </div>
  `;
}

function renderMarkup() {
  return `
    <!-- Wave Divider Atas -->
    <div class="custom-shape-divider-top">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>

    <div class="challenge-header" data-aos="fade-up">
      <h2 class="challenge-title">30-Day Refill Challenge</h2>
      <p class="challenge-subtitle">Small sustainable adjustments in your routine lead to massive plastic-saving victories.</p>
    </div>
    
    <div class="challenge-timeline">
      <div class="challenge-track">
        <div class="challenge-track-fill" id="challenge-track-fill"></div>
      </div>
      <div class="challenge-items">
        ${weeks.map((w, i) => weekItemMarkup(w, i)).join("")}
      </div>
    </div>

    <!-- Wave Divider Bawah -->
    <div class="custom-shape-divider-bottom">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
      </svg>
    </div>
  `;
}

export function initChallenge() {
  const section = document.getElementById("challenge");
  if (!section) return;

  section.innerHTML = renderMarkup();

  const track = section.querySelector(".challenge-track");
  const fill = document.getElementById("challenge-track-fill");
  const items = section.querySelectorAll(".challenge-item");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
  );
  items.forEach((item) => revealObserver.observe(item));


  let ticking = false;

  function updateFill() {
    const rect = track.getBoundingClientRect();
    const viewportMid = window.innerHeight * 0.55; 
    const progress = (viewportMid - rect.top) / rect.height;
    const clamped = Math.min(Math.max(progress, 0), 1);
    
    fill.style.height = `${clamped * 100}%`;

    items.forEach(item => {
      const node = item.querySelector(".challenge-node");
      const card = item.querySelector(".challenge-card");
      
      if (node && card) {
        const nodeRect = node.getBoundingClientRect();
        const nodeCenter = nodeRect.top + (nodeRect.height / 2);

        if (nodeCenter <= viewportMid) {
          node.classList.add("is-active");
          card.classList.add("is-fulfilled");
        } else {
          node.classList.remove("is-active");
          card.classList.remove("is-fulfilled");
        }
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateFill);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateFill();
}