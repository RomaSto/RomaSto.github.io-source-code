'use strict';

module.exports = function() {
	$.gulp.task('sprites_png', function() {
		return $.gulp.src('./source/sprites/png/*.png')
				.pipe($.gp.spritesmith({
					imgName: 'sprite.png',
					cssName: 'sprite.css'
				}))
				.pipe($.gulp.dest($.config.root + '/assets/img/sprites/png'));
	});
};
