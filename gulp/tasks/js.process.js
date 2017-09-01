'use strict';

module.exports = function() {
	$.gulp.task('js.process', function() {

		return $.browserify($.path.app)
			.bundle()
			.pipe($.vinyl('app.js'))
			.pipe($.buffer())
			.pipe($.gp.sourcemaps.init())
			.pipe($.gp.uglify())
			.pipe($.gp.sourcemaps.write())
			.pipe($.gulp.dest($.config.root + '/assets/js'));

		// return $.gulp.src($.path.app)
		// 	.pipe(browserified)
		// 	// .pipe($.gp.sourcemaps.init())
		// 	// .pipe($.gp.concat('app.js'))
		// 	// .pipe($.gp.sourcemaps.write())
		// 	// .pipe($.gp.uglify())
		// 	.pipe($.gulp.dest($.config.root + '/assets/js'))
	})
};
