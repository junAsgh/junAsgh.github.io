import { projectsData } from "../data/projects-data.js";

function safeText(value, fallback) {
  return value && String(value).trim() ? value : fallback;
}

function modulo(value, length) {
  return (value + length) % length;
}

export function setupProjectsSlider() {
  const root = document.querySelector("[data-project-slider]");
  if (!root) return;

  const featured = projectsData.slice(0, 3);
  if (!featured.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentIndex = 0;
  let touchStartX = 0;

  const panel = root.querySelector("[data-project-panel]");
  const progressCount = root.querySelector("[data-progress-count]");
  const progressBar = root.querySelector("[data-progress-bar]");
  const liveRegion = root.querySelector("[data-project-live]");
  const prevButton = root.querySelector("[data-prev]");
  const nextButton = root.querySelector("[data-next]");
  const projectNav = root.querySelector("[data-project-nav]");

  const ui = {
    eyebrow: root.querySelector("[data-project-eyebrow]"),
    name: root.querySelector("[data-project-name]"),
    summary: root.querySelector("[data-project-summary]"),
    description: root.querySelector("[data-project-description]"),
    note: root.querySelector("[data-project-note]"),
    metadata: document.querySelector("[data-project-metadata]"),
    challenge: document.querySelector("[data-deep-challenge]"),
    approach: document.querySelector("[data-deep-approach]"),
    result: document.querySelector("[data-deep-result]"),
    tags: document.querySelector("[data-project-tags]"),
    architecture: document.querySelector("[data-process-architecture]"),
    workflow: document.querySelector("[data-process-workflow]"),
    lessons: document.querySelector("[data-process-lessons]"),
    cta: document.querySelector("[data-project-cta]"),
    currentProject: document.querySelector("[data-current-project-name]"),
    framingCards: Array.from(document.querySelectorAll("[data-framing-card]")),
    panelProblem: root.querySelector("[data-panel-problem]"),
    panelApproach: root.querySelector("[data-panel-approach]"),
    panelWorkflow: root.querySelector("[data-panel-workflow]"),
    panelFeatures: root.querySelector("[data-panel-features]"),
    panelAnalytics: root.querySelector("[data-panel-analytics]"),
    panelHumanReview: root.querySelector("[data-panel-human-review]"),
    panelTools: root.querySelector("[data-panel-tools]"),
    panelLearned: root.querySelector("[data-panel-learned]"),
    panelFuture: root.querySelector("[data-panel-future]"),
    panelCtaButtons: root.querySelector("[data-panel-cta-buttons]")
  };

  let navButtons = [];

  function renderMetadata(metadata) {
    if (!ui.metadata) return;
    const entries = Array.isArray(metadata) && metadata.length ? metadata : [{ label: "TODO", value: "TODO: Add verified metadata." }];
    ui.metadata.innerHTML = entries
      .map((item) => `
        <div class="project-metadata__item">
          <dt>${safeText(item.label, "TODO")}</dt>
          <dd>${safeText(item.value, "TODO: Add verified metadata.")}</dd>
        </div>`)
      .join("");
  }

  function renderTags(tags) {
    if (!ui.tags) return;
    const items = Array.isArray(tags) && tags.length ? tags : ["TODO: add tags"];
    ui.tags.innerHTML = items.map((tag) => `<li>${safeText(tag, "TODO: tag")}</li>`).join("");
  }

  function renderList(list, fallback, toHtml) {
    const items = Array.isArray(list) && list.length ? list : [fallback];
    return items.map((item) => toHtml(item)).join("");
  }

  function renderPanelCaseStudy(caseStudy) {
    if (ui.panelProblem) ui.panelProblem.textContent = safeText(caseStudy?.problemFraming, "TODO: Add verified problem framing.");
    if (ui.panelApproach) ui.panelApproach.textContent = safeText(caseStudy?.systemApproach, "TODO: Add verified system approach.");

    if (ui.panelWorkflow) {
      ui.panelWorkflow.innerHTML = renderList(caseStudy?.pipeline, "TODO: Add verified pipeline stage.", (item) => `<li>${safeText(item, "TODO: Add verified pipeline stage.")}</li>`);
    }

    if (ui.panelFeatures) {
      ui.panelFeatures.innerHTML = renderList(caseStudy?.features, "TODO: Add verified feature.", (item) => `<li>${safeText(item, "TODO: Add verified feature.")}</li>`);
    }

    if (ui.panelTools) {
      ui.panelTools.innerHTML = renderList(caseStudy?.tools, { label: "TODO", value: "Add verified tooling." }, (item) => {
        const label = safeText(item?.label, "TODO");
        const value = safeText(item?.value, "Add verified tooling.");
        return `<li><span>${label}</span><strong>${value}</strong></li>`;
      });
    }

    if (ui.panelAnalytics) ui.panelAnalytics.textContent = safeText(caseStudy?.analyticsMonitoring, "TODO: Add verified analytics and monitoring notes.");
    if (ui.panelHumanReview) ui.panelHumanReview.textContent = safeText(caseStudy?.humanReviewLoop, "TODO: Add verified review loop details.");
    if (ui.panelLearned) ui.panelLearned.textContent = safeText(caseStudy?.learned, "TODO: Add verified learning notes.");
    if (ui.panelFuture) ui.panelFuture.textContent = safeText(caseStudy?.futureEvolution, "TODO: Add verified future direction notes.");

    if (ui.panelCtaButtons) {
      const buttons = Array.isArray(caseStudy?.ctaButtons) && caseStudy.ctaButtons.length
        ? caseStudy.ctaButtons
        : [{ label: "Contact", href: "contact.html" }];
      ui.panelCtaButtons.innerHTML = buttons
        .map((button, index) => {
          const label = safeText(button?.label, "Learn more");
          const href = safeText(button?.href, "contact.html");
          const styleClass = index === 0 ? "button" : "button button--ghost";
          return `<a class="${styleClass}" href="${href}">${label}</a>`;
        })
        .join("");
    }
  }

  function syncNavState(project) {
    navButtons.forEach((button, index) => {
      const isCurrent = index === currentIndex;
      button.setAttribute("aria-current", isCurrent ? "true" : "false");
      button.setAttribute("aria-label", isCurrent
        ? `Current project: ${safeText(project?.name, "project")}`
        : `Jump to project ${index + 1}: ${safeText(featured[index]?.name, "project")}`);
    });

    ui.framingCards.forEach((card, index) => {
      card.classList.toggle("is-active", index === currentIndex);
    });
  }

  function paint(nextIndex, { announce = false, direction = "next", shouldFocusPanel = false } = {}) {
    currentIndex = modulo(nextIndex, featured.length);
    const project = featured[currentIndex] || {};
    const hero = project.hero || {};
    const deepDive = project.deepDive || {};
    const process = project.process || {};

    if (panel) {
      panel.classList.remove("is-transitioning");
      void panel.offsetWidth;
      panel.classList.add("is-transitioning");
    }

    root.dataset.mood = safeText(project.mood, "diagnosis");
    if (ui.eyebrow) ui.eyebrow.textContent = safeText(hero.eyebrow, "TODO: Project category");
    if (ui.name) ui.name.textContent = safeText(project.name, "TODO: Add featured project");
    if (ui.summary) ui.summary.textContent = safeText(project.summary, "TODO: Add verified featured summary");
    if (ui.description) ui.description.textContent = safeText(hero.headline, safeText(project.description, "TODO: Add verified description"));
    if (ui.note) ui.note.textContent = safeText(hero.panelNote, "TODO: Add verified panel context.");
    if (ui.challenge) ui.challenge.textContent = safeText(deepDive.challenge, "TODO: Add verified challenge notes.");
    if (ui.approach) ui.approach.textContent = safeText(deepDive.approach, "TODO: Add verified approach notes.");
    if (ui.result) ui.result.textContent = safeText(deepDive.result, "TODO: Add verified result notes.");
    if (ui.architecture) ui.architecture.textContent = safeText(process.architecture, "TODO: Add verified architecture notes.");
    if (ui.workflow) ui.workflow.textContent = safeText(process.workflow, "TODO: Add verified process notes.");
    if (ui.lessons) ui.lessons.textContent = safeText(process.lessons, "TODO: Add verified lessons.");
    if (ui.cta) ui.cta.textContent = safeText(project.cta, "TODO: Add verified CTA for this project.");
    if (ui.currentProject) ui.currentProject.textContent = safeText(project.name, "Current case study");
    if (progressCount) progressCount.textContent = `${currentIndex + 1} / ${featured.length}`;
    if (progressBar) progressBar.style.inlineSize = `${((currentIndex + 1) / featured.length) * 100}%`;

    if (prevButton) prevButton.setAttribute("aria-label", `Show previous project (currently ${safeText(project.name, "project")})`);
    if (nextButton) nextButton.setAttribute("aria-label", `Show next project (currently ${safeText(project.name, "project")})`);

    renderMetadata(project.metadata);
    renderTags(project.tags);
    renderPanelCaseStudy(project.caseStudy);
    syncNavState(project);

    if (announce && liveRegion) {
      liveRegion.textContent = `Project ${currentIndex + 1} of ${featured.length}: ${safeText(project.name, "Untitled project")}`;
    }
  }

  function next(options = {}) {
    paint(currentIndex + 1, { announce: true, direction: "next", ...options });
  }

  function prev(options = {}) {
    paint(currentIndex - 1, { announce: true, direction: "prev", ...options });
  }

  if (projectNav) {
    projectNav.innerHTML = featured
      .map((project, index) => `<button type="button" class="projects-showcase__dot" data-project-dot data-dot-index="${index}" aria-label="Jump to project ${index + 1}: ${safeText(project.name, "project")}"></button>`)
      .join("");

    navButtons = Array.from(projectNav.querySelectorAll("[data-project-dot]"));
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.dotIndex);
        if (Number.isFinite(index)) {
          paint(index, { announce: true, direction: index < currentIndex ? "prev" : "next", shouldFocusPanel: true });
        }
      });
    });
  }

  ui.framingCards.forEach((card) => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.projectIndex);
      if (Number.isFinite(index)) {
        paint(index, { announce: true, direction: index < currentIndex ? "prev" : "next", shouldFocusPanel: true });
      }
    });
  });

  nextButton?.addEventListener("click", () => next({ shouldFocusPanel: true }));
  prevButton?.addEventListener("click", () => prev({ shouldFocusPanel: true }));

  root.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    if (!root.contains(document.activeElement)) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next({ shouldFocusPanel: true });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev({ shouldFocusPanel: true });
    }
  });

  root.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true }
  );

  root.addEventListener(
    "touchend",
    (event) => {
      const touchEndX = event.changedTouches[0]?.clientX ?? 0;
      const distance = touchEndX - touchStartX;
      if (Math.abs(distance) < 38) return;
      if (distance < 0) next();
      if (distance > 0) prev();
    },
    { passive: true }
  );

  paint(0);
}
