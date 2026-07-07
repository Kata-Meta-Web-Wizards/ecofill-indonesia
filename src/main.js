import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { initCalculator } from './sections/calculator/calculator.js'
import { initMap } from "./sections/map/map.js";

AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });

initCalculator()
initMap();