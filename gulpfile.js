var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');

var node_modules_path = './node_modules';

// remove files in the public folder
gulp.task('clean', function(){
	return gulp.src('./public/*', {read: false})
		.pipe(clean());
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});

	gulp.watch(['forceCircles/*.html', 'index.html'], ['pages']);
	gulp.watch('forceCircles/*.css',['styles']);
	gulp.watch('forceCircles/*.js',['scripts']);

  gulp.watch(['index.html', 'forceCircles/*.css', 'forceCircles/*.js', 'forceCircles/*.html']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	return gulp.src(['**/*.html', '!public/**'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./public'));

});

// compiles styles with foundation base styles
gulp.task('styles', function(){
	gulp.src(['**/*.css', '!public/**'])
	.pipe(cssmin())
	.pipe(gulp.dest('./public'));
});


gulp.task('scripts', function(){
	gulp.src(['**/*.js', '!gulpfile.js', '!public/**'])
		.pipe(gulp.dest('./public'));
});


gulp.task('default', ['pages', 'styles','scripts', 'serve']);

gulp.task('build', ['pages', 'styles', 'scripts']);
