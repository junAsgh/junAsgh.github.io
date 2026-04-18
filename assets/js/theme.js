import { siteContent } from "../data/site-content.js";

export function renderFooter() {
  const mount = document.querySelector("[data-site-footer]");
  if (!mount) return;

  const footerLinks = Array.isArray(siteContent.footerLinks) ? siteContent.footerLinks : [];
  const quickLinks = Array.isArray(siteContent.quickLinks) ? siteContent.quickLinks : [];
  const socialLinks = Array.isArray(siteContent.socialLinks) ? siteContent.socialLinks : [];

  const linksHtml = footerLinks
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join("");
  const quickLinksHtml = quickLinks
    .map((item) => `<li><a href="${item.href}"${item.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${item.label}</a></li>`)
    .join("");
  const socialHtml = socialLinks
    .map((item) => `<li><a href="${item.href}"${item.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${item.label}</a></li>`)
    .join("");

  mount.innerHTML = `
    <div class="container footer-shell">
      <div class="footer-shell__brand">
        <p class="footer-shell__name">${siteContent.site?.name || "Portfolio"}</p>
        <p class="footer-shell__title">${siteContent.site?.title || ""}</p>
      </div>
      <nav class="footer-shell__column" aria-label="Footer sitemap">
        <p class="footer-shell__heading">Sitemap</p>
        <ul class="footer-links">${linksHtml}</ul>
      </nav>
      <nav class="footer-shell__column" aria-label="Quick links">
        <p class="footer-shell__heading">Quick Links</p>
        <ul class="footer-links">${quickLinksHtml}</ul>
      </nav>
      <nav class="footer-shell__column" aria-label="Social and contact">
        <p class="footer-shell__heading">Connect</p>
        <ul class="footer-links">${socialHtml}</ul>
      </nav>
      <small class="footer-shell__legal">© <span data-year></span> ${siteContent.site?.name || "Portfolio"}</small>
    </div>
  `;

  const yearEl = mount.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
