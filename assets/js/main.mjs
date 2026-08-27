import { initI18n } from "./core/i18n.mjs";
import { initTheme } from "./ui/theme.mjs";
import { initMobileMenu } from "./ui/mobile-menu.mjs";
import { initBackToTop } from "./ui/back-to-top.mjs";
import { initDemoEditor } from "./features/demo-editor.mjs";
import { initGuideToc } from "./features/guide-toc.mjs";
import { initMcpCommands } from "./features/mcp-commands.mjs";
import { initUpdateLog } from "./features/update-log.mjs";
import { initDownloadGuard } from "./features/download-guard.mjs";
import { initReleaseToast } from "./features/release-toast.mjs";

function init() {
  initTheme();
  initI18n();
  initMobileMenu();
  initBackToTop();
  initDemoEditor();
  initGuideToc();
  initMcpCommands();
  initUpdateLog();
  initDownloadGuard();
  initReleaseToast();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
