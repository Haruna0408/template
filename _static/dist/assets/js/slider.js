$(window).on('load', function () {
    $('.p-slider__box').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        arrow: true,
        // prevArrow: '<img src="./assets/img/common/icon_arrow_prev.svg" class="slide-arrow prev-arrow">',
        // nextArrow: '<img src="./assets/img/common/icon_arrow.svg" class="slide-arrow next-arrow">',
        infinite: true,
        pauseOnHover: false,
        cssEase: 'linear',
        //centerMode: true,
        //centerPadding: '5%',
        slidesToShow: 3,
        //slidesToScroll: 1,
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1
                //centerPadding: '0'
            }
        }]
    });
});