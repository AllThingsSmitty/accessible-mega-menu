/*global jQuery */
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