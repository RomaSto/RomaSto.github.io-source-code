var letter_class = "letter",
	word_class = "word",
	animation_time_default = 600;

var prepareTitles = function (title_container, animation_time){

	var letters = $.trim(title_container.text()),
		letters_amount = letters.length,
		animation_time = animation_time/1000 || animation_time_default/1000,
		delay_base = animation_time/letters_amount,
		new_title = "";

	// Remove original text
	title_container.html("");

	// Create new wrapped text
	for(var i = 0; i < letters_amount; i++){
		var letter_delay = (delay_base)*(i+1),
			css_delay = "style='animation-delay: " + letter_delay + "s'",
			text = "<span class='" + letter_class + "' " + css_delay + ">" + letters[i] + "</span>";

		if(i==0){
			text = "<span class='"+word_class+"'>" + text;
		}
		if(letters[i] == " " || letters[i] == "&nbsp;"){
			text = "</span>\n<span class='"+word_class+"'>";
		}
		if(i == letters.length-1) {
			text = text + "</span>";
		}

		new_title += text;
	}

	title_container.append(new_title);
};


var createSlider = function(slider_container){
	// console.time("Slider prepare");
	var slider_container = slider_container || ".portfolio-slider",
		slider = $(slider_container),
		previews = slider.find(".portfolio-preview"),
		projects_wrapper = slider.find(".portfolio-projects"),
		projects = projects_wrapper.find(".project"),
		control_buttons = slider.find(".portfolio-button");

	projects_wrapper.find(".active ." + letter_class).addClass("show");

	// console.timeEnd("Slider prepare");

	$(control_buttons).on("click", function(e){
		console.time("Slider click");
		e.preventDefault();

		var this_button = $(this),
			this_thumbnails = this_button.next().find(".portfolio-thumbnails__thumbnail"),
			this_active_thumb = this_thumbnails.filter(".active"),
			this_next_index = this_thumbnails.index(this_active_thumb);

		var other_button = this_button.parent().siblings().find(".portfolio-button"),
			other_thumbnails = other_button.next().find(".portfolio-thumbnails__thumbnail"),
			other_active_thumb = other_thumbnails.filter(".active"),
			other_next_index = other_thumbnails.index(other_active_thumb);

		var active_preview = previews.filter(".active"),
			next_preview_index = previews.index(active_preview),
			active_project = projects.filter(".active"),
			next_project_index = projects.index(active_project);



		if(this_button.hasClass("portfolio-button_next")) {
			next_project_index = (next_project_index >= projects.length-1) ? 0 : next_project_index+1;
			this_next_index = this_next_index >= this_thumbnails.length-1 ? 0 : this_next_index+1;
			other_next_index = (other_next_index >= other_thumbnails.length-1) ? 0 : other_next_index+1;

			next_preview_index = (next_preview_index >= previews.length-1) ? 0 : next_preview_index+1;
		} else {
			next_project_index--;
			this_next_index--;
			other_next_index--;

			next_preview_index--;
		}

		function lock_buttons(){
			this_button.prop("disabled", true);
			other_button.prop("disabled", true);

			setTimeout(function(){
				this_button.prop("disabled", false);
				other_button.prop("disabled", false);
			}, 700);
		}

		function change_thumbs(){
			var this_next_thumb = this_thumbnails.eq(this_next_index),
				other_next_thumb = other_thumbnails.eq(other_next_index);

			this_next_thumb.removeClass("move-down").addClass("active move-up");
			this_active_thumb.removeClass("active move-down").addClass("move-up");

			other_next_thumb.removeClass("move-up").addClass("active move-down");
			other_active_thumb.removeClass("active move-up").addClass("move-down");
		}

		function change_preview(){
			var next_preview = previews.eq(next_preview_index);

			active_preview.removeClass("active");
			next_preview.addClass("active");
		}

		function change_project(){
			var next_project = projects.eq(next_project_index),
				letters = next_project.find("." + letter_class);

			active_project
				.removeClass("active")
				.find("." + letter_class)
				.removeClass("show");

			next_project.addClass("active");
			letters.addClass("show");
		}


		change_thumbs();
		change_project();
		change_preview();
		lock_buttons();
		console.timeEnd("Slider click");
	});

};



module.exports = {
	prepareTitles : prepareTitles,
	createSlider : createSlider
};
