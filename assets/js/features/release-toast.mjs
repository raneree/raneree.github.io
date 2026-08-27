import { readPreference, savePreference } from "../core/preferences.mjs";

export function initReleaseToast() {
  const toast = document.querySelector("[data-release-toast]");
  if (!toast) return;
  const version = toast.dataset.releaseVersion;
  const key = "release-" + version + "-dismissed";
  if (readPreference(key, null, window.sessionStorage) === "true") return;

  function close() {
    toast.classList.remove("is-visible");
    window.setTimeout(function () { toast.hidden = true; }, 220);
    savePreference(key, "true", window.sessionStorage);
  }

  window.setTimeout(function () {
    toast.hidden = false;
    window.requestAnimationFrame(function () { toast.classList.add("is-visible"); });
  }, 700);

  toast.querySelectorAll("[data-close-release-toast], [data-dismiss-release-toast]").forEach(function (element) {
    element.addEventListener("click", close);
  });
}
