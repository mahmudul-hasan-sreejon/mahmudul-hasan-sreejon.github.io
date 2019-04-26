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
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');

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

// File(s) paths start
var STYLES_PATH = 'src/styles/**/*.css';
var SCRIPTS_PATH = 'src/scripts/**/*.js';
var IMAGES_PATH = 'src/images/**/*.{png,jpeg,jpg,svg,gif,ico}';
var TEMPLATES_PATH = 'src/templates/pages/**/*.+(html|nunjucks|njk)';

var DIST_BASE_PATH = 'public';
var DIST_STYLES_PATH = 'public/styles';
var DIST_SCRIPTS_PATH = 'public/scripts';
var DIST_IMAGES_PATH = 'public/images';
var DIST_TEMPLATES_PATH = './';

var TEMPLATES_DATA_PATH = './src/templates/data.json';
var TEMPLATES_LAYOUTS_PATH = ['src/templates/layouts'];
// File(s) paths end



// Default task
gulp.task('default', ['clean', 'images', 'styles', 'scripts'], function() {});


// Clean task
gulp.task('clean', function() {
	return del.sync([DIST_BASE_PATH]);
});


// Styles task
gulp.task('styles', function() {
	return (
		gulp.src(STYLES_PATH) // path for source css files
		.pipe(plumber(function(err) { // restart server if any error occurs
			console.log('Styles Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS })) // add vendor prefixes
		.pipe(concat('resume.min.css')) // concat all the css files
		.pipe(cleanCSS()) // minify all the css file(s)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_STYLES_PATH)) // new minified css file location
		.pipe(livereload()) // check for updates
	);
});


// Scripts task
gulp.task('scripts', function() {
	return (
		gulp.src(SCRIPTS_PATH) // path for source script files
		.pipe(plumber(function(err) { // restart server if any error occurs
			console.log('Scripts Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] })) // transpile all script files to es5
		.pipe(uglify()) // minify all the script files
		.pipe(concat('resume.min.js')) // concat all the script files
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_SCRIPTS_PATH)) // new minified script file location
		.pipe(livereload()) // check for updates
	);
});


// Images task
gulp.task('images', function() {
	return (
		gulp.src(IMAGES_PATH) // path for source image files
		.pipe(plumber(function(err) { // restart server if any error occurs
			console.log('Images Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(imagemin()) // lossless compression
		// .pipe(imagemin([
		// 	imagemin.gifsicle(),
		// 	imagemin.jpegtran(),
		// 	imagemin.optipng(),
		// 	imagemin.svgo(),
		// 	imageminPngquant(),
		// 	imageminJpegRecompress()
		// ])) // lossy compression
		.pipe(gulp.dest(DIST_IMAGES_PATH)) // new compressed image file(s) location
		.pipe(livereload()) // check for updates
	);
});


// Templates task
gulp.task('templates', function() {
	return (
		gulp.src(TEMPLATES_PATH) // path for source template files
		.pipe(plumber(function(err) { // restart server if any error occurs
			console.log('Templates Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(data(function() { // add data from data.json file
				return require(TEMPLATES_DATA_PATH);
		}))
		.pipe(nunjucksRender({ // render templates
			path: TEMPLATES_LAYOUTS_PATH
		}))
		.pipe(htmlmin({ // Minify html
			// collapseWhitespace: true,
			// removeComments: true
		}))
		.pipe(gulp.dest(DIST_TEMPLATES_PATH)) // new compressed template file(s) location
		.pipe(livereload()) // check for updates
	);
});


// Watch task
gulp.task('watch', ['default'], function() {
	require('./server'); // start the server

	livereload.listen(); // listen for any change

	gulp.watch(STYLES_PATH, ['styles']); // run `styles` task when any change occurs in STYLES_PATH
	gulp.watch(SCRIPTS_PATH, ['scripts']); // run `scripts` task when any change occurs in SCRIPTS_PATH
	gulp.watch(IMAGES_PATH, ['images']); // run `images` task when any change occurs in IMAGES_PATH
	gulp.watch(TEMPLATES_PATH, ['templates']); // run `templates` task when any change occurs in TEMPLATES_PATH
});