import { cvData } from "../data/cv-data.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fillTagList(selector, values, fallback) {
  const el = document.querySelector(selector);
  if (!el) return;

  const items = Array.isArray(values) && values.length ? values : [fallback];
  el.innerHTML = items.map((value) => `<li>${escapeHtml(value)}</li>`).join("");
}

function isExternalLink(href) {
  return typeof href === "string" && /^https?:/i.test(href);
}

export function renderCvPage() {
  const summary = document.querySelector("[data-cv-summary]");
  if (summary) summary.textContent = cvData.summary || "Profile summary unavailable.";

  fillTagList("[data-cv-tools]", cvData.tools, "Skills to be added.");

  const educationEl = document.querySelector("[data-cv-education]");
  if (educationEl) {
    const educationItems = Array.isArray(cvData.education) ? cvData.education : [];
    educationEl.innerHTML = educationItems
      .map(
        (item) => `
        <article class="cv-education-item stack">
          <div class="inline-meta">
            <span>${escapeHtml(item.start || "")}</span>
            <span>${escapeHtml(item.end || "")}</span>
          </div>
          <h3>${escapeHtml(item.program || "")}</h3>
          <p class="muted">${escapeHtml(item.institution || "")}</p>
          <p>${escapeHtml(item.notes || "")}</p>
        </article>
      `
      )
      .join("");
  }

  const projectsEl = document.querySelector("[data-cv-projects]");
  if (projectsEl) {
    const projects = Array.isArray(cvData.projects) ? cvData.projects : [];
    projectsEl.innerHTML = projects
      .map(
        (project) => `
        <article class="card stack cv-project-item">
          <h3>${escapeHtml(project.name || "")}</h3>
          <p class="muted">${escapeHtml(project.summary || "")}</p>
          <ul class="bullet-list cv-bullet-stack">${(project.highlights?.length ? project.highlights : []).map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
          <div class="cv-project-links">
            <a href="projects.html" aria-label="Open projects page">Projects page</a>
            <a href="${escapeHtml(project.repo || "#")}" target="_blank" rel="noreferrer">Repository</a>
          </div>
        </article>
      `
      )
      .join("");
  }

  const linksEl = document.querySelector("[data-cv-links]");
  if (linksEl) {
    const links = Array.isArray(cvData.links) ? cvData.links : [];
    linksEl.innerHTML = links
      .map((link) => {
        const href = escapeHtml(link.href || "#");
        const attrs = isExternalLink(link.href) ? ' target="_blank" rel="noreferrer"' : "";
        return `<li><span>${escapeHtml(link.label || "")}</span><a href="${href}"${attrs}>${escapeHtml(link.value || "")}</a></li>`;
      })
      .join("");
  }
}
