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

    // $('.banners').slick({
    //     dots: false,
    //     infinite: true,
    //     autoplay: true,
    //     autoplaySpeed: 1000,
    //     speed: 500,
    //     fade: true,
    //     cssEase: 'linear',
    //     responsive: [{
    //         breakpoint: 757,
    //         settings: {
    //             dots: true,
    //             draggable: true
    //         }
    //     }]
    // });

    $('.products__wrapper').slick({
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 500,
        draggable: true,
        slidesToShow: 4,
        responsive: [{
            breakpoint: 757,
            settings: {
                arrows: true,     
                slidesToShow: 2,
            }
        }]
    });
   

    var slider = function(element) {

        var autoPlayTime = 3000;
        var bannersNumbers = $(element + ' div').length - 1;
        var banner = -1;

        var moveBanner = function(move = 1) {      
            $(element + ' div').eq(banner).css('display', 'none');      
            banner += move;
            if (banner > bannersNumbers) {
                banner = 0;
            }
            if (banner <=  -1) {
                banner = bannersNumbers;
            }
            $(element + ' div').eq(banner).fadeToggle("slow");
        }
    
        var autoPlay = function() {
            intervalId = setInterval(moveBanner, autoPlayTime);
        }
    
        var autoPlayStop = function() {
            clearInterval(intervalId);
        }
    
        var initBanners = function () {
            $(element + ' div').fadeOut();  
            moveBanner();
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
    };

    slider(".banners");

    // slider(".products");
    var aktualRequest = function() {
        var html = "";
        for(var i=1; i <= 3; i++) {
            $.ajax({
                url: "./cms/wpis" + i +".html",
                dataType: "html",
                async: false,
            })
            .done(function(res) {
                html += res;
                if(i >= 3) {
                    // html.outerHTML;
                    // var data = { html: html };
                    localStorage.setItem('aktualności', JSON.stringify(html));
                }
            });
        };
    };


    if (localStorage.aktualności) {
        aktua = JSON.parse(localStorage.getItem('aktualności'));
        $('.aktualności').append(aktua);
    } else {
        aktualRequest();
        $('.aktualności').append(aktua);
        $('.aktualności').slick({
                arrows: true,
                dots: false,
                infinite: true,
                speed: 500,
                draggable: true,
                slidesToShow: 3,
                responsive: [{
                    breakpoint: 979,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 757,
                    settings: {    
                        slidesToShow: 1,
                    }
                }],
            });
    }

    $('.info>div .slick-slide').on('click', function() {
        $('body').append($('<div>', {class: 'modal'}));
        $(this).clone().appendTo(".modal");
        $('main').css('display', 'none');
        $('.modal').append('<button id="close"><i class="fas fa-times"></i></button>')
        document.querySelector('#close').addEventListener('click', function() {
            $('.modal').remove();
            $('main').css('display', 'block');
        })
    });

    var ajaxRequest = function(name) {
        $.ajax({
            url: "./tabs" + name +".html",
            dataType: "html",
            async: false,
        })
        .done(function(res) {
            $('.info').append('<div class="' + name + '"</div>')
            $('.aktualności').append(res);
            if(i >= 3) {
                $('.aktualności').slick({
                    arrows: true,
                    dots: false,
                    infinite: true,
                    speed: 500,
                    draggable: true,
                    slidesToShow: 3,
                    responsive: [{
                        breakpoint: 979,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 757,
                        settings: {    
                            slidesToShow: 1,
                        }
                    }],
                });
            }
        });

    }
});