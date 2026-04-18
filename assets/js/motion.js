const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function setReducedMotionFlag(prefersReduced) {
  document.documentElement.toggleAttribute("data-reduced-motion", prefersReduced);
}

function setupHeroEntrance(prefersReduced) {
  const hero = document.querySelector(".hero--cinematic");
  if (!hero || prefersReduced) return;

  const sequence = hero.querySelectorAll("[data-stagger]");
  sequence.forEach((item, index) => {
    item.style.setProperty("--hero-delay", `${120 + Math.min(index * 70, 520)}ms`);
    item.classList.add("hero-sequence-item");
  });

  requestAnimationFrame(() => {
    hero.classList.add("hero-sequence-ready");
  });
}

function setupSectionRevealStagger(prefersReduced) {
  const sections = document.querySelectorAll(".page-section, .hero--cinematic");
  sections.forEach((section) => {
    const staged = section.querySelectorAll("[data-stagger], .card, .panel, .spotlight-card, .detail-card, .contact-card, .project-framing__card");
    staged.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", prefersReduced ? "0ms" : `${Math.min(index * 40, 320)}ms`);
      item.classList.add("motion-reveal-item");
    });
  });
}

function setupScrollProgress(prefersReduced) {
  const main = document.querySelector("main");
  if (!main) return;

  const bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);

  if (prefersReduced) {
    bar.style.transform = "scaleX(1)";
    return;
  }

  const update = () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    bar.style.transform = `scaleX(${progress})`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupButtonMicroInteractions(prefersReduced) {
  if (prefersReduced) return;

  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      button.style.setProperty("--button-spot-x", `${x}%`);
      button.style.setProperty("--button-spot-y", `${y}%`);
    });
  });
}

function setupCardParallax(prefersReduced) {
  const cards = document.querySelectorAll(
    ".spotlight-card, .focus-editorial__item, .now-card, .contact-card, .project-framing__card, .detail-card, .project-panel__section"
  );

  cards.forEach((card) => {
    card.classList.add("motion-card");
    if (prefersReduced) return;

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-py * 3).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(px * 4).toFixed(2)}deg`);
      card.style.setProperty("--card-spot-x", `${((px + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--card-spot-y", `${((py + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

function setupAmbientMovement(prefersReduced) {
  if (prefersReduced) return;
  document.body.classList.add("ambient-motion");
}

function setupPageContinuity(prefersReduced) {
  if (prefersReduced) return;

  document.querySelectorAll('a[href$=".html"], .brand').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;

    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || link.target === "_blank") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (href.startsWith("http")) return;

      event.preventDefault();
      document.documentElement.classList.add("page-leaving");
      window.setTimeout(() => {
        window.location.href = href;
      }, 170);
    });
  });
}

export function setupMotion() {
  const media = window.matchMedia(REDUCED_QUERY);
  const prefersReduced = media.matches;

  setReducedMotionFlag(prefersReduced);
  setupHeroEntrance(prefersReduced);
  setupSectionRevealStagger(prefersReduced);
  setupScrollProgress(prefersReduced);
  setupButtonMicroInteractions(prefersReduced);
  setupCardParallax(prefersReduced);
  setupAmbientMovement(prefersReduced);
  setupPageContinuity(prefersReduced);
}
