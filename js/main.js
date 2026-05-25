(function () {
  const projectsList = document.getElementById("projects-list");
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = lightbox?.querySelector(".lightbox-content");
  const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function createMedia(item, { autoplay = false, controls = false } = {}) {
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (item.poster) video.poster = item.poster;
      if (autoplay) video.autoplay = true;
      if (controls) video.controls = true;
      return video;
    }
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title || "Project visualization";
    img.loading = "lazy";
    return img;
  }

  function openLightbox(item) {
    if (!lightbox || !lightboxContent || !lightboxCaption) return;
    lightboxContent.innerHTML = "";
    const media = createMedia(item, { controls: true, autoplay: true });
    lightboxContent.appendChild(media);
    lightboxCaption.textContent = [item.title, item.description].filter(Boolean).join(" — ");
    lightbox.showModal();
  }

  function bindMediaClick(el, item) {
    el.addEventListener("click", () => openLightbox(item));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  }

  function renderMediaPanel(project) {
    const panel = document.createElement("div");
    panel.className = "project-media project-media--empty";

    if (!project.media?.length) {
      if (project.link) {
        panel.classList.remove("project-media--empty");
        panel.innerHTML = `
          <a class="project-sim-launch" href="${escapeHtml(project.link)}">
            <span class="project-sim-icon" aria-hidden="true"></span>
            <span class="project-sim-title">Interactive simulation</span>
            <span class="project-sim-desc">RK4 physics · drag magnets &amp; bob</span>
          </a>
        `;
        return panel;
      }
      panel.innerHTML = `
        <div class="media-placeholder" aria-hidden="true">
          <span class="media-placeholder-icon"></span>
        </div>
        <p class="media-placeholder-text">Visualization coming soon</p>
      `;
      return panel;
    }

    panel.classList.remove("project-media--empty");

    const primary = project.media[0];
    const primaryBtn = document.createElement("button");
    primaryBtn.type = "button";
    primaryBtn.className = "media-primary";
    primaryBtn.setAttribute("aria-label", `Open ${primary.title || project.title}`);
    primaryBtn.appendChild(createMedia(primary, { autoplay: true }));
    bindMediaClick(primaryBtn, primary);
    panel.appendChild(primaryBtn);

    if (project.media.length > 1) {
      const thumbs = document.createElement("div");
      thumbs.className = "media-thumbs";
      project.media.slice(1).forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "media-thumb";
        btn.setAttribute("aria-label", `Open ${item.title || "media"}`);
        btn.appendChild(createMedia(item, { autoplay: false }));
        bindMediaClick(btn, item);
        thumbs.appendChild(btn);
      });
      panel.appendChild(thumbs);
    }

    return panel;
  }

  function renderTags(tags) {
    if (!tags?.length) return "";
    return `<ul class="project-tags">${tags
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join("")}</ul>`;
  }

  function renderProjects() {
    if (!projectsList || typeof PROJECTS === "undefined") return;

    projectsList.innerHTML = "";
    PROJECTS.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.id = project.id;
      card.setAttribute("role", "listitem");

      const indexStr = String(index + 1).padStart(2, "0");
      const linkHtml = project.link
        ? (() => {
            const external = /^https?:\/\//i.test(project.link);
            const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
            const label = project.link.includes("magnetic-pendulum")
              ? "Open simulation →"
              : "View project →";
            return `<a class="project-link" href="${escapeHtml(project.link)}"${attrs}>${label}</a>`;
          })()
        : "";

      const titleHtml = project.link
        ? `<h3><a class="project-title-link" href="${escapeHtml(project.link)}">${escapeHtml(project.title)}</a></h3>`
        : `<h3>${escapeHtml(project.title)}</h3>`;

      card.innerHTML = `
        <div class="project-card-inner">
          <div class="project-copy">
            <span class="project-index">${indexStr}</span>
            ${titleHtml}
            ${renderTags(project.tags)}
            <p>${escapeHtml(project.summary)}</p>
            ${linkHtml}
          </div>
        </div>
      `;

      card.querySelector(".project-card-inner").appendChild(renderMediaPanel(project));
      projectsList.appendChild(card);
    });
  }

  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener("close", () => {
    if (lightboxContent) lightboxContent.innerHTML = "";
  });

  renderProjects();
})();
