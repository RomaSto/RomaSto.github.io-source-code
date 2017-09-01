var verticalParallax = function(container_selector, layer_selector){
	var container_selector = container_selector || "#scene",
		layer_selector = layer_selector || ".layer",
		layers = $(container_selector).find(layer_selector);

	layers.css({"will-change":"transform"});

	$(window).scroll(function() {
		var scrollPos = $(this).scrollTop();

		layers.each(function(){
			var layer = $(this);

			if(layer.index() !=0 ) {
				layer.css({
					"transform" : "translate3d(0," + ( (scrollPos/(5 + 2*layer.index())) ) + "px,0)"
				});
			}
		});

		// $(container_selector).css({
		// 	"opacity" : 1-(scrollPos/720)
		// });
	});
};

module.exports = {
	createParallax : verticalParallax
}