$(document).ready(function() {
    $('nav>ul>li').on('click', function() {
        var mobile = 757;
        if (parseInt($(window).width()) < mobile) {
            $('navli').removeClass('active');
            $(this).toggleClass('active');
        };
    });
   
    $('#mobileTrigger').click(function() {
        $(this).toggleClass('open');
        $('nav').toggleClass('active');
    });

    $('.slider').slick({
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        responsive: [{
            breakpoint: 757,
            settings: {
                dots: true,
                draggable: true
            }
        }]
    });

    var autoPlayTime = 3000;
    var bannersNumbers = $('.banners div').length - 1;
    var banner = 1;
    
    var moveBanner = function(move = 1) {
        
        $('.banners div').eq(banner).css('display', 'none');
        
        banner += move;
        if (banner > bannersNumbers) {
            banner = 0;
        }
        if (banner <=  -1) {
            banner = bannersNumbers;
        }
       
        $('.banners div').eq(banner).fadeToggle("slow");
   
    }
    var autoPlay = function() {
        setInterval(moveBanner, autoPlayTime);
    }
    var autoPlay = function() {
        intervalId = setInterval(moveBanner, autoPlayTime);
    }
    var autoPlayStop = function() {
        clearInterval(intervalId);
    }
    var initBanners = function () {
        $('.banners div').fadeOut();  
        autoPlay();
    };
    initBanners();
    $('#next').on('click', function() {
        autoPlayStop();
        moveBanner(1);
        autoPlay();
    });
    $('#prev').on('click', function() {
        autoPlayStop();
        moveBanner(-1);
        autoPlay();
    });
});