var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

var stylus = require('gulp-stylus');
var cleanCSS = require('gulp-clean-css');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		main: './public/styles/site.styl',
		all: './public/styles/**/*.styl',
		css: './public/styles/**/*.css',
		output: './public/styles/'
	}

};


gulp.task('watch:stylus', function () {
	gulp.watch(paths.style.all, ['stylus']);
});

gulp.task('stylus', function () {
	gulp.src(paths.style.main)
		.pipe(stylus())
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('watch:minify-css', function() {
	gulp.watch(paths.style.css, ['minify-css']);
});

gulp.task('minify-css', function() {
    return gulp.src('./public/styles/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [
  'stylus',
  'watch:stylus'
]);

gulp.task('default', ['watch', 'runKeystone']);
