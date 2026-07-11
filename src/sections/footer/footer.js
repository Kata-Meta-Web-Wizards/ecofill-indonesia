import "./footer.css";
import logoImg from "../../assets/images/logo.png";

const NAV_LINKS = [
  { label: "Locations", href: "#lokasi" },
  { label: "Products", href: "#produk" },
  { label: "Impact", href: "#impact" },
  { label: "About Us", href: "#tentang" },
];

const RESOURCE_LINKS = [
  { label: "How It Works", href: "#journey" },
  { label: "Plastic Calculator", href: "#calculator" },
  { label: "FAQ", href: "#faq" },
  { label: "Become a Partner", href: "#partner" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: `<path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/>`,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: `<path d="M14 3v10.5a3.5 3.5 0 1 1-3-3.46" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 3c0 2.5 2 4.5 4.5 4.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>`,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: `<path d="M6.5 17.5 5 20l2.6-1.4A8 8 0 1 0 5 14.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 9.5c0 3.5 2 5.5 5.5 5.5.6 0 1-.6.8-1.1l-.7-1.5c-.2-.4-.7-.5-1.1-.3l-.7.4c-.8-.5-1.4-1.1-1.9-1.9l.4-.7c.2-.4.1-.9-.3-1.1L9.9 8.2c-.5-.2-1.1.2-1.1.8z" fill="currentColor"/>`,
  },
];

function renderLinkColumn(title, links) {
  const items = links
    .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
    .join("");
  return `
    <div class="footer-col">
      <p class="footer-col-title">${title}</p>
      <ul class="footer-links">${items}</ul>
    </div>
  `;
}

function renderMarkup() {
  const year = new Date().getFullYear();

  const socialItems = SOCIAL_LINKS.map(
    (s) => `
      <a href="${s.href}" class="footer-social-link" aria-label="${s.label}" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          ${s.icon}
        </svg>
      </a>`
  ).join("");

  return `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-brand-row">
            <img src="${logoImg}" alt="EcoFill Indonesia" class="footer-logo" />
            <span class="footer-brand-text">
              <span class="footer-brand-line1"><span class="brand-eco">Eco</span><span class="brand-fill">Fill</span></span>
              <span class="footer-brand-line2">Indonesia</span>
            </span>
          </div>
          <p class="footer-brand-desc">
            Building Indonesia's refill station network &mdash; one bottle at
            a time. Together, let's cut down on single-use sachet waste.
          </p>
          <div class="footer-social">
            ${socialItems}
          </div>
        </div>

        ${renderLinkColumn("Navigate", NAV_LINKS)}
        ${renderLinkColumn("Resources", RESOURCE_LINKS)}

        <div class="footer-col">
          <p class="footer-col-title">Get in Touch</p>
          <ul class="footer-links">
            <li><a href="mailto:hello@ecofill.id">hello@ecofill.id</a></li>
            <li><a href="tel:+6280000000">+62 800-0000-000</a></li>
            <li><span class="footer-static">Jakarta, Indonesia</span></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; ${year} EcoFill Indonesia. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#privacy">Privacy Policy</a>
          <span class="footer-dot">&middot;</span>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </div>
  `;
}

export function initFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = renderMarkup();
}