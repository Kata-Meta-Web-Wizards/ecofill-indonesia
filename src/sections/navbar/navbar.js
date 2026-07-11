import "./navbar.css";
import logoImg from "../../assets/images/logo.png";

function renderMarkup() {
  return `
    <div class="navbar-inner">
      <a href="#hero" class="navbar-brand">
        <img class="navbar-logo" src="${logoImg}" alt="EcoFill Indonesia" />
        <span class="navbar-brand-text">
          <span class="brand-line1"><span class="brand-eco">Eco</span><span class="brand-fill">Fill</span></span>
          <span class="brand-line2">Indonesia</span>
        </span>
      </a>

      <button class="navbar-toggle" id="navbar-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>

      <ul class="navbar-links" id="navbar-links">
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#map">Locations</a></li>
        <li><a href="#impact">Impact</a></li>
      </ul>
    </div>
  `;
}

function attachBehavior(navbar) {
  const toggle = document.getElementById("navbar-toggle");
  const links = document.getElementById("navbar-links");

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-solid");
    } else {
      navbar.classList.remove("navbar-solid");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("navbar-links-open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.classList.toggle("navbar-toggle-active");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("navbar-links-open");
      toggle.classList.remove("navbar-toggle-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

export function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  navbar.innerHTML = renderMarkup();
  attachBehavior(navbar);
}