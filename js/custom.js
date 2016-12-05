(function($) {
  Drupal.behaviors.preloader = {
    attach: function (context, settings) {
      window.onload=function(){
        $('.m-loading').remove();
      };
      setTimeout(function(){
        if ($('.m-loading').length) {
          $('.m-loading').remove();
        }
      }, 3000);
    }
  };
  Drupal.behaviors.fullpageJs = {
    attach: function (context, settings) {
      var fullpageSettings = {
        main: {
          sectionSelector: '.slide-section',
          navigation: false,
          sectionsColor : ['#d83454', '#f1f2f2', '#f1f2f2', '#f1f2f2', '#ffffff', '#f1f2f2', '#f1f2f2', '#f1f2f2'],
          verticalCentered: true,
          slidesNavigation: true,
          normalScrollElements: '.gmap-gmap, .slick-slider',
          onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);
            $('.next-slide-section a').removeClass();
            $('.next-slide-section a').addClass('active-section-' + nextIndex);
          },
          afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            if(loadedSection.hasClass('slide-section-last')){
                $('.next-slide-section a').removeClass();
                $('.next-slide-section a').addClass('last-section-is-active');
            }
          }
        }
      };
      $('.fullpage .inside', context).fullpage(fullpageSettings.main);
      // Custom Arrows Navigation
      this.arrowsInit('.slide-section', '.next-slide-section a', context);
    },
    createArrows: function (el, context) {
      var sectionsCount = $(el, context).length;
      $('.main-panel-wrapper', context).after('<div class="next-slide-section"><a href="#">NEXT</a></div>');
    },
    arrowsInit: function(el, arrow, context) {
      this.createArrows(el, context);
      $(arrow, context).click(function(e) {
        e.preventDefault();
        var currentId = $('.slide-section.active', context).index();
        currentId += 2;
        $.fn.fullpage.moveTo(currentId);
        return false;
      });
    }
  };
  Drupal.behaviors.carousel = {
    attach: function (context, settings) {
      var carouselSettings = {
        clients: {
          arrows: true,
          infinite: true,
          slidesToShow: 3,
          dots: false,
          responsive: [{
            breakpoint: 769,
            settings: {
              arrows: true,
              dots: false,
              vertical: true,
              slidesToShow: 3,
              verticalSwiping: true
            }
          },
          {
            breakpoint: 639,
            settings: {
              arrows: false,
              dots: true,
              slidesToShow: 1,
              vertical: false
            }
          }]
        },
      };
      $('.view-view-clients .view-content').slick(carouselSettings.clients);
    }
  };
  Drupal.behaviors.gmapSettings = {
    attach: function (context, settings) {
      this.changeElRegion('.node-map');
      this.setMapHeight('.gmap-gmap');
    },
    changeElRegion: function(el, context) {
      var relativeEl = $(el, context).closest('.fp-tableCell');
      $(el).appendTo(relativeEl);
      relativeEl.find('.row').remove();
    },
    getGmapHeight: function() {
      var windowHeight = $(window).innerHeight(),
          mapHeight    = windowHeight / 2;
      Math.round(mapHeight);
      return mapHeight;
    },
    setMapHeight: function(el, context) {
      var $thisObj  = this,
          mapHeight = $thisObj.getGmapHeight;
      $(el, context).height(mapHeight);
      $(window).resize(function(){
        mapHeight = $thisObj.getGmapHeight;
        $(el, context).css({
          'min-height': mapHeight,
          'max-height': mapHeight
        });
      });
    }
  };
})(jQuery);
