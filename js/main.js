(function () {
  const gallery = document.getElementById("animation-gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxContent = lightbox?.querySelector(".lightbox-content");
  const lightboxCaption = lightbox?.querySelector(".lightbox-caption");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  function createMedia(item) {
    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "metadata";
      if (item.poster) video.poster = item.poster;
      return video;
    }
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.title || "Research animation";
    img.loading = "lazy";
    return img;
  }

  function openLightbox(item) {
    if (!lightbox || !lightboxContent || !lightboxCaption) return;
    lightboxContent.innerHTML = "";
    const media = createMedia(item);
    if (media.tagName === "VIDEO") {
      media.controls = true;
      media.autoplay = true;
    }
    lightboxContent.appendChild(media);
    lightboxCaption.textContent = [item.title, item.description].filter(Boolean).join(" — ");
    lightbox.showModal();
  }

  function renderGallery() {
    if (!gallery) return;

    if (!ANIMATIONS.length) {
      gallery.innerHTML =
        '<p class="gallery-empty">No animations yet. Add entries in <code>js/animations.js</code> and media in <code>assets/animations/</code>.</p>';
      return;
    }

    gallery.innerHTML = "";
    ANIMATIONS.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "gallery-card";
      card.setAttribute("role", "listitem");
      card.tabIndex = 0;

      const mediaWrap = document.createElement("div");
      mediaWrap.className = "gallery-media";
      const preview = createMedia(item);
      if (preview.tagName === "VIDEO") preview.autoplay = true;
      mediaWrap.appendChild(preview);

      const body = document.createElement("div");
      body.className = "gallery-body";
      body.innerHTML = `<h3>${escapeHtml(item.title || "Untitled")}</h3><p>${escapeHtml(item.description || "")}</p>`;

      card.appendChild(mediaWrap);
      card.appendChild(body);

      const open = () => openLightbox(item);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      gallery.appendChild(card);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  lightbox?.querySelector(".lightbox-close")?.addEventListener("click", () => lightbox.close());
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener("close", () => {
    if (lightboxContent) lightboxContent.innerHTML = "";
  });

  renderGallery();
})();
