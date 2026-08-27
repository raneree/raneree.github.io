{% if page.show_release_toast %}
<aside class="release-toast release-update-toast" data-release-toast data-release-version="{{ site.data.download.version }}" hidden role="status" aria-live="polite" aria-labelledby="release-update-title">
  <button class="release-update-close" type="button" data-close-release-toast aria-label="업데이트 안내 닫기">×</button>
  <div class="release-update-copy"><span class="badge update-badge">New Update</span><strong id="release-update-title">PageRivet {{ site.data.download.version }} 업데이트</strong><p data-i18n="release.message">새로운 버전의 주요 변경점을 확인하세요.</p></div>
  <div class="release-update-actions"><a href="{{ '/update.html' | relative_url }}" data-dismiss-release-toast data-i18n="release.view">업데이트 내용 보기</a><a class="release-update-download" href="{{ site.data.download.url }}" data-download-link data-dismiss-release-toast data-i18n="release.download">다운로드</a></div>
</aside>
{% endif %}
