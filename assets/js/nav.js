import { siteContent } from "../data/site-content.js";

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "index.html";
  return pathname.split("/").pop() || "index.html";
}

export function renderHeader() {
  const mount = document.querySelector("[data-site-header]");
  if (!mount) return;

  const navItems = Array.isArray(siteContent.nav) ? siteContent.nav : [];
  const linksHtml = navItems
    .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
    .join("");

  mount.innerHTML = `
    <div class="container site-header__inner">
      <a class="brand" href="index.html">${siteContent.site?.name || "Portfolio"}</a>
      <nav class="site-nav" aria-label="Primary" data-open="false">
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav-links" aria-haspopup="true" aria-label="Open navigation menu">
          Menu
        </button>
        <div class="nav-links-wrap" id="primary-nav-links-wrap">
          <ul class="nav-links" id="primary-nav-links">${linksHtml}</ul>
          <span class="nav-indicator" aria-hidden="true"></span>
        </div>
      </nav>
    </div>
  `;
}

export function setupMobileMenu() {
  const nav = document.querySelector(".site-nav");
  const toggle = nav?.querySelector(".nav-toggle");
  const links = nav?.querySelector(".nav-links");
  if (!nav || !toggle || !links) return;

  const mediaQuery = window.matchMedia("(max-width: 900px)");

  const closeMenu = ({ restoreFocus = false } = {}) => {
    nav.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    if (restoreFocus) toggle.focus();
  };

  const openMenu = () => {
    nav.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    if (isOpen) {
      closeMenu({ restoreFocus: true });
      return;
    }

    openMenu();
    const firstLink = links.querySelector("a");
    firstLink?.focus();
  });

  links.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!mediaQuery.matches) return;
    if (nav.getAttribute("data-open") !== "true") return;
    if (!nav.contains(event.target)) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (!mediaQuery.matches) return;
    if (nav.getAttribute("data-open") !== "true") return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu({ restoreFocus: true });
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = [...links.querySelectorAll("a")];
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  mediaQuery.addEventListener("change", (event) => {
    if (!event.matches) closeMenu();
  });
}

function moveIndicator(link) {
  const navLinks = document.querySelector(".nav-links");
  const indicator = document.querySelector(".nav-indicator");
  if (!navLinks || !indicator || !(link instanceof HTMLElement)) return;
  if (window.matchMedia("(max-width: 900px)").matches) return;

  const linkRect = link.getBoundingClientRect();
  const navRect = navLinks.getBoundingClientRect();
  const x = linkRect.left - navRect.left + navLinks.offsetLeft;
  indicator.style.setProperty("--indicator-x", `${x}px`);
  indicator.style.setProperty("--indicator-w", `${linkRect.width}px`);
  indicator.classList.add("is-visible");
}

export function highlightActiveNav() {
  const current = normalizePath(window.location.pathname);
  let activeLink = null;

  const links = document.querySelectorAll(".nav-links a");
  links.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href === current) {
      link.setAttribute("aria-current", "page");
      activeLink = link;
    }

    link.addEventListener("pointerenter", () => moveIndicator(link));
    link.addEventListener("focus", () => moveIndicator(link));
  });

  if (activeLink) {
    requestAnimationFrame(() => moveIndicator(activeLink));
  }

  const navLinks = document.querySelector(".nav-links");
  navLinks?.addEventListener("pointerleave", () => {
    if (activeLink) moveIndicator(activeLink);
  });

  window.addEventListener("resize", () => {
    if (activeLink) moveIndicator(activeLink);
  });

  if (!activeLink && links.length) {
    const firstLink = links[0];
    if (firstLink instanceof HTMLElement) {
      requestAnimationFrame(() => moveIndicator(firstLink));
    }
  }
}
