//loading animetion
window.onload = function () {
    const loader = document.getElementById('loading');
    loader.classList.add('p-loading__completed');
}

//animation
$(function () {
    $(window).scroll(function () {
        $('.js-animation').each(function () {
            var element = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > element - windowHeight + 100) {
                $(this).addClass('js-scrollIn');
            }
        });

        //clip-pathを使用したテキスト表示
        // $('.js-animation.js-scrollIn').each(function() {
        //     var currentText = $(this).find('.js-animation__clipPath__text');
        //     if (currentText.hasClass('js-animation__trigger')) {
        //         currentText.addClass('js-animation__trigger_fadeOut');
        //     }
        // });
    });
});