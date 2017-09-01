(function($) {
	"use strict";
	var preloader = require("./preloader.js"),
		helpers = require("./helpers.js"),
		verticalParallax = require("./verticalParallax.js"),
		slider = require("./slider.js");

	// ==============================
	// App global parameters object
	// ==============================
	window.hm = {};

	window.hm.scrollBarWidth = helpers.getScrollbarWidth();
	window.hm.mobileSize = 480 - window.hm.scrollBarWidth;
	window.hm.tabletSize = 768 - window.hm.scrollBarWidth;
	window.hm.resizeLimit = 2000 - window.hm.scrollBarWidth;

	helpers.fadePageOn("a.preload-link");

	$("header .svg-heading, .talks .svg-heading, .talks .testimonial").animated("fadeInUp");
	$(".about-me__skills>div").animated("fadeInUp");
	$(".article, .portfolio-slider__navigation-container, .portfolio-slider__preview-container").animated("fadeIn");
	$(".portfolio-slider__projects-container").animated("fadeIn");

	$(".piechart .piechart__fill").animatePies();

	// ==============================
	// Parallax
	// ==============================
	if($("#scene.axis").length){
		$("#scene.axis").parallax({
			scalarX: 3,
			scalarY: 3,
			frictionX: 0.5,
			frictionY: 0.5
		});
	}

	if($("#scene.vertical").length){
		verticalParallax.createParallax("#scene.vertical", ".layer");
		// IE scroll jump fix
		if(helpers.ieVersion()) {
			$(".layer").css({transition:"transform .15s linear"});
			$("#scene.vertical").css({transition:"opacity .15s linear"});

			$("body").on("mousewheel", function () {
				event.preventDefault();

				var wheelDelta = event.wheelDelta,
					currentScrollPosition = window.pageYOffset;

				window.scrollTo(0, currentScrollPosition - wheelDelta);
			});
		}
	}

	// ==============================
	// Login card flip
	// ==============================
	$(".login-button").click(function() {
		$("body").addClass("card_flipped");
	});

	$("#unflip-card").click(function(e) {
		e.preventDefault();
		$("body").removeClass("card_flipped");
	});

	$("#log-me").click(function (e) {
		e.preventDefault();
		var login = $("#text").val();
		var password = $("#password").val();
		if(!login || !password){
			$("#popup1").fadeIn("slow", function () {

			});
		}
	});

	// ==============================
	// Contact form
	// ==============================
	if($("#contact").length){
		var c_form = $("#contact"),
			send_button = c_form.find("#form-submit"),
			clear_button = c_form.find("#form-clear");

		clear_button.on("click", function(e){
			e.preventDefault();
			c_form[0].reset();
		});

		send_button.on("click", function(e){
			e.preventDefault();
			// c_form[0].reset();
		});
	}

	// ==============================
	// Main menu
	// ==============================
	$("#menu-toggle").click(function(){
		$(this).add(".main-menu").toggleClass("active");
	});

	$(".main-menu__item").each(function(index) {
		$(this).css("transition-delay", 0.3+0.1*index + "s");
	});




	// ==============================
	// Buttons
	// ==============================
	$("button.go-down").click(function(){
		var go = $(this).data("link");
		$("html, body").stop().animate({
			scrollTop: $(go).offset().top
		}, 700, "swing");
	});

	$("button.go-up").click(function(){
		$("html, body").stop().animate({
			scrollTop: 0
		}, 700, "swing");
	});



	// ==============================
	// Slider
	// ==============================
	if($(".portfolio-slider").length){

		$(".portfolio-projects .project__title, .portfolio-projects .project__tech")
			.each(function() {
				slider.prepareTitles($(this), 700);
			});

		slider.createSlider(".portfolio-slider");
	}


	// ==============================
	// Blog scroll events
	// ==============================
	if($(".blog-navigation").length){
		$(".blog-navigation__toggle").click(function(){
			$(".blog-navigation").toggleClass("active");
		});

		var activeId,
			additionalOffset = 60,
			menu = $(".blog-navigation"),
			menuItems = menu.find("li a"),
			scrollItems = menuItems.map(function(){
				var item = $($(this).attr("href"));
				if (item.length) return item;
			});

		menuItems.click(function(e){
			var href = $(this).attr("href"),
				offsetTop = (href === "#") ? 0 : $(href).offset().top - additionalOffset;

			e.preventDefault();

			$("html, body").stop().animate({
				scrollTop: offsetTop
			}, 700, "swing");
		});

		$(window).scroll(function() {
			var fromTop = $(this).scrollTop(),
				blogNavOffset = $(".blog-navigation").offset().top,
				blogNavLimit = $(".footer__wrapper").offset().top - $(".blog-navigation__wrapper").outerHeight(),
				current = scrollItems.map(function(){
					if ($(this).offset().top < fromTop+144)
						return this;
				});

			current = current[current.length-1];
			var id = current && current.length ? current[0].id : "";

			if (activeId !== id) {
				activeId = id;
				menuItems.removeClass("active").filter("[href=#"+id+"]").addClass("active");
			}

			if(fromTop >= blogNavLimit && $(window).width() > window.hm.tabletSize) {
				$(".blog-navigation__wrapper").css({"position":"absolute", "top":blogNavLimit + "px"});
			} else if (fromTop >= blogNavOffset && $(window).width() > (768 - window.hm.scrollBarWidth)) {
				$(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
				$(".blog-navigation__wrapper").addClass("nav-fixed");
			} else {
				$(".blog-navigation__wrapper").css({"position":"relative"});
				$(".blog-navigation__wrapper").removeClass("nav-fixed");
			}

		});

		$(window).resize(function() {
			if($(window).width() <= window.hm.tabletSize){
				$(".blog-navigation__wrapper").removeClass("nav-fixed");
				$(".blog-navigation__wrapper").css({"position":"relative"});
			} else {
				if($("body").scrollTop() >= $(".blog").offset().top){
					$(".blog-navigation__wrapper").css({"position":"fixed", "top":0});
					$(".blog-navigation__wrapper").addClass("nav-fixed");
				}
			}
		});
	}



	// ==============================
	// Talks blur based on js
	// ==============================
	function set_bg(){
		var section = $(".talks"),
			form = section.find(".contact-form"),
			form_bg = form.find(".contact-form__bg"),
			bg_offset = section.offset().top - form_bg.offset().top;

		form_bg.css({
			"background-position" : "center " + bg_offset + "px"
		});
	}

	if($(".talks").length){
		$(window).on("load", function() {
			set_bg();
		});

		$(window).resize(function() {
			set_bg();

			// Upscale "testimonials" section background to fit its container
			if( $(window).width() > window.hm.resizeLimit){
				$(".talks, .contact-form__bg").css("background-size", $(window).width() + "px");
			}
		});
	}

	preloader();

	// ==============================
	// PopUP
	// ==============================
	$(document).ready(function(){
		$("#popup1").hide();
	});
	$("#form-submit").click(function(){
		var formfield_name = $("#formfield_name").val();
		var formfield_email = $("#formfield_email").val();
		var formfield_text = $("#formfield_text").val();

		if(!formfield_name || !formfield_email || !formfield_text){
			$("#popup1").fadeIn("slow", function () {

			});
		}
	});
	$(".popup-button").click(function(){
		$("#popup1").hide();
	});

})(jQuery);
