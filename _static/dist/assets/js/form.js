//全角2バイトチェック(UTF-8的計算が必要な場合は、ここを編集)
function getByteLengthChar(chr) {
	var result = 0;
	if ((chr >= 0x00 && chr < 0x81) || (chr === 0xf8f0) || (chr >= 0xff61 && chr < 0xffa0) || (chr >= 0xf8f1 && chr < 0xf8f4)) {
		//半角文字の場合は1を加算
		result = 1;
	} else {
		//それ以外の文字の場合は2を加算
		result = 2;
	}
	return result;
};
//字数をカウント
function getByteLength(value) {
	var result = 0;
	var size = value.length;
	for (var i = 0; i < size; i++) {
		var chr = value.charCodeAt(i);
		result += getByteLengthChar(chr)
	}
	return result;
};

function checkName() {
	if ($('#name').val() == "") {
		$('.js-errorName').text("お名前が入力されていません。");
		return 1;
	} else {
		let count = getByteLength($('#name').val());
		if (count > 40) {
			$('.js-errorName').text("お名前は全角20文字、半角40文字以内で入力してください。");
			return 1;
		} else {
			$('.js-errorName').text("");
			return 0;
		}
	}
}

function checkEmail() {
	if ($('#email').val() == "") {
		$('.js-errorEmail').text("メールアドレスが入力されていません。");
		return 1;
	} else if (!$('#email').val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
		$('.js-errorEmail').text("有効なメールアドレス形式で入力してください。");
		return 1;
	} else {
		$('.js-errorEmail').text("");
		return 0;
	}
}

function checkEmailConf() {
	if ($('#email_conf').val() == "") {
		$('.js-errorEmailConf').text("確認用のメールアドレスが入力されていません。");
		return 1;
	} else if (!$('#email_conf').val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
		$('.js-errorEmailConf').text("有効なメールアドレス形式で入力してください。");
		return 1;
	} else {
		$('.js-errorEmailConf').text("");
		return 0;
	}
}

function checkTel() {
	if ($('#tel').val() == "") {
		$('.js-errorTel').text("電話番号が入力されていません。");
		return 1;
	} else if (!$('#tel').val().match(/^0\d{9,10}$/) && $('#tel').val() != "") {
		$('.js-errorTel').text("電話番号は0から始まる半角数字のみ、10桁または11桁で入力してください。");
		return 1;
	} else {
		$('.js-errorTel').text("");
		return 0;
	}
}

function checkMessage() {
	if ($('#message').val() == "") {
		$('.js-errorMessage').text("お問い合わせ内容が入力されていません。");
		return 1;
	}else {
		$('.js-errorMessage').text("");
		return 0;
	}
}

