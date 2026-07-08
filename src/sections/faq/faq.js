import { faqItems } from '../../js/data/faq.js';
import './faq.css'; 

export function initFaq() {
  const faqSection = document.getElementById('faq');
  if (!faqSection) return;

  const faqItemsHtml = faqItems.map((faq, index) => `
    <div class="faq-item">
      <button class="faq-question">
        <span class="question-text">${faq.question}</span>
        <!-- Bungkus ikon dengan lingkaran -->
        <span class="faq-icon-circle">
          <svg class="plus-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </span>
      </button>
      <div class="faq-answer-wrapper">
        <div class="faq-answer">
          <p>${faq.answer}</p>
        </div>
      </div>
    </div>
  `).join('');

  faqSection.innerHTML = `
    <div class="faq-container" data-aos="fade-up">
      <div class="faq-header">
        <h2 class="faq-title">Frequently<br>Asked Questions</h2>
        <p class="faq-subtitle">Got questions about our refill stations? Find your answers below.</p>
      </div>
      
      <div class="faq-list">
        ${faqItemsHtml}
      </div>
    </div>
  `;

  const faqDomItems = faqSection.querySelectorAll('.faq-item');
  
  faqDomItems.forEach(item => {
    const button = item.querySelector('.faq-question');
    
    button.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });
}