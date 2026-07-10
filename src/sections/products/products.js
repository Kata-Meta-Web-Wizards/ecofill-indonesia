import "./products.css";
import { productCategories, products } from "../../js/data/products.js";

const PRODUCTS_PER_PAGE = 8;
const TOTAL_PAGE_LABEL = 5;
const TOP_PRODUCT_ID = "shampoo";

const containerAssets = {
  Bottle: {
    icon: "/images/vectors/bottle.png",
    className: "products-container-bottle",
  },
  Jar: {
    icon: "/images/vectors/jar.png",
    className: "products-container-jar",
  },
  "Jerry Can": {
    icon: "/images/vectors/jerry-can.png",
    className: "products-container-jerry",
  },
};

let activeCategory = "All";
let searchQuery = "";
let selectedProductId = null;
let currentPage = 1;

function getFilteredProducts() {
  return products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;

    const keyword = searchQuery.trim().toLowerCase();
    const matchesSearch =
      keyword.length === 0 ||
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword) ||
      product.container.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });
}

function getTopProduct() {
  return products.find((product) => product.id === TOP_PRODUCT_ID) || products[0];
}

function getSelectedProduct() {
  if (!selectedProductId) return null;
  return products.find((product) => product.id === selectedProductId) || null;
}

function renderProductImage(product, size = "card") {
  const imagePath = product.image || `/images/products/${product.id}.png`;

  return `
    <div class="products-image-frame products-image-frame-${size}">
      <img
        class="products-image products-image-${size}"
        src="${imagePath}"
        alt="${product.name}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
      />
      <span class="products-image-fallback"></span>
    </div>
  `;
}

function getRecommendedContainers(product) {
  if (product.container === "Bottle") {
    return ["Bottle", "Jerry Can"];
  }

  return [product.container];
}

function renderContainerBadge(containerName, compact = false) {
  const asset = containerAssets[containerName];
  if (!asset) return "";

  return `
    <span class="products-container-badge ${asset.className}" title="${containerName}">
      <img src="${asset.icon}" alt="${containerName}" />
      ${compact ? "" : `<span>${containerName}</span>`}
    </span>
  `;
}

function renderContainerBadges(product, compact = false) {
  const badges = getRecommendedContainers(product)
    .map((containerName) => renderContainerBadge(containerName, compact))
    .join("");

  if (compact) {
    return `<span class="products-container-icons">${badges}</span>`;
  }

  return badges;
}

