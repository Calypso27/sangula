$(document).ready(function() {
    // Initialize Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.col-sm-6.col-lg-4',
      layoutMode: 'fitRows'
    });

    // Filter items on button click
    $('.filters_menu').on('click', 'li', function() {
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });

      // Toggle active class
      $('.filters_menu li').removeClass('active');
      $(this).addClass('active');
    });
  });