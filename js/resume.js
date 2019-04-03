(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

  // show tooltip
  $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();   
  });

  // Modal popup
  $('.project-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: false,
    showCloseBtn: false
  });
  // Modal dismiss
  $(document).on('click', '.project-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Open link in a new tab
  $("a.new-tab-open").on("click", function(event) {
    // Prevent default link behavior
    event.preventDefault();
    event.stopPropagation();

    // Get link
    var link = $(this).attr('href');

    // Simulate Asynchronous delay for .3 sec
    setTimeout(function(event) {
      window.open(link, '_blank');
    }, 300);
});

})(jQuery); // End of use strict
