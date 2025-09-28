window.addEventListener("load", function() {
  setTimeout(function() {
    // فرمت خروجی تاریخ شمسی
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });

function convertDateBadge(wrapper) {
  const dayEl = wrapper.querySelector(".day.ng-binding");
  const monthEl = wrapper.querySelector(".month.ng-binding");
  const yearEl = wrapper.querySelector(".year.ng-binding");

  if (dayEl && monthEl && yearEl && !wrapper.dataset.processed) {
    const day = dayEl.textContent.trim();
    const month = monthEl.textContent.trim();
    const year = yearEl.textContent.trim();

    const dateStr = `${day} ${month} ${year}`;
    const d = new Date(dateStr);

    if (!isNaN(d)) {
      const jDate = fmt.format(d);

      // فقط محتوا عوض می‌شود
      dayEl.textContent = "-";
      monthEl.textContent = jDate;
      yearEl.textContent = "-";

      // وسط‌چین کردن کل با CSS
      wrapper.style.textAlign = "center";

      wrapper.dataset.processed = "true";
      console.log("Converted badge:", jDate);
    }
  }
}

    // --- 3) تبدیل start-time قدیمی (اختیاری) ---
    function convertStartTime(el) {
      const text = el.textContent.trim();
      if (text && !el.dataset.processed) {
        const d = new Date(text);
        if (!isNaN(d)) {
          const jDate = fmt.format(d);
          el.textContent = jDate;
          el.dataset.processed = "true";
          console.log("Converted start-time:", jDate);
        }
      }
    }

    // MutationObserver برای مانیتور کردن تغییرات DOM
    const observer = new MutationObserver(() => {
      // date-badge
      document.querySelectorAll(".date-badge div").forEach(convertDateBadge);

      // tooltips
      document.querySelectorAll(".operation-time.ng-binding").forEach(convertTooltip);

      // start-time (در صورت وجود)
      document.querySelectorAll(".start-time span.ng-scope").forEach(convertStartTime);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

  }, 1000);
});
