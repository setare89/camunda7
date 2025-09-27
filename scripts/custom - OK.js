window.addEventListener("load", function() {
  setTimeout(function() {
    // فرمت خروجی تاریخ شمسی
    const fmt = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    // --- 1) date-badge ---
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
      }
    }

    // --- 2) tooltip ---
    function convertTooltip(el) {
      const tooltip = el.getAttribute("uib-tooltip");
      if (tooltip && !el.dataset.processedTooltip) {
        const d = new Date(tooltip);
        if (!isNaN(d)) {
          const jDate = fmt.format(d);
          el.setAttribute("uib-tooltip", jDate);
          el.dataset.processedTooltip = "true";
          console.log("Converted tooltip:", jDate);
        }
      }
    }

    // --- 3) start-time ---
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

    // --- 4) userTasks (created, due, follow-up) ---
    function convertUserTaskDates() {
      document.querySelectorAll("td.created.ng-binding, td.due.ng-binding, td.follow-up.ng-binding")
        .forEach(el => {
          const text = el.textContent.trim();
          if (text && !el.dataset.processed) {
            const d = new Date(text);
            if (!isNaN(d)) {
              const jDate = fmt.format(d);
              el.textContent = jDate;
              el.dataset.processed = "true";
              console.log("Converted userTask date:", jDate);
            }
          }
        });
    }

    // --- MutationObserver ---
    const observer = new MutationObserver(() => {
      // date-badge
      document.querySelectorAll(".date-badge div").forEach(convertDateBadge);

      // tooltip
      document.querySelectorAll(".operation-time.ng-binding").forEach(convertTooltip);

      // start-time
      document.querySelectorAll(".start-time span.ng-scope").forEach(convertStartTime);

      // userTask rows
      convertUserTaskDates();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

  }, 1000);
});
