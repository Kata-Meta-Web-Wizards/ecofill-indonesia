import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { initHowItWorks } from "./sections/how-it-works/how-it-works.js";
import { initCalculator } from './sections/calculator/calculator.js'
import { initMap } from "./sections/map/map.js";
import { initProducts } from "./sections/products/products.js";
import { initChallenge } from "./sections/challenge/challenge.js";
import { initFaq } from "./sections/faq/faq.js";

AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });

initHowItWorks();
initCalculator()
initMap();
initProducts();
initChallenge();
initFaq();