// 全角英数→半角英数
function hankaku2Zenkaku(str) {
	return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
		return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
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
// 数字のみにする
function leaveOnlyNumber(e) {
	// 数字以外の不要な文字を削除
	var st = String.fromCharCode(e.which);
	if ("0123456789".indexOf(st, 0) < 0) {
		return false;
	}
	return true;
}
// エスケープ処理
function escapeHTML(str) {
	str = str.replace(/&/g, '&amp;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/"/g, '&quot;');
	str = str.replace(/'/g, '&#39;');
	return str;
}
// フォームクリア
function resetForm() {
	var arr = this.serializeArray();
	if (!arr.length == 0) {
		$.each(arr, function () {
			if ($('#' + this.name).is(':checked')) {
				// for check box
				$('#' + this.name).prop('checked', false);
			} else if ($('input[name=' + this.name + ']:checked').is(':checked')) {
				// for radio box
				$('input[name=' + this.name + ']:checked').prop('checked', false);
			} else {
				$('#' + this.name).val("");
			}
		});
		return true;
	} else {
		return false;
	}
};

$(window).on('load', function(){
	//エラー表示エリアを非表示にする
	$('#error-text-top').css('display', 'none');
	//オートコンプリートを追加
	$('#name').attr('autocomplete', 'name');
	$('#tel').attr('autocomplete', 'tel-national');
	$('#email').attr('autocomplete', 'email');
	$('#email_conf').attr('autocomplete', 'email_conf');
	$('#message').attr('autocomplete', 'message');
	// $('.limit_area').css('display', 'none');
});

$(function () {
	//数字のみの入力制御をする
	$('#tel').on("keypress", function(event){
		return leaveOnlyNumber(event);
	});
	// keyUp時の操作
	$('#email').keyup(function(event){
		$('#email').val(hankaku2Zenkaku($('#email').val()));
	});
	//名前入力チェック
	$('#name').blur(function () {
		checkName();
	});
	//電話番号入力チェック
	$('#tel').blur(function () {
		checkTel();
	});
	//メールアドレス入力チェック
	$('#email').blur(function () {
		$('#email').val(hankaku2Zenkaku($('#email').val()));
		checkEmail();
	});
	//確認用メールアドレス入力チェック
	$('#email_conf').blur(function () {
		$('#email_conf').val(hankaku2Zenkaku($('#email_conf').val()));
		checkEmailConf();
	});
	//お問い合わせ内容入力チェック
	$('#message').blur(function () {
		checkMessage();
	});
	//お問い合わせ内容の入力文字数表示
	// $('#message').blur(function () {
	// 	let count = $(this).val().length;
	// 	// let count = getByteLength($(this).val());
	// 	let limit = 400 - count;
	// 	if ( limit <= 400 ){
	// 		$('.limit_area').css('display', 'none');
	// 		$('#limitlbl').text(limit);
	// 	}else{
	// 		$('.limit_area').css('display', 'block');
	// 		$('#limitlbl').text(limit);
	// 	}
	// 	checkMessage();
	// });
	// $('#message').blur(function () {
	// 	consol.log("message-keydown function start");
	// 	let count = $(this).val().length;
	// 	// let count = getByteLength($(this).val());
	// 	let limit = 400 - count;
	// 	if ( limit <= 400 ){
	// 		$('.limit_area').css('display', 'none');
	// 		$('#limitlbl').text(limit);
	// 	}else{
	// 		$('.limit_area').css('display', 'block');
	// 		$('#limitlbl').text(limit);
	// 	}
	// 	checkMessage();
	// });
	//送信時の必須項目入力チェック
	$('#confirm').on('click', function () {
		$('#name').val(escapeHTML($('#name').val()));
		$('#message').val(escapeHTML($('#message').val()));
		var err_cnt = 0;
		err_cnt += checkName();
		err_cnt += checkEmail();
		err_cnt += checkEmailConf();
		err_cnt += checkTel();
		err_cnt += checkMessage();

		if ( err_cnt > 0) {
			$('.js-errorTop').html("入力内容に不備がございます。<br> お手数ですが、メッセージの表示された項目をご確認の上、再度ご入力ください。");
			$('.js-errorTop').css('display', 'block');
			$('html,body').animate({
				scrollTop : $('.contactFormSec__error').offset().top
			}, 'fast');
			return false;
		 }
	});

	// スクロール
	$(function () {
		// #で始まるa要素をクリックした場合に処理
		$('a[href^="#"]').click(function () {
			// 移動先を0px調整する。0を30にすると30px下にずらすことができる。
			var adjust = 0;
			// スクロールの速度（ミリ秒）
			var speed = 400;
			// アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
			var href = $(this).attr("href");
			// 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
			var target = $(href == "#" || href == "" ? 'html' : href);
			// 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
			var position = target.offset().top + adjust;
			// スムーススクロール linear（等速） or swing（変速）
			$('body,html').animate({
				scrollTop: position
			}, speed, 'swing');
			return false;
		});
	});
});


//フォーム表示制御
//入力画面では確認項目完了項目を非表示
if($('.contactInputSec').length) {
	$('.contactFormSec__confirm').css('display', 'none');
	$('.contactFormSec__complete').css('display', 'none');
}
//確認画面では入力項目完了項目を非表示
if($('.contactConfirmSec').length) {
	$('.contactFormSec__complete').css('display', 'none');
}
//完了画面では入力項目確認項目を非表示
if($('.contactCompleteSec').length) {
	$('.contactFormSec__confirm').css('display', 'none');
}
