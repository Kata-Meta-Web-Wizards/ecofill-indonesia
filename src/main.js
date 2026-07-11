import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { initCalculator } from './sections/calculator/calculator.js'
import { initMap } from "./sections/map/map.js";
import { initChallenge } from "./sections/challenge/challenge.js";
import { initFaq } from "./sections/faq/faq.js";

AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });

initCalculator()
initMap();
initChallenge();
initFaq();
