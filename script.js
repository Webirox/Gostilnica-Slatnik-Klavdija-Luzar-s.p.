// Gostilnica Slatnik — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var burger = document.getElementById('burger');
  var navLinks = document.getElementById('navLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // menu category tabs (ponudba.html)
  var tabButtons = document.querySelectorAll('#menuTabs .tab-btn');
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        var panel = document.getElementById('panel-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // graceful fallback for photos that fail to load, so nothing looks broken
  var fallbackSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
    '<rect width="100%" height="100%" fill="#f1e8d8"/></svg>'
  );
  document.querySelectorAll('img.photo').forEach(function (img) {
    img.addEventListener('error', function handler() {
      img.removeEventListener('error', handler);
      img.src = fallbackSvg;
      img.classList.add('ph-fallback');
    });
  });
});
