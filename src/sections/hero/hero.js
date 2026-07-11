import "./hero.css";
import heroBg from "../../assets/images/hero-bg.png";

function renderMarkup() {
  return `
    <div class="hero-bg">
      <div class="hero-photo" style="background-image: url('${heroBg}')"></div>
      <div class="hero-overlay"></div>

      <div class="hero-inner">
        <div class="hero-text-glow"></div>

        <span class="hero-badge">Return &amp; Refill &ndash; Indonesia's Refill Movement</span>

        <h1 class="hero-title">
          Shop Without<br />
          Plastic Waste
        </h1>

        <p class="hero-subtitle">
          It's time to switch to a better way of shopping! Visit the nearest
          refill station to restock your household essentials. An
          eco-friendly, cost-saving solution &mdash; reuse your own container
          and cut down on sachet waste.
        </p>

        <div class="hero-divider">
          <span class="hero-divider-label">Facts You Need to Know</span>
          <span class="hero-divider-line"></span>
        </div>

        <div class="hero-facts">
          <div class="hero-fact-card">
            <div class="hero-fact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="hero-fact-value">4 kg</p>
            <p class="hero-fact-label">of sachet waste per person per year</p>
            <p class="hero-fact-desc">The average sachet plastic consumption of one Indonesian per year.</p>
          </div>

          <div class="hero-fact-card">
            <div class="hero-fact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                <path d="M12 6v12M9.5 9.5c0-1.2 1.1-2 2.5-2s2.5.9 2.5 2-.9 1.6-2.5 2c-1.6.4-2.5 1-2.5 2.2s1.1 2 2.5 2 2.5-.8 2.5-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="hero-fact-value">Rp 1.5T</p>
            <p class="hero-fact-label">in social costs every year</p>
            <p class="hero-fact-desc">From health issues caused by burning sachet waste in open landfills.</p>
          </div>

          <div class="hero-fact-card">
            <div class="hero-fact-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M15 15a1 1 0 1 1-2 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <p class="hero-fact-value">800K tons</p>
            <p class="hero-fact-label">of plastic entering the ocean by 2025</p>
            <p class="hero-fact-desc">Projected flow of Indonesia's plastic waste into waterways, up 30% from the previous year.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  hero.innerHTML = renderMarkup();
}