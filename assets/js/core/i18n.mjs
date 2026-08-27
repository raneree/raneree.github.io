import { readPreference, savePreference } from "./preferences.mjs";
import { TRANSLATIONS } from "./translations.mjs";

const SUPPORTED = ["ko", "en"];

function applyLanguage(language) {
  const nextLanguage = SUPPORTED.indexOf(language) >= 0 ? language : "ko";
  document.documentElement.lang = nextLanguage;

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const entry = TRANSLATIONS[element.dataset.i18n];
    if (entry && typeof entry[nextLanguage] === "string") {
      element.innerHTML = entry[nextLanguage];
    }
  });

  document.querySelectorAll("[data-language]").forEach(function (button) {
    const isActive = button.dataset.language === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  savePreference("language", nextLanguage);
  document.dispatchEvent(new CustomEvent("pagerivet:languagechange", { detail: { language: nextLanguage } }));
}

export function initI18n() {
  applyLanguage(readPreference("language", "ko"));
  document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.dataset.language);
    });
  });
}
