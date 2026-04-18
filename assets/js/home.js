import { homeData } from "../data/home-data.js";
import { projectsData } from "../data/projects-data.js";

function toFeatureTag(label = "") {
  return label.trim() || "Applied AI";
}

export function renderHomePage() {
  const hero = homeData.hero || {};

  const heroKicker = document.querySelector("[data-hero-kicker]");
  const heroName = document.querySelector("[data-hero-name]");
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroIntro = document.querySelector("[data-hero-intro]");

  if (heroKicker) heroKicker.textContent = hero.kicker || "Machine Learning and Analytics";
  if (heroName) heroName.textContent = hero.name || "Junaid Asghar";
  if (heroTitle) {
    heroTitle.textContent =
      hero.title || "ML, analytics, and applied AI systems for practical technical delivery.";
  }
  if (heroIntro) {
    heroIntro.textContent =
      hero.intro || "I build dependable workflows that connect model development, evaluation, and user-facing outputs.";
  }

  const recruiterMount = document.querySelector("[data-home-focus]");
  if (recruiterMount) {
    const items = (homeData.selectedFocus || []).slice(0, 4);
    recruiterMount.innerHTML = items
      .map(
        (item) => `
        <li class="recruiter-mode__item" data-stagger>
          <span class="recruiter-mode__tag">${toFeatureTag(item.label)}</span>
          <p>${item.title || "Applied AI systems"}</p>
        </li>
      `
      )
      .join("");
  }

  const spotlightMount = document.querySelector("[data-home-projects]");
  if (spotlightMount) {
    const spotlightProjects = (homeData.spotlightProjectNames || [])
      .map((name) => projectsData.find((project) => project.name === name))
      .filter(Boolean);

    spotlightMount.innerHTML = `
      <p class="featured-preview__lede">Key analytics and machine learning projects.</p>
      <ul class="featured-preview__list">
        ${spotlightProjects
          .map(
            (project) => `
            <li>
              <h3>${project.name}</h3>
            </li>
          `
          )
          .join("")}
      </ul>
    `;
  }

  const heroSection = document.querySelector(".hero--cinematic");
  if (heroSection && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroSection.addEventListener("pointermove", (event) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      heroSection.style.setProperty("--hero-spot-x", `${x}%`);
      heroSection.style.setProperty("--hero-spot-y", `${y}%`);
    });
  }
}
