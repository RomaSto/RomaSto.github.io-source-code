"use strict";

global.$ = {
	package: require("./package.json"),
	config: require("./gulp/config"),
	path: {
		task: require("./gulp/paths/tasks.js"),
		template: require("./gulp/paths/template.js"),
		myLibs: require("./gulp/paths/my_libs_paths.js"),
		vendorLibs: require("./gulp/paths/vendor_libs_paths.js"),
		vendorCss: require("./gulp/paths/vendor_css_paths.js"),
		app: require("./gulp/paths/app.js")
	},
	gulp: require("gulp"),
	rimraf: require("rimraf"),
	bourbon: require("node-bourbon"),
	browserify: require("browserify"),
	vinyl: require("vinyl-source-stream"),
	buffer: require("vinyl-buffer"),
	browserSync: require("browser-sync").create(),
	gp: require("gulp-load-plugins")()
};

$.path.task.forEach(function(taskPath) {
	require(taskPath)();
});

$.gulp.task("default", $.gulp.series(
	// 'clean',
	"vendor_css",
	"sprites_svg",
	$.gulp.parallel(
		"copy_fonts",
		"sass",
		"jade",
		"concat_libs",
		"js.lint",
		"js.process",
		"copy.image"
		),
	$.gulp.parallel(
		"watch",
		"serve"
		)
	));
