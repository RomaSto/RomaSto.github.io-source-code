// ==============================
// Check scrollbar width
// ==============================
var getScrollbarWidth = function (){
	var style = {"max-height":"100px", "overflow":"scroll", "position":"absolute"},
		wrapper = $("<div id='scroll_bar_check_A'></div>").css(style),
		inner = $("<div id='scroll_bar_check_B'></div>"),
		stretcher = $("<img src='/assets/img/force-scroll.png'/>"),
		scrollBarWidth = 0;

	wrapper.append(stretcher).append(inner);
	$("body").append(wrapper);

	scrollBarWidth = wrapper.width()-inner.width();
	wrapper.remove();

	return scrollBarWidth;
};



// ==============================
// Check IE version
// ==============================
var ieVersion = function () {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf("MSIE ");
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
	}

	var trident = ua.indexOf("Trident/");
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf("rv:");
		return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
	}

	var edge = ua.indexOf("Edge/");
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
	}

	// other browser
	return false;
};



// ==============================
// Page changer
// ==============================
var fadePageOn = function(elSelector){
	$(document).on("click", elSelector, function(e) {
		var href = $(this).attr("href");
		e.preventDefault();

		return $("#preloader")
			.fadeIn(300, function(){
				return document.location = href != null ? href : "/";
			});
	});
};

module.exports = {
	getScrollbarWidth : getScrollbarWidth,
	ieVersion : ieVersion,
	fadePageOn : fadePageOn
}