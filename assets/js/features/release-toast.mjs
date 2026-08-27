import { readPreference, removePreference, savePreference } from "../core/preferences.mjs";

const VISIBLE_DURATION = 7000;
const EXIT_DURATION = 220;

export function initReleaseToast() {
  const toast = document.querySelector("[data-release-toast]");
  if (!toast) return;

  const version = toast.dataset.releaseVersion;
  const expiresAt = Date.parse(toast.dataset.releaseExpiresAt || "");
  const sessionKey = "release-" + version + "-session-dismissed";
  const hiddenVersionKey = "release-" + version + "-hidden";
  const hideVersion = toast.querySelector("[data-release-hide-version]");

  if (Number.isFinite(expiresAt) && Date.now() > expiresAt) return;
  if (readPreference(hiddenVersionKey, "false") === "true") return;
  if (readPreference(sessionKey, "false", window.sessionStorage) === "true") return;

  let autoCloseTimer = null;
  let isClosed = false;

  function close() {
    if (isClosed) return;
    isClosed = true;

    if (autoCloseTimer !== null) {
      window.clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    toast.classList.remove("is-visible");
    window.setTimeout(function () { toast.hidden = true; }, EXIT_DURATION);
    savePreference(sessionKey, "true", window.sessionStorage);
  }

  if (hideVersion) {
    hideVersion.checked = readPreference(hiddenVersionKey, "false") === "true";
    hideVersion.addEventListener("change", function () {
      if (hideVersion.checked) {
        savePreference(hiddenVersionKey, "true");
      } else {
        removePreference(hiddenVersionKey);
      }
    });
  }

  window.setTimeout(function () {
    if (Number.isFinite(expiresAt) && Date.now() > expiresAt) return;
    toast.hidden = false;
    window.requestAnimationFrame(function () {
      toast.classList.add("is-visible");
      autoCloseTimer = window.setTimeout(close, VISIBLE_DURATION);
    });
  }, 700);

  toast.querySelectorAll("[data-close-release-toast], [data-dismiss-release-toast]").forEach(function (element) {
    element.addEventListener("click", close);
  });
}
