import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./map.css";
import { stations, cities } from "../../js/data/stations.js";
import pinIcon from "../../assets/icons/pin.svg";

export function initMap() {
  const mapSection = document.getElementById('map');
  if (!mapSection) return;

  mapSection.innerHTML = `
    <div class="refill-wrapper" data-aos="fade-up">
      <aside class="refill-sidebar">
        <h2 class="refill-title">Nearby Refill Station</h2>
        
        <div class="refill-controls">
          <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="station-search" placeholder="Search stations...">
          </div>

          <div id="city-filter-container" class="city-pill-container">
            <button class="city-pill active" data-city="All">All Cities</button>
            ${cities.map(city => `<button class="city-pill" data-city="${city}">${city}</button>`).join('')}
          </div>
        </div>

        <div id="station-list" class="station-list"></div>
      </aside>
      
      <div id="leaflet-container" class="leaflet-container"></div>
    </div>
  `;

  const map = L.map('leaflet-container', { zoomControl: false }).setView([-6.3, 106.8], 11);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  const markerGroup = L.layerGroup().addTo(map);
  
  let activeStationId = null;
  let markersObj = {};
  let currentFilterCity = 'All';
  let currentSearchQuery = '';

  function renderUI() {
    const filteredStations = stations.filter(station => {
      const matchCity = currentFilterCity === 'All' || station.city === currentFilterCity;
      const matchSearch = station.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
      return matchCity && matchSearch;
    });

    renderList(filteredStations);
    renderMarkers(filteredStations);

    if (filteredStations.length > 0) {
      const bounds = L.latLngBounds(filteredStations.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
    }
  }

  function renderList(filteredStations) {
    const listContainer = document.getElementById('station-list');
    listContainer.innerHTML = '';

    filteredStations.forEach(station => {
      const isActive = activeStationId === station.id;
      const tagsHtml = station.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('');

      const card = document.createElement('div');
      card.className = `station-card ${isActive ? 'active' : ''}`;
      card.id = `card-${station.id}`;
      card.innerHTML = `
        <img src="${station.image}" alt="${station.name}" class="card-img">
        <div class="card-content">
          <h3 class="card-name">${station.name}</h3>
          <p class="card-address">${station.address}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        setActive(station.id);
        const marker = markersObj[station.id];
        if (marker) {
          marker.openPopup();
          map.flyTo([station.lat, station.lng], 15, { duration: 1.5 });
        }
      });

      listContainer.appendChild(card);
    });
  }

  function renderMarkers(filteredStations) {
    markerGroup.clearLayers();
    markersObj = {};

    filteredStations.forEach(station => {
      const customMapIcon = L.icon({
        iconUrl: pinIcon,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [5, -35]
      });

      const marker = L.marker([station.lat, station.lng], { icon: customMapIcon });

      const popupContent = `
        <div class="map-popup">
          <img src="${station.image}" alt="${station.name}">
          <div class="popup-text">
            <strong>${station.name}</strong>
            <span>${station.address}</span>
            <div class="popup-tags">
              ${station.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { closeButton: false });

      marker.on('click', () => {
        setActive(station.id);
        const card = document.getElementById(`card-${station.id}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });

      markerGroup.addLayer(marker);
      markersObj[station.id] = marker;
    });
  }

  function setActive(id) {
    activeStationId = id;
    document.querySelectorAll('.station-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`card-${id}`);
    if (activeCard) activeCard.classList.add('active');
  }

  const cityPills = document.querySelectorAll('.city-pill');
  
  cityPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      cityPills.forEach(p => p.classList.remove('active'));
      
      e.target.classList.add('active');
      
      currentFilterCity = e.target.getAttribute('data-city');
      activeStationId = null; 
      renderUI();
    });
  });

  document.getElementById('station-search').addEventListener('input', (e) => {
    currentSearchQuery = e.target.value;
    activeStationId = null;
    renderUI();
  });

  renderUI();
}