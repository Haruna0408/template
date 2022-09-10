/* animation
-------------------------------*/
/* 実行
-----------------------------------------*/
//ページ読み込み時
$(window).on("load", function () {
  loadingAnimation();
  fadeUpAnimationMv();
  fadeUpAnimationUnderMV();
});

//スクロール時発火
$(window).on("load scroll", function () {
  fadeUpAnimation();
  animeGlobal();
});

/* 処理
-----------------------------------------*/
//ローディングアニメーション
function loadingAnimation() {
  const loader = document.getElementById("loading");
  loader.classList.add("p-loading__completed");
}

//コンテンツフェード
function fadeUpAnimation() {
  $(".js-fade").each(function () {
    let ele = $(this);
    let pos = ele.offset().top;
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).innerHeight();

    if (scroll > pos) {
      ele.addClass("js-fadeOn");
    } else if (scroll > pos - windowHeight) {
      setTimeout(function () {
        ele.addClass("js-fadeOn");
      }, 400);
    }
  });
}

//全体アニメーション処理
function animeGlobal() {
  $(".js-animation").each(function () {
    var element = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > element - windowHeight + 100) {
      $(this).addClass("js-scrollIn");
    }
  });
}

//MV用アニメーション
function fadeUpAnimationMv() {
  $(".js-animationMv").each(function () {
    var element = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > element - windowHeight + 100) {
      $(this).addClass("js-scrollIn");
    }
  });
}

//下層MV用アニメーション
function fadeUpAnimationUnderMV() {
  $(".js-animationUnderMv").addClass("js-fadeOn");
}

//clippathを使用したテキスト表示
function clipPathAnimation() {
  $(".js-animation.js-scrollIn").each(function () {
    var currentText = $(this).find(".js-animation__clipPath__text");
    if (currentText.hasClass("js-animation__trigger")) {
      currentText.addClass("js-animation__trigger_fadeOut");
    }
  });
}

//パララックス
// let parallaxBkImg = (function () {
//   $(window).on("load resize", function () {
//     $(window).on("load scroll", function () {
//       var $winTop = $(window).scrollTop();
//       var $target01 = $(".js-bg_scroll-01");
//       var $winWidth = $(window).width();
//       if ($winWidth < 1025) {
//         $target01.each(function (index) {
//           var $position = $winTop - $target01.eq(index).offset().top;
//           if ($winTop > $target01.eq(index).offset().top - 800) {
//             $target01.eq(index).css({
//               "background-position-y": $position * 0.2,
//             });
//           }
//         });
//       }
//     });
//   });
// })();
