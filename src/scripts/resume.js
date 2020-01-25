(function($) {
  "use strict"; // Start of use strict

  // startup animation
  document.addEventListener('DOMContentLoaded', () => {
    // preload animation
    anime.timeline({
      targets: ".preload",
      easing: "easeOutExpo"
    })
    .add({
      width: ["0vw", "100vw"],
      opacity: 1,
      duration: 1200
    })
    .add({
      delay: 2700,
      translateX: "100vw",
      duration: 1500,
      complete: function(anime) {
        document.querySelector('.preload').remove();
      }
    });

    // heading animation
    anime({
      targets: ".heading",
      delay: 600,
      opacity: 1,
      display: "block",
      duration: 2000,
      translateY: ["-300px", "0px"],
      easing: "easeOutExpo"
    });

    // loader animation
    anime({
      targets: ".loader",
      delay: 2000,
      duration: 2300,
      width: ["0", "100%"],
      easing: "easeOutExpo"
    });

    // loader-frame animation
    anime({
      targets: ".loader-frame",
      delay: 1500,
      duration: 1800,
      opacity: 1,
      easing: "easeOutExpo"
    });

    // main-content animation
    anime({
      targets: '.main-content',
      opacity: 1,
      duration: 1800,
      // translateX: "100vw",
      translateY: ["-300px", "0px"],
      easing: "easeOutExpo",
      delay: (el, i) => 5200 + 100 * i
    });
  });


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
    modal: false,
    showCloseBtn: false,
    removalDelay: 500, // delay removal by X to allow out-animation
    midClick: true, // allow opening popup on middle mouse click
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
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