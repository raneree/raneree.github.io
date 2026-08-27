import { fetchProjectJson, currentLanguage, localized } from "../core/json.mjs";

let indexData = null;
let currentUpdate = null;

function renderVersionList(container, selectVersion) {
  container.innerHTML = "";
  indexData.versions.forEach(function (entry, index) {
    const button = document.createElement("button");
    button.className = "update-version-button";
    button.type = "button";
    button.textContent = "PageRivet " + entry.version;
    button.dataset.updateFile = entry.file;
    button.classList.toggle("is-active", index === 0);
    button.addEventListener("click", function () {
      container.querySelectorAll(".update-version-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      selectVersion(entry.file);
    });
    container.appendChild(button);
  });
}

function renderDetails(container, data) {
  const language = currentLanguage();
  const overview = localized(data.overview, language);
  container.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "section-heading";
  heading.innerHTML = '<span class="badge">' + (data.latest ? "Latest" : "Release") + '</span><h2>PageRivet ' + data.version + '</h2><p>' + overview + '</p>';

  const meta = document.createElement("p");
  meta.textContent = [data.date, data.platform, data.packageType].filter(Boolean).join(" · ");
  heading.appendChild(meta);
  container.appendChild(heading);

  data.groups.forEach(function (group, index) {
    const details = document.createElement("details");
    details.className = "update-group";
    details.open = typeof group.open === "boolean" ? group.open : index === 0;

    const items = Array.isArray(group.items)
      ? group.items
      : (group.items[language] || group.items.ko || group.items.en || []);

    const summary = document.createElement("summary");
    summary.textContent = localized(group.title, language) + " · " + items.length;

    const list = document.createElement("ul");
    items.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = localized(item, language);
      list.appendChild(li);
    });

    details.appendChild(summary);
    details.appendChild(list);
    container.appendChild(details);
  });
}

export function initUpdateLog() {
  const versionList = document.querySelector("[data-update-version-list]");
  const details = document.querySelector("[data-update-details]");
  if (!versionList || !details) return;

  async function selectVersion(file) {
    details.innerHTML = '<div class="data-status">업데이트 내용을 불러오는 중입니다.</div>';
    try {
      currentUpdate = await fetchProjectJson("assets/data/" + file);
      renderDetails(details, currentUpdate);
    } catch (error) {
      details.innerHTML = '<div class="data-status">업데이트 내용을 불러오지 못했습니다.</div>';
      console.error(error);
    }
  }

  fetchProjectJson("assets/data/updates-index.json").then(function (data) {
    if (!Array.isArray(data.versions) || !data.versions.length) throw new Error("Update index is empty.");
    indexData = data;
    renderVersionList(versionList, selectVersion);
    selectVersion(data.versions[0].file);
  }).catch(function (error) {
    versionList.innerHTML = '<div class="data-status">업데이트 목록을 불러오지 못했습니다.</div>';
    console.error(error);
  });

  document.addEventListener("pagerivet:languagechange", function () {
    if (currentUpdate) renderDetails(details, currentUpdate);
  });
}
