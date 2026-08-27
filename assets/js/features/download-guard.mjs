import { createModalController } from "../ui/modal.mjs";

function environment() {
  const userAgent = navigator.userAgent || "";
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(userAgent);
  const isWindows = /Windows/i.test(userAgent);
  return { isMobile: isMobile, isWindows: isWindows };
}

export function initDownloadGuard() {
  const modal = document.querySelector("[data-download-guard]");
  if (!modal) return;

  const message = modal.querySelector("[data-download-guard-message]");
  const title = modal.querySelector("[data-download-guard-title]");
  const controller = createModalController(modal, "[data-close-download-guard]");

  document.querySelectorAll("[data-download-link]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      const current = environment();
      if (current.isWindows && !current.isMobile) return;

      event.preventDefault();
      if (current.isMobile) {
        title.textContent = "모바일 환경에서는 설치할 수 없습니다";
        message.textContent = "PageRivet은 현재 Windows x64 데스크톱용 포터블 패키지를 제공합니다.";
      } else {
        title.textContent = "지원 운영체제를 확인해 주세요";
        message.textContent = "이 패키지는 Windows x64용입니다. 계속하면 ZIP 파일을 내려받습니다.";
      }
      controller.open();
    });
  });
}
