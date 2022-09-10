function checkName() {
  if ($("#name").val() == "") {
    $(".js-errorName").text("必須項目です。お名前を入力してください。");
    $(".js-errorName").css("display", "block");
    return 1;
  } else {
    $(".js-errorName").text("");
    $(".js-errorName").css("display", "none");
    // removeDisabled();
    return 0;
  }
}

function checkMail() {
  if ($("#mail").val() == "") {
    $(".js-errorMail").text("メールアドレスを入力してください。");
    $(".js-errorMail").css("display", "block");
    return 1;
  } else if (
    !$("#mail")
      .val()
      .match(
        /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/
      )
  ) {
    $(".js-errorMail").text("有効なメールアドレス形式で入力してください。");
    $(".js-errorMail").css("display", "block");
    return 1;
  } else {
    $(".js-errorMail").text("");
    $(".js-errorMail").css("display", "none");
    // removeDisabled();
    return 0;
  }
}

function checkMailConf() {
  if ($("#mailConf").val() == "") {
    $(".js-errorMailConf").text("確認用メールアドレスを入力してください。");
    $(".js-errorMailConf").css("display", "block");
    return 1;
  } else if (
    !$("#mailConf")
      .val()
      .match(
        /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/
      )
  ) {
    $(".js-errorMailConf").text("有効なメールアドレス形式で入力してください。");
    $(".js-errorMailConf").css("display", "block");
    return 1;
  } else {
    $(".js-errorMailConf").text("");
    $(".js-errorMailConf").css("display", "none");
    // removeDisabled();
    return 0;
  }
}

function checkTel() {
  if ($("#tel").val() == "") {
    $(".js-errorTel").text("必須項目です。電話番号を入力してください。");
    $(".js-errorTel").css("display", "block");
    return 1;
  } else {
    $(".js-errorTel").text("");
    $(".js-errorTel").css("display", "none");
    return 0;
  }
}

function checkContent() {
  var type_cnt = 0;
  $('input[name="contact_type"]').each(function () {
    if ($(this).prop("checked")) {
      type_cnt++;
    }
  });
  if (type_cnt == 0) {
    $(".js-errorContent").text("必須項目です。どちらかを選択してください。");
    $(".js-errorContent").css("display", "block");
    return 1;
  } else {
    $(".js-errorContent").text("");
    $(".js-errorContent").css("display", "none");
    return 0;
  }
}

function checkInquiry() {
  if ($("#inquiry").val() == "") {
    $(".js-errorInquiry").text("お問合せ内容を入力してください");
    $(".js-errorInquiry").css("display", "block");
    return 1;
  } else {
    $(".js-errorInquiry").text("");
    $(".js-errorInquiry").css("display", "none");
    // removeDisabled();
    return 0;
  }
}

// 全角英数→半角英数
function hankaku2Zenkaku(str) {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}
// 小数点以下切り捨て
function roundNum(number) {
  if ($.isNumeric(number)) {
    return Math.round(number);
  } else {
    return number;
  }
}
// 数字とハイフンのみにする
function leaveOnlyNumberHyphen(e) {
  // 数字とハイフン以外の不要な文字を削除
  var st = String.fromCharCode(e.which);
  if ("0123456789-".indexOf(st, 0) < 0) {
    return false;
  }
  return true;
}

// エスケープ処理
function escapeHTML(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quot;");
  str = str.replace(/'/g, "&#39;");
  return str;
}

$(window).on("load", function () {
  $(".js-errorName").css("display", "none");
  $(".js-errorMail").css("display", "none");
  $(".js-errorMailConf").css("display", "none");
  $(".js-errorTel").css("display", "none");
  $(".js-errorContent").css("display", "none");
  $(".js-errorInquiry").css("display", "none");
});

$(function () {
  //入力制御をする
  $("#tel").on("keypress", function (event) {
    return leaveOnlyNumberHyphen(event);
  });
  // keyUp時の操作
  $("#mail").keyup(function (event) {
    $("#mail").val(hankaku2Zenkaku($("#mail").val()));
  });
  $("#mailConf").keyup(function (event) {
    $("#mailConf").val(hankaku2Zenkaku($("#mailConf").val()));
  });

  //内容チェック
  $('input[name="contact_type"]:radio').change(function () {
    console.log("change check");
    checkContent();
  });
  $("#name").blur(function () {
    checkName();
  });
  $("#mail").blur(function () {
    checkMail();
  });
  $("#mailConf").blur(function () {
    checkMailConf();
  });
  $("#tel").blur(function () {
    checkTel();
  });
  $("#inquiry").blur(function () {
    checkInquiry();
  });

  //submit check
  $("input[type='submit']").on("click", function () {
    var err_cnt = 0,
      err_point = "";
    if (checkName()) {
      err_cnt += 1;
      err_point = "name";
    }
    if (checkMail()) {
      err_cnt += 1;
      err_point = "mail";
    }
    if (checkMailConf()) {
      err_cnt += 1;
      err_point = "mailConf";
    }
    if (checkTel()) {
      err_cnt += 1;
      err_point = "tel";
    }
    if (checkContent()) {
      err_cnt += 1;
      err_point = "contact_type";
    }
    if (checkInquiry()) {
      err_cnt += 1;
      err_point = "inquiry";
    }
    if (Number(err_cnt) > 0) {
      var adjust = -100;
      var speed = 400;
      var target = $("#" + err_point);
      var position = target.offset().top + adjust;
      $("body,html").animate(
        {
          scrollTop: position,
        },
        speed,
        "swing"
      );
      return false;
    } else {
      //XSS
      $("#name").val(escapeHTML($("#name").val()));
      $("#mail").val(escapeHTML($("#mail").val()));
      $("#mailConf").val(escapeHTML($("#mailConf").val()));
      $("#tel").val(escapeHTML($("#tel").val()));
      $("#contact_type").val(escapeHTML($("#contact_type").val()));
      $("#inquiry").val(escapeHTML($("#inquiry").val()));
      return true;
    }
  });
});
