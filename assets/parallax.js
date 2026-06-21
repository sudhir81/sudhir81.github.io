/* ============================================================ */
/*  SCROLL PARALLAX LAG                                         */
/*  Tiles/cards trail the page by ~0.25s as you scroll, then    */
/*  ease back into place — a subtle "arrives a beat later" feel.*/
/*  Implemented by continuously writing a --parallax custom     */
/*  property that the CSS `translate` (not `transform`) reads,  */
/*  so it never fights hover-lift / flip transforms.            */
/* ============================================================ */
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var SELECTOR = '.card, .tile, .stat-tile, .partner-card, .proj-card, .project-card';
  var EASE = 0.18;     // catch-up speed; ~0.25s to settle at 60fps
  var INTENSITY = 0.6; // how strongly tiles lag relative to the page
  var MAX_LAG = 26;    // px cap so fast scrolling/flicks stay subtle

  var nodes = [];
  function refresh() {
    nodes = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  }
  refresh();

  var smooth = window.scrollY || window.pageYOffset || 0;

  function tick() {
    var target = window.scrollY || window.pageYOffset || 0;
    smooth += (target - smooth) * EASE;

    var lag = (target - smooth) * INTENSITY;
    if (lag > MAX_LAG) lag = MAX_LAG;
    if (lag < -MAX_LAG) lag = -MAX_LAG;

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.setProperty('--parallax', lag.toFixed(2) + 'px');
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  window.addEventListener('load', refresh);
  window.addEventListener('resize', refresh);
})();
