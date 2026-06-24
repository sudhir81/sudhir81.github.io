// Shared interactivity for every page: scroll-reveal + tap-to-flip.
// Mirrors the logic that originally lived only in index.html.

(function () {
  // Tap-to-flip for any 3D flip tiles (currently only the homepage's
  // technology-domain tiles use this, but it's harmless on pages with none).
  document.querySelectorAll('.tile').forEach(function (tile) {
    tile.addEventListener('click', function () {
      tile.classList.toggle('flipped');
    });
  });

  // Scroll-reveal: fade/slide in any .reveal element once it enters the
  // viewport, then stop watching it (one-shot reveal).
  var revealEls = document.querySelectorAll('.reveal');

  if (!revealEls.length) {
    return;
  }

  if (typeof IntersectionObserver === 'undefined') {
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
