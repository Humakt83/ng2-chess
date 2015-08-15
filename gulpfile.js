'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');

var DIST_DIR = './dist/'
// add custom browserify options here
var customOpts = {
  entries: ['./app/ngchess.js'],
  extensions: ['.js'],
  paths: ['./node_modules','./app/js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

gulp.task('copyFiles', function() {
	gulp.src([
        './app/index.html',
        './app/style.css',
		'./app/ngchess.ico',
        './app/img/**/*',
		'./app/partials/**/*'        
    ])
	.pipe(gulp.dest(DIST_DIR));
})

gulp.task('default', ['copyFiles'], bundle); // so you can run `gulp js` to build the file
gulp.task('serve', ['default'], function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('dist', ['copyFiles'], function() {
	return browserify(assign({}, customOpts))
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())		
		.pipe(uglify())
		.pipe(gulp.dest(DIST_DIR));
});

gulp.task('serve-dist', ['dist'], function() {
	browserSync({
		server: {
			baseDir: 'dist'
		}
	});
});

b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))	
    .pipe(gulp.dest(DIST_DIR));
}