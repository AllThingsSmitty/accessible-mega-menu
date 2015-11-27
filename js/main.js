if (jQuery) {
  (function ($) {
    'use strict';
    $(document).ready(function () {
      // initialize the megamenu
      $('.megamenu').accessibleMegaMenu();

      // hack so that the megamenu doesn't show flash of CSS animation after the page loads
      setTimeout(function () {
        $('body').removeClass('init');
      }, 500);
    });
  }(jQuery));
}

// Polyfill to fix "skip to content" link
// https://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
window.addEventListener('hashchange', function (event) {
  var element = document.getElementById(location.hash.substring(1));
  if (element) {
    if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
      element.tabIndex = -1;
    }
    element.focus();
  }
}, false);