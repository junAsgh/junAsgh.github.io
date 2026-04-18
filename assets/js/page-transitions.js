export function setupPageTransitions() {
  const page = document.querySelector("main");
  if (!page) return;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;
  page.style.opacity = "0";
  requestAnimationFrame(() => {
    page.style.transition = "opacity 180ms ease";
    page.style.opacity = "1";
  });
}
