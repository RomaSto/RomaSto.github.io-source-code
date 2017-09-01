// ==========================================
// Preloader with percentage by image count
// ==========================================
var preloader_stat = $("#preloader-svg__percentage"),
	hasImageProperties = ["background", "backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"],
	hasImageAttributes = ["srcset"],
	match_url = /url\(\s*(['"]?)(.*?)\1\s*\)/g,
	all_images = [],
	total = 0,
	count = 0;

var circle_o = $("#preloader-svg__img .bar__outer"),
	circle_c = $("#preloader-svg__img .bar__center"),
	circle_i = $("#preloader-svg__img .bar__inner"),
	length_o = Math.PI*(circle_o.attr("r") * 2),
	length_c = Math.PI*(circle_c.attr("r") * 2),
	length_i = Math.PI*(circle_i.attr("r") * 2);



module.exports = function preloader() {
	function img_loaded(){
		var percentage = Math.ceil( ++count / total * 100 );

		percentage = percentage > 100 ? 100 : percentage;

		// Draw offsets
		// 1st circle
		circle_o.css({strokeDashoffset: ((100-percentage)/100)*length_o });

		// when to start 2nd circle
		if(percentage > 50) {
			circle_c.css({strokeDashoffset: ((100-percentage)/100)*length_c });
		}

		// when to start 3rd circle
		if(percentage == 100) {
			circle_i.css({strokeDashoffset: ((100-percentage)/100)*length_i });
		}

		preloader_stat.html(percentage);

		if(count === total) return done_loading();
	}

	function done_loading(){
		$("#preloader").delay(700).fadeOut(700, function(){
			$("#preloader__progress").remove();

			if($(".flip-card").length){
				$(".flip-card").addClass("loaded");
			}
		});
	}

	function images_loop () {
		setTimeout(function () {
			var test_image = new Image();

			test_image.onload = img_loaded;
			test_image.onerror = img_loaded;

			// console.log("C: " + count, " T: " + total);

			if (count != total) {
				if (all_images[count].srcset) {
					test_image.srcset = all_images[count].srcset;
				}
				test_image.src = all_images[count].src;

				images_loop();
			}
		}, 10);
	}

	// Get all images
	$("*").each(function () {
		var element = $(this);

		if (element.is("img") && element.attr("src")) {
			all_images.push({
				src: element.attr("src"),
				element: element[0]
			});
		}

		$.each(hasImageProperties, function (i, property) {
			var propertyValue = element.css(property);
			var match;

			if (!propertyValue) {
				return true;
			}

			match = match_url.exec(propertyValue);
			
			if (match) {
				all_images.push({
					src: match[2],
					element: element[0]
				});
			}
		});

		$.each(hasImageAttributes, function (i, attribute) {
			var attributeValue = element.attr(attribute);

			if (!attributeValue) {
				return true;
			}

			all_images.push({
				src: element.attr("src"),
				srcset: element.attr("srcset"),
				element: element[0]
			});
		});
	});

	total = all_images.length;

	// Start preloader or exit
	if (total === 0) {
		done_loading();
	} else {
		preloader_stat.css({opacity: 1});
		images_loop();
	}

	// FOR version
	/*for(var i=0; i<total; i++){
		var test_image = new Image();


		test_image.onload = img_loaded;
		test_image.onerror = img_loaded;

		if (all_images[i].srcset) {
			test_image.srcset = all_images[i].srcset;
		}
		test_image.src = all_images[i].src;
	}*/
};