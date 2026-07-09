import { initNavbar } from './sections/navbar/navbar.js'
import { initHero } from './sections/hero/hero.js'
import { initCalculator } from './sections/calculator/calculator.js'
import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

initNavbar()
initHero()
initCalculator()
AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });