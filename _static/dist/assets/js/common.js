/*　実行
----------------------------------------*/
$(function () {
  // "use strict";
  openHamburgerMenu();
  resizeSpNavAccordion();
  closeHamburgerMenu();
  closeSpNavi();
  // downContents();
  faqAccordion();
  smoothScroll();

  $(window).on("scroll", function () {
    //スクロール後に発火
    scrollAfterAddClass();
  });
});

//ブラウザヴバック処理iphone用
// window.onpageshow = function (event) {
//   if (event.persisted) {
//     window.location.reload();
//     $(".headerSec__nav").removeClass("active");
//   }
// };

/* 処理
----------------------------------------*/
//ヘッダーにclassを付与
function scrollAfterAddClass() {
  let scrollAfterAddBg = $(".js-headerTop");
  if (scrollAfterAddBg.height() < $(this).scrollTop()) {
    scrollAfterAddBg.addClass("js-bgWhite");
  } else {
    scrollAfterAddBg.removeClass("js-bgWhite");
  }
}

// ハンバーガーメニュー
function openHamburgerMenu() {
  $(".p-hamburger").on("click", function () {
    $(".p-nav__area").toggleClass("is-active");
    $(".p-hamburger_text").toggleClass("is-active");
    if ($(this).attr("aria-expanded") == "false") {
      $(this).attr("aria-expanded", true);
    } else {
      $(this).attr("aria-expanded", false);
    }
    $("body").toggleClass("js-bgBlack");
  });
}

//スマホナビアコーディオン
function resizeSpNavAccordion() {
  $(".js-spNavTrigger").on("click", function () {
    //クリック
    let windowWidth = $(window).width(); //変数に入れる
    //768以下の時
    if (windowWidth < 769) {
      //ブラウザ幅の判定
      /*クリックでコンテンツを開閉*/
      $(this).children(".p-nav__dropdown__list").stop().slideToggle();
      if ($(this).hasClass("js-open")) {
        $(this).removeClass("js-open");
      } else {
        $(this).addClass("js-open");
      }
    }
  });
}

// ハンバーガーメニュー閉じる処理
function closeHamburgerMenu() {
  var $triggerBtn = $(".js-open__trigger");
  $triggerBtn.on("click", function (event) {
    $(".p-hamburger").trigger("click");
  });
}

//スマホアコーディオン内のメニューをおしたら閉じる
function closeSpNavi() {
  $(".p-nav__item a").on("click", function () {
    $(".p-hamburger").trigger("click");
  });
}

//ヘッダー高さ分のコンテンツ下げる
function downContents() {
  var height = $(".headerSec").height();
  console.log(height);
  $(".js-underPage").css("paddingTop", height);
  $(".js-anchor").css("paddingTop", height);
}

//スムーズスクロール
function smoothScroll() {
  // $('a[href^="#"]').on('click', function () {
  // 	var speed = 500;
  // 	var href = $(this).attr("href");
  // 	var target = $(href == "#" || href == "" ? 'html' : href);
  // 	var position = target.offset().top;
  // 	$('body,html').animate({
  // 		scrollTop: position
  // 	}, speed, 'swing');
  // 	return false;
  // });

  var headerHeight = $(".l-header").outerHeight();
  var urlHash = location.hash;
  var speed = 600;
  //別ページからのスムーズスクロールにも対応
  if (urlHash) {
    $("body,html").stop().scrollTop(0);
    setTimeout(
      function () {
        var target = $(urlHash);
        var position = target.offset().top - headerHeight;
        $("body,html").stop().animate({ scrollTop: position });
      },
      speed,
      "swing"
    );
    return false;
  }
  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href);
    var position = target.offset().top - headerHeight;
    $("body,html").stop().animate({ scrollTop: position }, speed, "swing");
    return false;
  });
}

//matchHeight
function matchHeight() {
  // 文字高さ合わせる
  $(".js-hightLead").matchHeight();
  $(".js-hightName").matchHeight();
}

// ページトップ固定ボタン
function pageTopFixedButton() {
  // ボタン消す
  $("#hide_fadein").hide();

  // スクロールしたらボタン現れる
  // 上に戻ったらボタン消える
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#hide_fadein").fadeIn();
    } else {
      $("#hide_fadein").fadeOut();
    }
    return false;
  });
}

//アコーディオン
function faqAccordion() {
  // $(".js-faqAccordTrigger").on("click", function () {
  //   $(this).next(".p-faq__item").stop().slideToggle();
  //   return false;
  // });
  $(".js-faqAccordTrigger").on("click", function () {
    $(this).next(".c-accordion__body").slideToggle();
  });
}

//スマホとPCで画像入替え
function switchImage() {
  var wid = $(window).width();
  if (wid < 769) {
    $("img.switch").each(function () {
      $(this).attr("src", $(this).attr("src").replace("_PC", "_SP"));
    });
  }
}

//タブの切り替え
function switchTab() {
  let tabs = $(".tab"); // tabのクラスを全て取得し、変数tabsに配列で定義
  $(".tab").on("click", function () {
    // tabをクリックしたらイベント発火
    $(".active").removeClass("active"); // activeクラスを消す
    $(this).addClass("active"); // クリックした箇所にactiveクラスを追加
    const index = tabs.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    $(".content").removeClass("show").eq(index).addClass("show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
  });
}

//ポップアップ
function modalPopup() {
  $(".js-modal-open").each(function () {
    $(this).on("click", function () {
      var target = $(this).data("target");
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      $("html, body").addClass("active");
      return false;
    });
  });
  $(".js-modal-close").on("click", function () {
    $(".js-modal").fadeOut();
    $("html, body").removeClass("active");
    return false;
  });
}
