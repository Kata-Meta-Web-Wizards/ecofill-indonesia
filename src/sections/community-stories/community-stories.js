import "./community-stories.css";
import { communityStories } from "../../js/data/community-stories.js";

const AUTOPLAY_DELAY = 5000;

let activeStoryIndex = 0;
let autoplayTimer = null;
let touchStartX = 0;

function getRelativePosition(index) {
  const total = communityStories.length;
  const difference = (index - activeStoryIndex + total) % total;

  if (difference === 0) return "active";
  if (difference === 1) return "next";
  if (difference === total - 1) return "previous";
  return "hidden";
}

function renderStoryCard(story, index) {
  const position = getRelativePosition(index);
  const isActive = position === "active";

  return `
    <article
      class="community-story-card is-${position}"
      data-story-index="${index}"
      aria-hidden="${String(!isActive)}"
    >
      <div class="community-story-avatar" aria-hidden="true">
        <span>${story.initials}</span>
        <i></i>
      </div>

      <div class="community-story-copy">
        <div class="community-story-person">
          <h3>${story.name}, ${story.age}</h3>

          <div class="community-story-meta">
            <span>
              <img src="/images/vectors/job.png" alt="" />
              ${story.role}
            </span>

            <span>
              <img src="/images/vectors/location.png" alt="" />
              ${story.location}
            </span>
          </div>
        </div>

        <div class="community-story-quote">
          <blockquote>&ldquo;${story.quote}&rdquo;</blockquote>
        </div>

        <div class="community-story-pills">
          <span class="community-story-pill">
            ${story.mostBoughtProduct}
          </span>

          <span class="community-story-pill">
            ${story.refillsPerMonth}&times; Refills/mon
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderCarousel(section) {
  section.innerHTML = `
    <div class="community-stories-background" aria-hidden="true"></div>
    <div class="community-stories-glow" aria-hidden="true"></div>

    <div class="community-stories-container">
      <header class="community-stories-header" data-aos="fade-up">
        <span class="community-stories-eyebrow">Stories that keep circulating</span>
        <h2>Community Stories</h2>
        <p>Join thousands of Indonesians who choose refill every week.</p>
      </header>

      <div
        class="community-stories-carousel"
        aria-roledescription="carousel"
        aria-label="Community refill stories"
      >
        <div class="community-stories-track" aria-live="polite">
          ${communityStories.map(renderStoryCard).join("")}
        </div>

        <div class="community-stories-controls">
          <button class="community-stories-arrow" type="button" data-story-action="previous" aria-label="Previous community story">
            <span aria-hidden="true"></span>
          </button>

          <div class="community-stories-page-list" aria-label="Choose a community story">
            ${communityStories
              .map(
                (story, index) => `
                  <button
                    class="community-stories-page-number ${
                      index === activeStoryIndex ? "is-active" : ""
                    }"
                    type="button"
                    data-story-dot="${index}"
                    aria-label="Show story ${index + 1} from ${story.name}"
                    aria-current="${index === activeStoryIndex ? "true" : "false"}"
                  >
                    ${index + 1}
                  </button>
                `
              )
              .join("")}
          </div>

          <button class="community-stories-arrow is-next" type="button" data-story-action="next" aria-label="Next community story">
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  `;
}

function updateCarousel(section) {
  section.querySelectorAll("[data-story-index]").forEach((card) => {
    const index = Number(card.dataset.storyIndex);
    const position = getRelativePosition(index);
    const isActive = position === "active";

    card.className = `community-story-card is-${position}`;
    card.setAttribute("aria-hidden", String(!isActive));
  });

  section.querySelectorAll("[data-story-dot]").forEach((dot) => {
    const isActive = Number(dot.dataset.storyDot) === activeStoryIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
}

function showStory(section, index) {
  const total = communityStories.length;
  activeStoryIndex = (index + total) % total;
  updateCarousel(section);
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = null;
}

function startAutoplay(section) {
  stopAutoplay();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  autoplayTimer = window.setInterval(() => {
    showStory(section, activeStoryIndex + 1);
  }, AUTOPLAY_DELAY);
}

function bindCarouselEvents(section) {
  const carousel = section.querySelector(".community-stories-carousel");

  section.querySelectorAll("[data-story-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.storyAction === "next" ? 1 : -1;
      showStory(section, activeStoryIndex + direction);
      startAutoplay(section);
    });
  });

  section.querySelectorAll("[data-story-dot]").forEach((dot) => {
    dot.addEventListener("click", () => {
      showStory(section, Number(dot.dataset.storyDot));
      startAutoplay(section);
    });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", () => startAutoplay(section));
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay(section);
  });

  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showStory(section, activeStoryIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) {
      showStory(section, activeStoryIndex + (distance < 0 ? 1 : -1));
    }
    startAutoplay(section);
  }, { passive: true });
}

export function initCommunityStories() {
  const section = document.getElementById("community-stories");
  if (!section) return;

  renderCarousel(section);
  bindCarouselEvents(section);
  startAutoplay(section);
}
