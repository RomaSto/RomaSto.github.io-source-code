'use strict';

module.exports = function() {
	$.gulp.task('vendor_css', function() {
		return $.gulp.src($.path.vendorCss)
		.pipe($.gp.concatCss('vendor.css'))
		.pipe($.gp.csso())
		.pipe($.gulp.dest('./source/style/vendor'))
	})
};
