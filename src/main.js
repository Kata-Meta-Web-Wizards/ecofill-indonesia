import { initNavbar } from './sections/navbar/navbar.js'
import { initHero } from './sections/hero/hero.js'
import { initComposition } from './sections/composition/composition.js'
import { initJourney } from './sections/journey/journey.js'
import { initImpact } from './sections/impact/impact.js'
import { initCalculator } from './sections/calculator/calculator.js'
import { initMap } from './sections/map/map.js'
import { initChallenge } from './sections/challenge/challenge.js'
import { initFaq } from './sections/faq/faq.js'
import { initFooter } from './sections/footer/footer.js'
import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

initNavbar()
initHero()
initComposition()
initJourney()
initImpact()
initCalculator()
initMap()
initChallenge()
initFaq()
initFooter()

AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });