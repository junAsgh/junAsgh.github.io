import { contactData } from "../data/contact-data.js";
import { observeRevealElements } from "./reveal.js";

const iconMap = {
  email: "✉",
  github: "⌘",
  linkedin: "in",
  cv: "CV"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getLinkAttributes(card) {
  if (!card.external) return "";
  return ' target="_blank" rel="noreferrer"';
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("input");
  input.value = value;
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function showToast(message) {
  const toast = document.querySelector("[data-copy-toast]");
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  toast.classList.remove("is-visible");
  requestAnimationFrame(() => toast.classList.add("is-visible"));

  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 1800);
}

function bindCopyButtons() {
  const copyButtons = document.querySelectorAll("[data-copy-email]");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy-email");
      if (!value) return;

      try {
        await copyText(value);
        showToast("Email copied to clipboard.");
      } catch {
        showToast("Unable to copy automatically. Please copy manually.");
      }
    });
  });
}

export function renderContactCards() {
  const mount = document.querySelector("[data-contact-cards]");
  if (!mount) return;

  const cards = Array.isArray(contactData.cards) ? contactData.cards : [];
  mount.innerHTML = cards
    .map(
      (card) => `
      <article class="contact-card" data-reveal>
        <div class="contact-card__header">
          <span class="contact-card__icon" aria-hidden="true">${iconMap[card.icon] || "•"}</span>
          <h3>${escapeHtml(card.title || "Contact")}</h3>
        </div>
        <p class="muted">${escapeHtml(card.description || "")}</p>
        <p class="contact-card__value">${escapeHtml(card.displayValue || "")}</p>
        <div class="contact-card__actions">
          <a class="button" href="${escapeHtml(card.href || "#")}"${getLinkAttributes(card)}>${escapeHtml(card.label || "Open")}</a>
          ${card.copyValue ? `<button type="button" class="button button--ghost" data-copy-email="${escapeHtml(card.copyValue)}">Copy email</button>` : ""}
        </div>
      </article>
    `
    )
    .join("");

  observeRevealElements(mount.querySelectorAll("[data-reveal]"));
  bindCopyButtons();
}

export function renderContactPage() {
  const intro = document.querySelector("[data-contact-intro]");
  if (intro) intro.textContent = contactData.intro || "Contact links are listed below.";

  renderContactCards();
}
