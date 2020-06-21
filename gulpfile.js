var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var flatten = require('gulp-flatten');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');

var node_modules_path = './node_modules';
// var curr_project = 'forceCircles/';
var curr_project = 'oscilloscope/';

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

	gulp.watch([curr_project + '*.html', 'index.html'], ['pages']);
	gulp.watch([curr_project + '*.css', 'app.css'], ['styles']);
	gulp.watch(curr_project + '*.js',['scripts']);

  gulp.watch(['index.html', 'app.css', curr_project + '*.css', curr_project + '*.js', curr_project + '*.html']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	return gulp.src(['**/*.html', '!public/**', '!node_modules/**'])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./public'));

});

// compiles styles with foundation base styles
gulp.task('styles', function(){
	gulp.src(['**/*.css', '!public/**', '!node_modules/**'])
	.pipe(cssmin())
	.pipe(gulp.dest('./public'));
});


gulp.task('scripts', function(){
	gulp.src(['**/*.js', '!gulpfile.js', '!public/**', '!node_modules/**'])
		.pipe(gulp.dest('./public'));
});

gulp.task('media', function(){
	gulp.src(['**/*.mp3', '!gulpfile.js', '!public/**', '!node_modules/**'])
		.pipe(gulp.dest('./public'));
});

gulp.task('default', ['pages', 'styles','scripts', 'media', 'serve']);

gulp.task('build', ['pages', 'styles', 'scripts', 'media']);
