/*
-----------------------------
 - scripts.js
-----------------------------
*/
(function($) {
  /*　- スムーズスクロール -
  /*-----------------------------------*/
  $('a[href^="#"]').click(function () {
    var href = $(this).attr("href");
    var target = $(href);
    var position = target.offset().top;
    $('body,html').stop().animate({ scrollTop: position }, 500);
  });

  /* - ページトップボタン
  /* ---------------------------------*/
  function pagetopButton() {
    var $pagetop      = $('.p-pagetop');
    var positionValue = $(window).scrollTop();
    var showPosition  = 300;
    var easing        = 'swing';
    var speed         = 1200;
    var pagetopVisible;
    if (positionValue > showPosition) {
      $pagetop.fadeIn();
    }
    $(window).scroll(function() {
      positionValue = $(window).scrollTop();
      pagetopVisible = $pagetop.is(':visible');
      if (positionValue > showPosition) {
        if (!pagetopVisible) {
          $pagetop.fadeIn();
        }
      } else {
        if (pagetopVisible) {
          $pagetop.fadeOut();
        }
      }
    });
    $pagetop.on('click', function(event) {
      $('html,body').animate({scrollTop:0}, speed, easing);
      event.preventDefault;
    });
  }
  /* 実行
  /* ---------------------------------*/
  document.addEventListener('DOMContentLoaded', function() {
    //target=blankに noopener noreferrer を付与します
    $('a[target="_blank"]').attr('rel', 'noopener noreferrer');
    pagetopButton();
  });


  /* - ハンバーガーナビ
  /* ---------------------------------*/
  $('.p-hamburger').on('click', function () {
    $('.p-nav__area').toggleClass('is-active');
    $('.p-hamburger_text').toggleClass('is-active');
    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true);
    } else {
      $(this).attr('aria-expanded', false);
    }
  });

  /* - スマホメニュー閉じる処理 -ハンバーガーナビと連動-
  /* ---------------------------------------------------------*/
  var $triggerBtn = $('.js-open__trigger');
  $triggerBtn.on('click', function (event) {
    $('.p-hamburger').trigger('click');
  });

  /*　スマホ　アコーディオンメニュー
  /* ---------------------------------*/
  $(window).on('load resize', function () {
    var winW = $(window).width();
    var devW = 767;
    var $spDropdownMenu = $('.js-open__trigger');
    if (winW <= devW) {
      $spDropdownMenu.on('click', function () {
        if ($(this).next('.globalnav_dropdownmenu_sp').hasClass('is-active')) {
          $('.globalnav_dropdownmenu_sp').removeClass('is-active');
        } else {
          $('.globalnav_dropdownmenu_sp').addClass('is-active');
        }
        return false;
      });
    }
  });

/* - フローティングボタン
/* ---------------------------------*/
    var $pagetop = $('.p-floating__button');
    var positionValue = $(window).scrollTop();
    var showPosition = 300;
    var easing = 'swing';
    var speed = 1200;
    var pagetopVisible;
    if (positionValue > showPosition) {
      $pagetop.fadeIn();
    }
    $(window).scroll(function () {
      positionValue = $(window).scrollTop();
      pagetopVisible = $pagetop.is(':visible');
      if (positionValue > showPosition) {
        if (!pagetopVisible) {
          $pagetop.fadeIn();
        }
      } else {
        if (pagetopVisible) {
          $pagetop.fadeOut();
        }
      }
    });
    $pagetop.on('click', function (event) {
      $('html,body').animate({ scrollTop: 0 }, speed, easing);
      event.preventDefault;
    });


  /*　アコーディオン
  /* ---------------------------------*/
  $('.c-accordion__title.js-trigger').on('click', function(){
    $(this).toggleClass('is-active');
    $(this).next('.c-accordion__body').slideToggle().toggleClass('is-active');
  });
}(jQuery));