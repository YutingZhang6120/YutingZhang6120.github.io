(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');

  function apply(theme, save) {
    root.setAttribute('data-theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#14161A' : '#FFFFFF');
    if (save) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
  }

  apply(root.getAttribute('data-theme') || 'light', false);

  btn.addEventListener('click', function () {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  });

  // Follow the system setting until the visitor picks one themselves.
  var mq = window.matchMedia && matchMedia('(prefers-color-scheme: dark)');
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function (e) {
      var saved;
      try { saved = localStorage.getItem('theme'); } catch (x) {}
      if (!saved) apply(e.matches ? 'dark' : 'light', false);
    });
  }
})();
