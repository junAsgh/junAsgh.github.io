let revealObserver;

function getRevealObserver() {
  if (revealObserver) return revealObserver;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  return revealObserver;
}

export function observeRevealElements(elements) {
  if (!elements || !elements.length) return;

  const observer = getRevealObserver();
  elements.forEach((element) => observer.observe(element));
}

export function setupReveal() {
  observeRevealElements(document.querySelectorAll("[data-reveal]"));
}
