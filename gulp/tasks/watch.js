'use strict';

module.exports = function() {
	$.gulp.task('watch', function() {
		$.gulp.watch('./source/js/**/*.js', $.gulp.series('js.lint', 'js.process'));
		$.gulp.watch('./source/style/**/*.sass', $.gulp.series('sass'));
		$.gulp.watch('./source/template/**/*.jade', $.gulp.series('jade'));
		$.gulp.watch('./source/images/**/*.*', $.gulp.series('copy.image'));
		$.gulp.watch('./source/sprites/png/*.png', $.gulp.series('sprites_png'));
		$.gulp.watch('./source/sprites/svg/*.svg', $.gulp.series('sprites_svg'));
	});
};
