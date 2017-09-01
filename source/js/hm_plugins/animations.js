// ==============================
// Scroll animation on waypoints
// ==============================
$.fn.animated = function(inEffect) {
	$(this).each(function() {
		var ths = $(this);
		ths.css({opacity:0})
			.addClass("animated")
			.waypoint(function(dir) {
				if (dir === "down") {
					ths.addClass(inEffect).css({opacity:1});
				}
			},
			{
				offset: "90%"
			});
	});
};

// ==============================
// Piecharts animation
// ==============================
$.fn.animatePies = function() {
	$(this).each(function(){
		var pie = $(this);
		pie.waypoint(function(dir) {
			if (dir === "down") {
				pie.css({strokeDashoffset:pie.data("percentage")});
			}
		},
			{
				offset: "90%"
			});
	});
}
