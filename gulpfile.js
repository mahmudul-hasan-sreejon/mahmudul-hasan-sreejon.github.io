const gulp = require('gulp');
const del = require('del');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const htmlmin = require('gulp-htmlmin');

// File(s) path(s)
const STYLES_PATH = 'src/styles/**/*.css';
const SCRIPTS_PATH = 'src/scripts/**/*.js';
const IMAGES_PATH = 'src/images/**/*.{png,jpeg,jpg,svg,gif,ico}';
const TEMPLATES_PATH = 'src/templates/pages/**/*.+(html|nunjucks|njk)';
const TEMPLATES_DATA_PATH = './src/templates/data.json';
const TEMPLATES_LAYOUTS_PATH = ['src/templates/layouts'];
const TEMPLATES_WATCH_PATH = 'src/templates/**/*.+(html|nunjucks|njk|json)';

const DEST_BASE_PATH = 'public';
const DEST_STYLES_PATH = 'public/styles';
const DEST_SCRIPTS_PATH = 'public/scripts';
const DEST_IMAGES_PATH = 'public/images';
const DEST_TEMPLATES_PATH = './';

// Set browser(s) list for autoprefixer support
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


// Styles task(s)
function styles() {
	return (
		gulp.src(STYLES_PATH) // path for source css files
		.pipe(plumber(function(err) { // restart server if any error occurs
			console.log('Styles Task Error:');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({ overrideBrowserslist: AUTOPREFIXER_BROWSERS })) // add vendor prefixes
		.pipe(concat('resume.min.css')) // concat all the css files
		.pipe(cleanCSS()) // minify all the css file(s)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DEST_STYLES_PATH)) // new minified css file location
		.pipe(livereload()) // check for updates
	);
}


// Scripts task(s)
function scripts() {
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
		.pipe(gulp.dest(DEST_SCRIPTS_PATH)) // new minified script file location
		.pipe(livereload()) // check for updates
	);
}


// Images task(s)
function images() {
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
		.pipe(gulp.dest(DEST_IMAGES_PATH)) // new compressed image file(s) location
		.pipe(livereload()) // check for updates
	);
}


// Templates task(s)
function templates() {
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
		.pipe(gulp.dest(DEST_TEMPLATES_PATH)) // new compressed template file(s) location
		.pipe(livereload()) // check for updates
	);
}


// Delete task(s)
function deletePublicFolder(done) {
	del.sync([DEST_BASE_PATH]);
	done();
}

function deletePublicStyles(done) {
	del.sync([DEST_STYLES_PATH]);
	done();
}

function deletePublicScripts(done) {
	del.sync([DEST_SCRIPTS_PATH]);
	done();
}

function deletePublicImages(done) {
	del.sync([DEST_IMAGES_PATH]);
	done();
}


// Watch task(s)
function watchSourceFolder() {
	require('./server'); // start the server

	livereload.listen(); // listen for any change

	gulp.watch(STYLES_PATH, gulp.series(deletePublicStyles, styles)); // run `deletePublicStyles` & `styles` task when any change occurs in STYLES_PATH
	gulp.watch(SCRIPTS_PATH, gulp.series(deletePublicScripts, scripts)); // run `deletePublicScripts` & `scripts` task when any change occurs in SCRIPTS_PATH
	gulp.watch(IMAGES_PATH, gulp.series(deletePublicImages, images)); // run `deletePublicImages` & `images` task when any change occurs in IMAGES_PATH
	gulp.watch(TEMPLATES_WATCH_PATH, templates); // run `templates` task when any change occurs in TEMPLATES_WATCH_PATH
}


// Export task(s)
exports.default = gulp.parallel(deletePublicFolder, templates, styles, scripts, images);
exports.clean = deletePublicFolder;
exports.style = styles;
exports.script = scripts;
exports.image = images;
exports.template = templates;
exports.watch = watchSourceFolder;