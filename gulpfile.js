"use strict";

var gulp = require('gulp');
var del = require('del');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');

// Image compression start
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
// Image compression end

// Set browser(s) to support autoprefixer start
var AUTOPREFIXER_BROWSERS = [
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

// File paths start
var CSS_PATH = 'public/css/**/*.css';


var SCRIPTS_PATH = 'public/scripts/**/*.js';

var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';

var DIST_PATH = 'public';
// File paths end


// Gulp tasks

// Default task
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], function() {});


// Clean task
gulp.task('clean', function() {
	return del.sync([DIST_PATH]);
});


// Styles for CSS task
gulp.task('styles', function() {
	return (
		gulp.src(CSS_PATH) // path for source css files
		.pipe(plumber(function(err) { // Restart server if any error occurs
			console.log('Styles Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })) // add vendor prefixes
		.pipe(concat('styles.css')) // concat all the css files
		.pipe(csso()) // minify all the css file(s)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH)) // new minified css file location
		.pipe(livereload()) // check for updates
	);
});


// Styles for SCSS task
// gulp.task('styles', function() {
//     return (
//         gulp.src('./public/scss/styles.scss') // path for source scss file
//         .pipe(plumber(function(err) { // Restart server if any error occurs
//             console.log('Styles Task Error:');
//             console.log(err);
//             this.emit('end');
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })) // add vendor prefixes
//         .pipe(sass({ outputStyle: 'compressed' })) // minify all the scss file(s)
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest(DIST_PATH)) // new minified scss to css file location
//         .pipe(livereload()) // check for updates
//     );
// });


// Scripts task
gulp.task('scripts', function() {
	return (
		gulp.src(SCRIPTS_PATH) // path for source script files
		.pipe(plumber(function(err) { // Restart server if any error occurs
			console.log('Scripts Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] })) // transpile all script files to es5
		.pipe(uglify()) // minify all the script files
		.pipe(concat('scripts.js')) // concat all the script files
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH)) // new minified script file location
		.pipe(livereload()) // check for updates
	);
});


// Images task
gulp.task('images', function() {
	return (
		gulp.src(IMAGES_PATH) // path for source image files
		// .pipe(imagemin()) // lossless compression
		.pipe(imagemin([
			imagemin.gifsicle(),
			imagemin.jpegtran(),
			imagemin.optipng(),
			imagemin.svgo(),
			imageminPngquant(),
			imageminJpegRecompress()
		])) // lossy compression
		.pipe(gulp.dest(DIST_PATH + '/images')) // new compressed image file(s) location
	);
});


// Watch task
gulp.task('watch', ['default'], function() {
	require('./server'); // start the server

	livereload.listen(); // listen for any change

	gulp.watch(CSS_PATH, ['styles']); // run `styles` task when any change occurs in CSS_PATH
	// gulp.watch(SCSS_PATH, ['styles']); // run `styles` task when any change occurs in SCSS_PATH

	gulp.watch(SCRIPTS_PATH, ['scripts']); // run `scripts` task when any change occurs in SCRIPTS_PATH
});
