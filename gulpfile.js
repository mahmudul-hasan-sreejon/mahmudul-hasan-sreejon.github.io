// 'use strict';

let autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
let csso = require('gulp-csso');
let del = require('del');
let gulp = require('gulp');
let htmlmin = require('gulp-htmlmin');
let runSequence = require('run-sequence');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify-es').default;

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];


// Gulp task to minify CSS files
gulp.task('styles', function () {
	return (
		gulp.src('./css/resume.css')
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Minify the file
		.pipe(csso())
		// Rename the minified file
		.pipe(rename('resume.min.css'))
    // Output
		.pipe(gulp.dest('./css'))
	);
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function() {
	return (
		gulp.src('./js/resume.js')
    // Minify the file
		.pipe(uglify())
		// Rename the minified file
		.pipe(rename('resume.min.js'))
    // Output
    .pipe(gulp.dest('./js'))
	);
});

// Gulp task to minify HTML files
// gulp.task('pages', function() {
// 	return (
// 		gulp.src(['./src/**/*.html'])
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       removeComments: true
//     }))
//     .pipe(gulp.dest('./dist'))
// 	);
// });
