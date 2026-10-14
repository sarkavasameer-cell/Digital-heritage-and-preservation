(() => {
  "use strict";

  const places = window.HERITAGE;
  const categories = window.HERITAGE_CATEGORIES;
  if (!Array.isArray(places) || !Array.isArray(categories)) {
    throw new Error("Heritage data failed to load. Check heritage-data.js.");
  }

  const byId = (id) => document.getElementById(id);
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const safeExternalLink = (url, text, className) => {
    const link = make("a", className, text);
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };

  const menu = byId("menuBtn");
  const nav = byId("nav");
  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
    menu.textContent = nav.classList.contains("open") ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.textContent = "☰";
  }));

  const search = byId("search");
  const locationFilter = byId("loc");
  const categoryFilter = byId("cat");
  const photoFilter = byId("photoFilter");
  const sortSelect = byId("sort");
  const resultCount = byId("resultCount");
  const cardContainer = byId("cards");
  let emptyState = byId("empty");
  if (!emptyState) {
    emptyState = make("p", "empty", "No heritage entries match these filters.");
    emptyState.id = "empty";
    cardContainer.after(emptyState);
  }

  categoryFilter.replaceChildren(new Option("All categories", "all"));
  categories.forEach((category) => categoryFilter.add(new Option(category, category)));

  const dialog = make("dialog", "story-dialog");
  dialog.setAttribute("aria-labelledby", "story-title");
  const dialogContent = make("div", "story-dialog-content");
  const closeDialog = make("button", "dialog-close", "Close ×");
  closeDialog.type = "button";
  let lastFocusedTrigger = null;
  closeDialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    if (lastFocusedTrigger instanceof HTMLElement && lastFocusedTrigger.isConnected) {
      lastFocusedTrigger.focus();
    }
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialogContent.append(closeDialog);
  dialog.append(dialogContent);
  document.body.append(dialog);

  const addDetailSection = (container, heading, content) => {
    const section = make("section", "detail-section");
    section.append(make("h3", "", heading), make("p", "", content));
    container.append(section);
  };

  const openDetails = (place) => {
    lastFocusedTrigger = document.activeElement;
    dialogContent.replaceChildren(closeDialog);
    const heading = make("h2", "", place.name);
    heading.id = "story-title";
    heading.tabIndex = -1;
    dialogContent.append(heading);
    dialogContent.append(make("p", "detail-local-name", `${place.localName} · ${place.locality}`));
    const placeDetails = make("p", "detail-category", `${place.category} · ${place.location}`);
    dialogContent.append(placeDetails);
    if (place.imageUrl) {
      const photo = make("img", "detail-photo");
      photo.src = place.imageUrl;
      photo.alt = place.imageAlt;
      photo.addEventListener("error", () => {
        photo.replaceWith(make("p", "image-placeholder-copy", "Verified photograph not available yet."));
      }, { once: true });
      dialogContent.append(photo);
    }
    addDetailSection(dialogContent, "Historical background", place.historicalStory);
    addDetailSection(dialogContent, "Architectural and cultural significance", place.significance);
    addDetailSection(dialogContent, "People and traditions", place.associated);
    addDetailSection(
      dialogContent,
      "Legend / oral tradition",
      place.legend || "No location-specific legend or oral tradition has been verified for this entry."
    );

    const imageSection = make("section", "detail-section");
    imageSection.append(make("h3", "", "Photograph"));
    if (place.imageUrl) {
      imageSection.append(make("p", "", `${place.isHistoricalPhoto ? "Historical photograph" : "Modern photograph"}${place.photoDate ? ` · ${place.photoDate}` : ""}`));
      imageSection.append(safeExternalLink(place.imageSource, `Image source and attribution: ${place.imageCreator} · ${place.imageLicense}`, "detail-source"));
    } else {
      imageSection.append(make("p", "image-placeholder-copy", "Verified photograph not available yet."));
      imageSection.append(safeExternalLink(place.searchUrl, `Search for ${place.name}`, "detail-source"));
    }
    dialogContent.append(imageSection);

    const mapSection = make("section", "detail-section");
    mapSection.append(make("h3", "", "Location"));
    if (Number.isFinite(place.latitude) && Number.isFinite(place.longitude) && place.coordinateSource) {
      mapSection.append(make("p", "", `Map pin coordinates: ${place.latitude}, ${place.longitude}. ${place.coordinateAttribution}.`));
    } else {
      mapSection.append(make("p", "", "A verified map pin is not available for this place yet."));
    }
    mapSection.append(safeExternalLink(place.mapUrl, `Open ${place.name} in Google Maps ↗`, "detail-source"));
    const showOnMap = make("button", "detail-map-button", "Focus interactive map");
    showOnMap.type = "button";
    showOnMap.disabled = !(Number.isFinite(place.latitude) && Number.isFinite(place.longitude));
    showOnMap.addEventListener("click", () => {
      dialog.close();
      byId("map").scrollIntoView({ behavior: "smooth" });
      focusMapPlace(place.id);
    });
    mapSection.append(showOnMap);
    dialogContent.append(mapSection);

    const references = make("section", "detail-section references");
    references.append(make("h3", "", "References"));
    const list = make("ul");
    place.references.forEach((reference) => {
      const item = make("li");
      item.append(safeExternalLink(reference.url, reference.label));
      list.append(item);
    });
    references.append(list);
    if (place.coordinateSource) {
      const coordinateItem = make("li");
      coordinateItem.append(safeExternalLink(place.coordinateSource, "Map coordinates: OpenStreetMap feature via Photon"));
      list.append(coordinateItem);
    }
    dialogContent.append(references);
    dialog.showModal();
    heading.focus();
  };

  const makePhotoPlaceholder = (place) => {
    const fallback = make("div", "photo photo-placeholder");
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", "Verified photograph not available yet");
    fallback.append(make("span", "placeholder-message", "Verified photograph not available yet"));
    fallback.append(safeExternalLink(place.searchUrl, "Search for this location ↗", "placeholder-search"));
    fallback.append(make("span", "location-tag", place.location.toUpperCase()));
    return fallback;
  };

  const createPlaceCard = (place, index) => {
    const card = make("article", "card");
    const photo = place.imageUrl ? make("a", "photo") : makePhotoPlaceholder(place);
    if (place.imageUrl) {
      photo.href = place.imageSource;
      photo.target = "_blank";
      photo.rel = "noopener noreferrer";
      const image = make("img");
      image.src = place.imageUrl;
      image.alt = place.imageAlt;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        card.dataset.photoStatus = "needed";
        photo.replaceWith(makePhotoPlaceholder(place));
        filterPlaces();
      }, { once: true });
      photo.append(image);
    }
    card.append(photo);

    const body = make("div", "cardbody");
    body.append(make("small", "", `${String(index + 1).padStart(2, "0")} / ${place.category.toUpperCase()}`));
    body.append(make("h3", "", place.name));
    body.append(make("p", "knname", place.localName));
    body.append(make("p", "card-description", place.description));
    const footer = make("footer");
    footer.append(make("span", "", `📍 ${place.locality}`));
    const readMore = make("button", "read-more", "Read story ↗");
    readMore.type = "button";
    readMore.addEventListener("click", () => openDetails(place));
    footer.append(readMore);
    body.append(footer);

    if (place.imageUrl) {
      const attribution = safeExternalLink(
        place.imageSource,
        `${place.imageCreator} · ${place.imageLicense}`,
        "image-attribution"
      );
      body.append(attribution);
    }
    card.append(body);
    card.dataset.id = place.id;
    card.dataset.location = place.location;
    card.dataset.category = place.category;
    card.dataset.photoStatus = place.imageUrl ? "available" : "needed";
    card.dataset.search = [
      place.name, place.localName, place.location, place.locality, place.category,
      place.description, place.historicalStory, place.significance, place.associated,
      place.legend, place.photoDate, place.imageCreator, place.imageLicense,
        place.coordinateAttribution,
        ...place.references.flatMap((reference) => [reference.label, reference.url])
    ].join(" ").toLocaleLowerCase();
    return card;
  };

  cardContainer.replaceChildren(...places.map(createPlaceCard));
  const cards = Array.from(cardContainer.querySelectorAll(".card"));
  const mapLinks = document.querySelector("#map .maplinks");
  const mapRoot = byId("heritageMap");
  const mapStatus = byId("mapStatus");
  const mapFallback = byId("mapFallback");
  const mapMarkers = new Map();
  let heritageMap = null;

  if (window.L) {
    heritageMap = window.L.map(mapRoot, { scrollWheelZoom: false }).setView([13.0, 74.92], 10);
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>'
    }).addTo(heritageMap);
    places.forEach((place) => {
      if (!Number.isFinite(place.latitude) || !Number.isFinite(place.longitude) || !place.coordinateSource) return;
      const marker = window.L.marker([place.latitude, place.longitude], {
        icon: window.L.divIcon({
          className: "heritage-map-pin",
          html: '<span aria-hidden="true"></span>',
          iconSize: [28, 36],
          iconAnchor: [14, 34]
        }),
        title: `${place.name}, ${place.locality}`,
        alt: `${place.name} map pin`
      }).addTo(heritageMap);
      const popup = make("div", "map-popup");
      popup.append(make("b", "", place.name), make("p", "", place.locality));
      popup.append(safeExternalLink(place.mapUrl, "Open in Google Maps ↗"));
      const detailButton = make("button", "", "Read story");
      detailButton.type = "button";
      detailButton.addEventListener("click", () => openDetails(place));
      popup.append(detailButton);
      marker.bindPopup(popup);
      mapMarkers.set(place.id, marker);
    });
  } else {
    mapFallback.hidden = false;
  }

  const focusMapPlace = (id) => {
    const place = places.find((entry) => entry.id === id);
    if (!place) return;
    const marker = mapMarkers.get(id);
    if (marker && heritageMap) {
      heritageMap.setView(marker.getLatLng(), 16, { animate: true });
      marker.openPopup();
      mapStatus.textContent = `Map focused on ${place.name}.`;
      return;
    }
    mapStatus.textContent = `No verified map pin for ${place.name} yet. Use its Google Maps search link.`;
  };

  const updateMapLinks = () => {
    mapLinks.replaceChildren();
    const visibleCards = Array.from(cardContainer.querySelectorAll(".card")).filter((card) => !card.hidden);
    visibleCards.forEach((card, index) => {
      const place = places.find((item) => item.id === card.dataset.id);
      if (!place) return;
      const row = make("div", "map-place-row");
      const focus = make("button", "map-place-focus");
      focus.type = "button";
      focus.disabled = !mapMarkers.has(place.id);
      focus.append(make("span", "map-place-number", String(index + 1).padStart(2, "0")));
      const label = make("span", "map-place-label");
      label.append(make("b", "", place.name), make("small", "", place.locality));
      focus.append(label);
      focus.addEventListener("click", () => focusMapPlace(place.id));
      row.append(focus, safeExternalLink(place.mapUrl, "Google Maps ↗", "map-google-link"));
      if (!mapMarkers.has(place.id)) {
        row.append(make("span", "map-pin-note", "No verified pin"));
      }
      mapLinks.append(row);
    });
    const visibleIds = new Set(visibleCards.map((card) => card.dataset.id));
    places.forEach((place) => {
      const marker = mapMarkers.get(place.id);
      if (!marker || !heritageMap) return;
      if (visibleIds.has(place.id)) marker.addTo(heritageMap);
      else heritageMap.removeLayer(marker);
    });
    const visible = visibleCards;
    const mapped = visible.filter((card) => mapMarkers.has(card.dataset.id)).length;
    mapStatus.textContent = heritageMap
      ? `${mapped} of ${visible.length} visible entries have a verified pin.`
      : "The interactive map is unavailable; location search links are listed below.";
  };

  const filterPlaces = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const visible = [];
    cards.forEach((card) => {
      const place = places.find((entry) => entry.id === card.dataset.id);
      const hasImage = card.dataset.photoStatus === "available";
      const matches = card.dataset.search.includes(query)
        && (locationFilter.value === "all" || card.dataset.location === locationFilter.value)
        && (categoryFilter.value === "all" || card.dataset.category === categoryFilter.value)
        && (photoFilter.value === "all"
          || (photoFilter.value === "available" && hasImage)
          || (photoFilter.value === "needed" && !hasImage));
      card.hidden = !matches;
      if (matches) visible.push({ card, place });
    });
    const originalOrder = new Map(places.map((place, index) => [place.id, index]));
    if (sortSelect.value === "name-asc") {
      visible.sort((a, b) => a.place.name.localeCompare(b.place.name));
    } else if (sortSelect.value === "name-desc") {
      visible.sort((a, b) => b.place.name.localeCompare(a.place.name));
    } else if (sortSelect.value === "location") {
      visible.sort((a, b) => a.place.location.localeCompare(b.place.location)
        || a.place.name.localeCompare(b.place.name));
    } else {
      visible.sort((a, b) => originalOrder.get(a.place.id) - originalOrder.get(b.place.id));
    }
    visible.forEach(({ card }) => cardContainer.append(card));
    const visibleCount = visible.length;
    resultCount.textContent = `Showing ${visibleCount} of ${places.length} heritage entries.`;
    emptyState.hidden = visibleCount > 0;
    updateMapLinks();
  };
  search.addEventListener("input", filterPlaces);
  [locationFilter, categoryFilter, photoFilter, sortSelect].forEach((control) => control.addEventListener("change", filterPlaces));
  byId("clearFilters").addEventListener("click", () => {
    search.value = "";
    locationFilter.value = "all";
    categoryFilter.value = "all";
    photoFilter.value = "all";
    sortSelect.value = "featured";
    filterPlaces();
    if (heritageMap && mapMarkers.size) {
      const bounds = window.L.featureGroup(Array.from(mapMarkers.values())).getBounds();
      heritageMap.fitBounds(bounds.pad(0.18), { maxZoom: 12 });
    }
    search.focus();
  });
  filterPlaces();

  let kannada = false;
  byId("lang").addEventListener("click", (event) => {
    kannada = !kannada;
    document.documentElement.lang = kannada ? "kn" : "en";
    document.querySelectorAll("[data-en][data-kn]").forEach((element) => {
      element.innerHTML = kannada ? element.dataset.kn : element.dataset.en;
    });
    event.currentTarget.textContent = kannada ? "English" : "ಕನ್ನಡ";
  });

  const gallery = document.querySelector("#gallery .gallerygrid");
  gallery.replaceChildren();
  places.filter((place) => place.imageUrl).forEach((place) => {
    const button = make("button");
    button.type = "button";
    button.dataset.caption = `${place.name}, ${place.location} · ${place.photoDate} · ${place.imageCreator} · ${place.imageLicense}`;
    const image = make("img");
    image.src = place.imageUrl;
    image.alt = place.imageAlt;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      const fallback = make("div", "gallery-fallback");
      fallback.append(make("p", "", "Verified photograph not available yet"));
      fallback.append(safeExternalLink(place.searchUrl, "Search for this location ↗"));
      button.replaceWith(fallback);
    }, { once: true });
    button.append(image, make("span", "", `${place.name} · ${place.location}`));
    button.addEventListener("click", () => {
      const lightbox = byId("lightbox");
      const bigImage = byId("bigImage");
      bigImage.src = image.src;
      bigImage.alt = image.alt;
      byId("caption").textContent = button.dataset.caption;
      lightbox.hidden = false;
    });
    gallery.append(button);
  });
  const archiveContainer = document.querySelector("#gallery .archive-records");
  if (!archiveContainer) {
    const records = make("div", "archive-records");
    gallery.after(records);
  }
  const archiveRecords = document.querySelector("#gallery .archive-records");
  archiveRecords.replaceChildren(make("h3", "", "Archival catalogue records"));
  window.HERITAGE_ARCHIVES.forEach((archive) => {
    const item = make("article", "archive-record");
    if (archive.imageUrl) {
      const archivePhoto = make("button", "archive-photo");
      archivePhoto.type = "button";
      archivePhoto.setAttribute("aria-label", `View archival photograph: ${archive.title}`);
      const image = make("img", "archive-thumb");
      image.src = archive.imageUrl;
      image.alt = archive.imageAlt;
      image.loading = "lazy";
      image.addEventListener("error", () => {
        const fallback = make("div", "archive-photo-fallback");
        fallback.append(make("p", "", "Verified archive photograph not available yet."));
        fallback.append(safeExternalLink(archive.url, "Open the archive record ↗"));
        archivePhoto.replaceWith(fallback);
      }, { once: true });
      archivePhoto.append(image);
      archivePhoto.addEventListener("click", () => {
        byId("bigImage").src = image.src;
        byId("bigImage").alt = image.alt;
        byId("caption").textContent = `${archive.title} · ${archive.photoDate} · ${archive.photographer} · ${archive.rights}`;
        byId("lightbox").hidden = false;
      });
      item.append(archivePhoto);
      if (archive.photographer) item.append(make("p", "", `Photographer: ${archive.photographer}`));
      if (archive.rights) item.append(make("p", "", `Rights: ${archive.rights}`));
    }
    item.append(make("h4", "", archive.title));
    item.append(make("p", "", `${archive.source} · ${archive.date}`));
    item.append(make("p", "", archive.note));
    item.append(safeExternalLink(archive.url, "Open catalogue record ↗"));
    archiveRecords.append(item);
  });
  const archiveNote = document.querySelector("#gallery > .note");
  if (archiveNote) {
    archiveNote.textContent = "Current photographs are identified and attributed. The circa 1866–1868 archive image is separately identified with its catalogue source, photographer, date, and rights statement.";
  }

  const oldStories = byId("old-stories");
  const market = places.find((place) => place.id === "ashwathapura-apmc-market");
  const marketFeature = oldStories.querySelector(".archive-feature");
  if (market && marketFeature) {
    marketFeature.replaceChildren();
    const text = make("div");
    text.append(make("p", "eyebrow", "—  LOCAL MARKET HISTORY"));
    text.append(make("h3", "", market.name));
    text.append(make("p", "", market.historicalStory));
    text.append(safeExternalLink(market.references[0].url, "Read the local history report ↗", "archive-link"));
    marketFeature.append(text);
  }

  const contributionForm = byId("form");
  const storyType = contributionForm.elements.type;
  storyType.replaceChildren(new Option("Choose a category", ""));
  categories.forEach((category) => storyType.add(new Option(category, category)));
  ["Family memory", "Photograph / archive", "Other"].forEach((item) => storyType.add(new Option(item, item)));

  const consentLabel = contributionForm.querySelector(".consent");
  const referenceLabel = make("label", "", "Reference or source URL");
  const referenceInput = make("input");
  referenceInput.type = "url";
  referenceInput.name = "reference";
  referenceInput.placeholder = "https://…";
  referenceLabel.append(referenceInput);
  const dateLabel = make("label", "", "Approximate story or photograph date");
  const dateInput = make("input");
  dateInput.name = "photoDate";
  dateInput.placeholder = "For example, circa 1970 (if known)";
  dateLabel.append(dateInput);
  const imageLabel = make("label", "", "Photograph to contribute (optional, max 1 MB)");
  const imageInput = make("input");
  imageInput.type = "file";
  imageInput.name = "photo";
  imageInput.accept = "image/jpeg,image/png,image/webp";
  imageLabel.append(imageInput);
  const rightsLabel = make("label", "consent", "I have permission to share this photograph.");
  const rightsInput = make("input");
  rightsInput.type = "checkbox";
  rightsInput.name = "photoPermission";
  rightsLabel.prepend(rightsInput);
  consentLabel.before(referenceLabel, dateLabel, imageLabel, rightsLabel);

  const KEY = "rootsStoriesDemo";
  const status = byId("status");
  const readContributions = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch (error) {
      console.error("Could not read saved local contributions.", error);
      throw new Error("Saved contributions could not be read from this browser.");
    }
  };
  const renderContributions = () => {
    const items = readContributions();
    byId("count").textContent = String(items.length);
    const box = byId("entries");
    box.replaceChildren();
    if (!items.length) {
      box.textContent = "No contributions stored in this browser yet.";
      return;
    }
    items.slice().reverse().forEach((item) => {
      const row = make("div", "adminentry");
      row.append(make("b", "", `${item.title} — ${item.type}`));
      row.append(make("p", "", `${item.name} · ${item.location}${item.specificPlace ? ` · ${item.specificPlace}` : ""} · ${item.date}`));
      row.append(make("p", "", item.story));
      if (item.specificPlace) row.append(make("p", "", `Specific place/community: ${item.specificPlace}`));
      if (item.reference) row.append(safeExternalLink(item.reference, "Contribution source ↗"));
      if (item.photoDate) row.append(make("p", "", `Approximate photo/story date: ${item.photoDate}`));
      if (item.photoCreator) row.append(make("p", "", `Photographer/contributor: ${item.photoCreator}`));
      if (item.photoFileName) row.append(make("p", "", `Original filename: ${item.photoFileName}`));
      if (item.photoPermissionConfirmed) row.append(make("p", "", "Photo-sharing permission confirmed by contributor."));
      if (item.photoData) {
        const image = make("img", "contribution-photo");
        image.src = item.photoData;
        image.alt = `Contributed image for ${item.title}`;
        row.append(image);
      }
      box.append(row);
    });
  };

  contributionForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = imageInput.files[0];
    if (file && file.size > 1024 * 1024) {
      status.textContent = "Please choose an image smaller than 1 MB.";
      return;
    }
    if (file && !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      status.textContent = "Please choose a JPEG, PNG, or WebP image.";
      return;
    }
    if (file && !rightsInput.checked) {
      status.textContent = "Please confirm you have permission to share the selected photograph.";
      rightsInput.focus();
      return;
    }
    try {
      const data = new FormData(contributionForm);
      let photoData = "";
      if (file) {
        photoData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", () => resolve(reader.result));
          reader.addEventListener("error", () => reject(new Error("The selected image could not be read.")));
          reader.readAsDataURL(file);
        });
      }
      const items = readContributions();
      items.push({
        name: data.get("name"),
        type: data.get("type"),
        location: data.get("location"),
        specificPlace: data.get("specificPlace"),
        title: data.get("title"),
        story: data.get("story"),
        reference: data.get("reference"),
        photoDate: data.get("photoDate"),
        photoCreator: data.get("photoCreator"),
        photoFileName: file ? file.name : "",
        photoPermissionConfirmed: Boolean(file && rightsInput.checked),
        photoData,
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem(KEY, JSON.stringify(items));
      contributionForm.reset();
      status.textContent = "Thank you. This demo contribution, including any selected photo, is saved only in this browser.";
      renderContributions();
    } catch (error) {
      console.error("Could not save the local contribution.", error);
      status.textContent = "The contribution could not be saved in this browser. Try a smaller image or clear some browser storage.";
    }
  });

  byId("clear").addEventListener("click", () => {
    if (!window.confirm("Delete all demo contributions saved in this browser?")) return;
    try {
      localStorage.removeItem(KEY);
      renderContributions();
      status.textContent = "";
    } catch (error) {
      console.error("Could not clear local contributions.", error);
      status.textContent = "Saved contributions could not be cleared from this browser.";
    }
  });
  try {
    renderContributions();
  } catch (error) {
    status.textContent = error.message;
  }

  const lightbox = byId("lightbox");
  const closeLightbox = () => {
    lightbox.hidden = true;
    byId("bigImage").removeAttribute("src");
  };
  byId("closeLight").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (dialog.open) {
      event.preventDefault();
      dialog.close();
      return;
    }
    closeLightbox();
  });
})();