function renderFeaturedProduct(product, isTopProduct = true) {
  if (!product) return "";

  return `
    <article class="products-featured-card ${isTopProduct ? "" : "is-selected-product"}">
      ${
        isTopProduct
          ? `
            <div class="products-top-ribbon" aria-hidden="true"></div>
            <div class="products-top-label">
              <img src="/images/vectors/top-product.png" alt="" />
              <span>Top Product</span>
            </div>
          `
          : `
            <button class="products-featured-close" type="button" data-featured-close aria-label="Close selected product">
              <img src="/images/vectors/cross.png" alt="" />
            </button>
          `
      }

      <div class="products-featured-media">
        ${renderProductImage(product, "featured")}
      </div>

      <div class="products-featured-body">
        <h3>${product.name}</h3>
        <p class="products-featured-description">
          ${product.description} ${product.description}
        </p>

        <div class="products-featured-meta">
          <div>
            <span>mulai dari</span>
            <strong>${product.shortPrice}<small>${product.unit}</small></strong>
          </div>
          <div class="products-featured-containers">
            ${renderContainerBadges(product, true)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderProductCard(product) {
  return `
    <button
      class="products-card"
      type="button"
      data-product-id="${product.id}"
      aria-label="Select ${product.name}"
    >
      <div class="products-card-media">
        ${renderProductImage(product)}
      </div>

      <div class="products-card-body">
        <h3>${product.name}</h3>
        <span>mulai dari</span>
        <div class="products-card-footer">
          <strong>${product.shortPrice}<small>${product.unit}</small></strong>
          <span class="products-card-container-pill">
            ${renderContainerBadges(product, true)}
          </span>
        </div>
      </div>
    </button>
  `;
}

function renderCategoryButtons() {
  return productCategories
    .map(
      (category) => `
        <button
          class="products-filter ${category === activeCategory ? "is-active" : ""}"
          type="button"
          data-category="${category}"
        >
          ${category}
        </button>
      `
    )
    .join("");
}

function renderPagination(totalPages) {
  if (totalPages <= 1) return "";

  const visiblePages = Array.from(
    { length: Math.min(TOTAL_PAGE_LABEL, totalPages) },
    (_, index) => index + 1
  );

  return `
    <div class="products-pagination" aria-label="Products pagination">
      <button
        class="products-page-arrow"
        type="button"
        data-page-action="previous"
        ${currentPage === 1 ? "disabled" : ""}
        aria-label="Previous products page"
      >
        <span aria-hidden="true"></span>
      </button>

      <div class="products-page-list">
        ${visiblePages
          .map(
            (pageNumber) => `
              <button
                class="products-page-number ${currentPage === pageNumber ? "is-current" : ""}"
                type="button"
                data-page-number="${pageNumber}"
                aria-label="Go to products page ${pageNumber}"
              >
                ${pageNumber}
              </button>
            `
          )
          .join("")}
      </div>

      <button
        class="products-page-arrow products-page-arrow-next"
        type="button"
        data-page-action="next"
        ${currentPage === totalPages ? "disabled" : ""}
        aria-label="Next products page"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>
  `;
}

function renderProductsView() {
  const section = document.getElementById("products");
  if (!section) return;

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );

  if (currentPage > totalPages) currentPage = totalPages;

  const pageStart = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(
    pageStart,
    pageStart + PRODUCTS_PER_PAGE
  );

  const selectedProduct = getSelectedProduct();
  const featuredProduct = selectedProduct || getTopProduct();
  const isShowingTopProduct = !selectedProduct;

  section.innerHTML = `
    <div class="products-shell">
      <div class="products-background" aria-hidden="true"></div>

      <div class="products-content">
        <h2 class="products-title">Products Available</h2>

        <div class="products-toolbar">
          <label class="products-search">
            <input
              id="products-search-input"
              type="search"
              placeholder="Find refill essentials..."
              value="${searchQuery}"
              aria-label="Search refill products"
            />
            <span class="products-search-icon" aria-hidden="true"></span>
          </label>

          <div class="products-filters" aria-label="Product categories">
            ${renderCategoryButtons()}
          </div>
        </div>

        <div class="products-layout">
          <div class="products-left-column">
            ${renderFeaturedProduct(featuredProduct, isShowingTopProduct)}

            <div class="products-legend" aria-label="Recommended container legend">
              <em>*Recommended Container</em>
              ${renderContainerBadge("Bottle")}
              ${renderContainerBadge("Jar")}
              ${renderContainerBadge("Jerry Can")}
            </div>
          </div>

          <div class="products-grid-area">
            ${
              visibleProducts.length
                ? `<div class="products-grid">${visibleProducts
                    .map(renderProductCard)
                    .join("")}</div>`
                : `<p class="products-empty">No products found.</p>`
            }

            ${renderPagination(totalPages)}
          </div>
        </div>
      </div>
    </div>
  `;

  bindProductsEvents();
}

function bindProductsEvents() {
  const searchInput = document.getElementById("products-search-input");

  searchInput?.addEventListener("input", (event) => {
    searchQuery = event.target.value;
    currentPage = 1;
    renderProductsView();

    const updatedSearchInput = document.getElementById("products-search-input");
    updatedSearchInput?.focus();
    updatedSearchInput?.setSelectionRange(searchQuery.length, searchQuery.length);
  });

  document.querySelectorAll(".products-filter").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      currentPage = 1;
      renderProductsView();
    });
  });

    document.querySelectorAll(".products-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectedProductId = card.dataset.productId;
      renderProductsView();
    });
  });

  document.querySelector("[data-featured-close]")?.addEventListener("click", () => {
    selectedProductId = null;
    renderProductsView();
  });

  document.querySelectorAll("[data-page-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.pageAction;
      const totalPages = Math.max(
        1,
        Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE)
      );

      if (action === "previous") currentPage = Math.max(1, currentPage - 1);
      if (action === "next") currentPage = Math.min(totalPages, currentPage + 1);

      renderProductsView();
    });
  });

  document.querySelectorAll("[data-page-number]").forEach((button) => {
    button.addEventListener("click", () => {
      currentPage = Number(button.dataset.pageNumber);
      renderProductsView();
    });
  });
}

export function initProducts() {
  const section = document.getElementById("products");
  if (!section) return;

  renderProductsView();
}