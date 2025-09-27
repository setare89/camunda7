window.addEventListener("load", function() {
  setTimeout(function() {

    function toJalali(text) {
      // بارگذاری فارسی
	  	  	
      // فرض می‌کنیم فرمت تاریخ ISO است، مثل: 2025-08-23T12:30:00
      const m = moment(text, "YYYY-MM-DDTHH:mm:ss");
      if (m.isValid()) return m.format("jYYYY/jMM/jDD HH:mm:ss");
      return text;
    }

    const observer = new MutationObserver((mutationsList, obs) => {
      document.querySelectorAll(".start-time span.ng-scope").forEach(el => {
        const text = el.textContent.trim();
        if (!el.dataset.processed) {
          const d = new Date(text); // Gregorian Date object
          //const fmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { dateStyle: 'long' });
          const fmt = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          });
          const jDate = fmt.format(d); // e.g., "۱۴۰۴/۶/۱"
          el.textContent = jDate;       // نمایش روی صفحه
          el.dataset.processed = "true";
          console.log("Converted:", jDate);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

  }, 1000);
});
