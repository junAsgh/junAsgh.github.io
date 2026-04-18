import { projectsData } from "../data/projects-data.js";

function safeText(value, fallback = "") {
  return value && String(value).trim() ? String(value).trim() : fallback;
}

function clampIndex(nextIndex, size) {
  return (nextIndex + size) % size;
}

function toStackList(project) {
  if (Array.isArray(project.caseStudy?.tools) && project.caseStudy.tools.length) {
    return project.caseStudy.tools.map((item) => safeText(item?.label, "Tool")).slice(0, 6);
  }

  if (Array.isArray(project.tags) && project.tags.length) {
    return project.tags.slice(0, 6).map((item) => safeText(item, "Tool"));
  }

  return ["Python", "SQL", "Machine Learning"];
}

function toButtons(project) {
  const buttons = Array.isArray(project.caseStudy?.ctaButtons) && project.caseStudy.ctaButtons.length
    ? project.caseStudy.ctaButtons
    : [{ label: "Contact", href: "contact.html" }];

  return buttons.slice(0, 3).map((button, index) => ({
    label: safeText(button.label, "Learn more"),
    href: safeText(button.href, "contact.html"),
    style: index === 0 ? "button" : "button button--ghost"
  }));
}

function toPipelineSteps(project) {
  const rawSteps = Array.isArray(project.caseStudy?.pipeline) ? project.caseStudy.pipeline : [];
  if (!rawSteps.length) return ["Ingestion", "Inference", "Storage", "Analytics", "Review"];

  return rawSteps
    .slice(0, 6)
    .map((step) => {
      const text = safeText(step, "Pipeline step");
      const [label] = text.split(":");
      return safeText(label, text);
    });
}

export function renderProjectsPage() {
  const root = document.querySelector("[data-project-deck]");
  if (!root) return;

  const featured = projectsData.slice(0, 3);
  if (!featured.length) return;

  let currentIndex = 0;
  let startX = 0;

  const ui = {
    visual: root.querySelector("[data-deck-visual]"),
    eyebrow: root.querySelector("[data-project-eyebrow]"),
    name: root.querySelector("[data-project-name]"),
    summary: root.querySelector("[data-project-summary]"),
    problem: root.querySelector("[data-project-problem]"),
    approach: root.querySelector("[data-project-approach]"),
    learning: root.querySelector("[data-project-learning]"),
    pipeline: root.querySelector("[data-project-pipeline]"),
    stack: root.querySelector("[data-project-stack]"),
    cta: root.querySelector("[data-project-cta]"),
    count: root.querySelector("[data-progress-count]"),
    bar: root.querySelector("[data-progress-bar]"),
    nav: root.querySelector("[data-project-nav]"),
    previous: root.querySelector("[data-prev]"),
    next: root.querySelector("[data-next]"),
    live: root.querySelector("[data-project-live]"),
    details: root.querySelector("[data-project-details]"),
    systemDirection: root.querySelector("[data-project-system-direction]"),
    deliveryFlow: root.querySelector("[data-project-delivery-flow]")
  };

  let navButtons = [];

  function syncNav(project) {
    navButtons.forEach((button, index) => {
      const selected = index === currentIndex;
      button.setAttribute("aria-current", selected ? "true" : "false");
      button.setAttribute(
        "aria-label",
        selected
          ? `Current project: ${safeText(project.name, "Project")}`
          : `Jump to ${safeText(featured[index]?.name, "project")}`
      );
    });
  }

  function paint(nextIndex, { announce = false } = {}) {
    currentIndex = clampIndex(nextIndex, featured.length);
    const project = featured[currentIndex];

    root.dataset.mood = safeText(project.mood, "diagnosis");
    root.dataset.transitioning = "true";
    ui.visual?.classList.remove("is-swapping");
    void ui.visual?.offsetWidth;
    ui.visual?.classList.add("is-swapping");

    ui.eyebrow.textContent = safeText(project.hero?.eyebrow, "Project");
    ui.name.textContent = safeText(project.name, "Project");
    ui.summary.textContent = safeText(project.summary, "Project summary");
    ui.problem.textContent = safeText(project.deepDive?.challenge, "Problem detail coming soon.");
    ui.approach.textContent = safeText(project.deepDive?.approach, "Approach detail coming soon.");
    ui.learning.textContent = safeText(project.caseStudy?.learned, "Learning detail coming soon.");
    ui.pipeline.innerHTML = toPipelineSteps(project)
      .map((step) => `<li>${step}</li>`)
      .join("");

    ui.systemDirection.textContent = safeText(project.process?.architecture, "System direction coming soon.");
    ui.deliveryFlow.textContent = safeText(project.process?.workflow, "Delivery flow coming soon.");

    ui.stack.innerHTML = toStackList(project)
      .map((item) => `<li>${item}</li>`)
      .join("");

    ui.cta.innerHTML = toButtons(project)
      .map((button) => `<a class="${button.style}" href="${button.href}">${button.label}</a>`)
      .join("");

    ui.count.textContent = `${currentIndex + 1} / ${featured.length}`;
    ui.bar.style.inlineSize = `${((currentIndex + 1) / featured.length) * 100}%`;

    ui.previous.setAttribute("aria-label", `Show previous project. Current project is ${safeText(project.name, "project")}`);
    ui.next.setAttribute("aria-label", `Show next project. Current project is ${safeText(project.name, "project")}`);

    syncNav(project);

    if (announce) {
      ui.live.textContent = `Project ${currentIndex + 1} of ${featured.length}: ${safeText(project.name, "Project")}`;
    }

    window.setTimeout(() => {
      root.dataset.transitioning = "false";
    }, 260);
  }

  function nextProject() {
    paint(currentIndex + 1, { announce: true });
  }

  function previousProject() {
    paint(currentIndex - 1, { announce: true });
  }

  ui.nav.innerHTML = featured
    .map((project, index) => (
      `<button type="button" class="projects-deck__dot" data-dot-index="${index}" aria-label="Jump to ${safeText(project.name, "project")}"></button>`
    ))
    .join("");

  navButtons = Array.from(ui.nav.querySelectorAll("[data-dot-index]"));

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.dotIndex);
      if (Number.isFinite(target)) paint(target, { announce: true });
    });
  });

  ui.next?.addEventListener("click", nextProject);
  ui.previous?.addEventListener("click", previousProject);

  root.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (!root.contains(document.activeElement)) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextProject();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previousProject();
    }

    if (event.key === "Home") {
      event.preventDefault();
      paint(0, { announce: true });
      ui.visual?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      paint(featured.length - 1, { announce: true });
      ui.visual?.focus();
    }
  });

  ui.visual?.addEventListener(
    "touchstart",
    (event) => {
      startX = event.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true }
  );

  ui.visual?.addEventListener(
    "touchend",
    (event) => {
      const endX = event.changedTouches[0]?.clientX ?? 0;
      const delta = endX - startX;
      if (Math.abs(delta) < 36) return;
      if (delta < 0) nextProject();
      if (delta > 0) previousProject();
    },
    { passive: true }
  );

  ui.details?.addEventListener("toggle", () => {
    if (ui.details.open) {
      ui.details.dataset.project = safeText(featured[currentIndex].slug, "project");
    }
  });

  paint(0);
}
