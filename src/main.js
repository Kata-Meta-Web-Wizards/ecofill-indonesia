import { initCalculator } from './sections/calculator/calculator.js'
import "./styles/main.css";
import AOS from "aos";
import "aos/dist/aos.css";

initCalculator()
AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });