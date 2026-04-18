import { renderHeader, setupMobileMenu, highlightActiveNav } from "./nav.js";
import { renderFooter } from "./theme.js";
import { setupReveal } from "./reveal.js";
import { setupPageTransitions } from "./page-transitions.js";
import { setupMotion } from "./motion.js";

renderHeader();
renderFooter();
highlightActiveNav();
setupMobileMenu();
setupReveal();
setupPageTransitions();
setupMotion();
