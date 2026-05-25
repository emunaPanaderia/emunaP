$(function(){

  	/*==== Mobile Menu  ====*/
    $('.mobile-menu nav').meanmenu({
      meanScreenWidth: "991",
      meanMenuContainer: ".mobile-menu",
      onePage: true,
    });
    
    /*==== Top quearys menu  ====*/
    var emsmenu = $(".em-quearys-menu i.t-quearys");
    var emscmenu = $(".em-quearys-menu i.t-close");
    var emsinner = $(".em-quearys-inner");
    emsmenu.on('click', function() {
      emsinner.addClass('em-s-open');
      $(this).addClass('em-s-hiddens');
      emscmenu.removeClass('em-s-hidden');
    });
    emscmenu.on('click', function() {
      emsinner.removeClass('em-s-open');
      $(this).addClass('em-s-hidden');
      emsmenu.removeClass('em-s-hidden');
    });
  
    /*==== popup mobile menu  ====*/
    
    var mrightma = $(".mobile_menu_o i.openclass");
    var mrightmi = $(".mobile_menu_o i.closeclass");
    var mrightmir = $(".mobile_menu_inner");
    var mobile_ov = $(".mobile_overlay");
    var mobile_onep = $(".mobile-menu .mean-nav ul.nav_scroll li");
    mrightma.on('click', function() {
      mrightmir.addClass('tx-s-open');
      mobile_ov.addClass('mactive');
    });
    mrightmi.on('click', function() {
      mrightmir.removeClass('tx-s-open');
      mobile_ov.removeClass('mactive');
    });
    mobile_onep.on('click', function() {
      mrightmir.removeClass('tx-s-open');
      mobile_ov.removeClass('mactive');
    }); 
    
    /*=============== sticky menu ================= */
    var header = $('.main_menu_area');
    $(window).on('scroll',function(){
        if($(window).scrollTop()>50){
            $('.main_menu_area').addClass('sticky');
        }
        else{
            header.removeClass('sticky');
        }
    });

    /*============= main nav icons popup  ===========*/
    $('.main_nav_icons i').click(function(){
      $('.nav_icon_popup').addClass('icon_popup');
    });
    $('.inner_nav_icon_popup i').click(function(){
      $('.nav_icon_popup').removeClass('icon_popup');
    });

    $('.main_nav_icon_right i').click(function(){
      $('.main_nav_icon_right_popup').addClass('site_popup');
    });
  
    $('.m_nav_rpi_close i').click(function(){
      $('.main_nav_icon_right_popup').removeClass('site_popup');
    });

     /* faq active js */
     $('.inner_faq_ac_item a').click(function(){
      $('.inner_faq_ac_item a').removeClass('active');
      $(this).addClass('active');
      });

    /*========== slider active js =============*/
    $('.slider_active').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 3000,
        dots: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              arrows: false,
            }
          },
          {
            breakpoint: 992,
            settings: {
              arrows: false,
            }
          },
          {
            breakpoint: 767,
            settings: {
              arrows: false,
            }
          },
        ]
    });

      /*========== home 2 slider active js =============*/
    $('.feature_slide').slick({
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      arrows: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });

     /*============= img active js =============*/
     $('.port_slide').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 1500,
      arrows: true,
      dots:false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            arrows: false,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });

    /*============= test active js =============*/
    $('.test_active').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 1500,
      arrows: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 992,
          settings: {
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });

    /*============= shop active js =============*/
    $('.shop_active').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 1000,
      arrows: true,
      dots: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });
    /*============= product active js =============*/
    $('.single_shop_slide').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1500,
      arrows: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
            arrows: false,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        },
      ]
    });

      /*============== counter js ============== */
      $('.counter').counterUp({
        delay: 20,
        time: 3000
      });

        /*=============== barfiller js ==============*/
        $('#bar1').barfiller({
          barColor: '#222222',
          duration: 1500
        });
        $('#bar2').barfiller({
          barColor: '#222222',
          duration: 1500
        });
        $('#bar3').barfiller({
          barColor: '#222222',
          duration: 1500
        });
      
            
      /*================ brand active js =============*/
      $('.brand_active').slick({
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        arrows: true,
        dots: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              arrows: false,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              arrows: false,
            }
          },
        ]
      });

      /* ========== veno box js ========= */
      new VenoBox({
        selector: '.s_video',
        spinner: 'rotating-plane'
      });


      /* faq active js */
      $('.inner_ac_items a').click(function(){
        $('.inner_ac_items a').removeClass('active');
        $(this).addClass('active');
      });

      /* single active js */
      $('.single_ac_items a').click(function(){
        $('.single_ac_items a').removeClass('active');
        $(this).addClass('active');
      });
      
      /* ====== page scroll js  =========*/
      $.scrollUp({
        scrollText: '<i class="icofont-thin-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

      /*====== wow js ======*/
      new WOW().init();

      /*========= direction hover ===========*/
      $(".snake").snakeify({
        speed: 500
      });
 
    /*========= isotope active ==========*/
    /* portfolio active */	
    function twrportfolio(){
      var portfolio = $(".grid");
      if( portfolio.length ){
          portfolio.imagesLoaded( function() {
              portfolio.isotope({
                  itemSelector: ".pitem",
                  layoutMode: 'masonry',
                  filter:"*",
                  animationOptions :{
                      duration:1000
                  },
                  hiddenStyle: {
                      opacity: 0,
                      transform: 'scale(.4)rotate(60deg)',
                  },
                  visibleStyle: {
                      opacity: 1,
                      transform: 'scale(1)rotate(0deg)',
                  },
                  stagger: 0,
                  transitionDuration: '0.9s',
                  masonry: {}
              });
              $(".portfolio_nav ul li").on('click',function(){
                  $(".portfolio_nav ul li").removeClass("current_menu_item");
                  $(this).addClass("current_menu_item");

                  var selector = $(this).attr("data-filter");
                  portfolio.isotope({
                      filter: selector,
                      animationOptions: {
                          animationDuration: 750,
                          easing: 'linear',
                          queue: false
                      }
                  });
                  return false;
              });

          });
      }
    }
    twrportfolio();
  });