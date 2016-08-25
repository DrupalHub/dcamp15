var gulp 		      = require('gulp'),
 	  sass 		        = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
	  injectPartials  = require('gulp-inject-partials');

// Handles partials injection on index.html
gulp.task('partials', function () {
  return gulp.src('./src/html/index.html')
           .pipe(injectPartials({
             removeTags: true
           }))
           .pipe(gulp.dest('./dist'));
});

// Compiles, prefixes and minifies style.scss & fruits.scss
gulp.task('sass', function () {
  return gulp.src('./src/sass/*/*')
    .pipe(sass().on('error', sass.logError))
    // .pipe(prefix({ browsers: ['last 3 versions'] }))
    .pipe(gulp.dest('./dist/css'));
});

// Builds website to /dist
gulp.task('build', ['partials', 'sass']);

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server : './dist',
    open: true,
  });

  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/html/index.html', ['partials']).on('change', browserSync.reload);
  gulp.watch('src/html/*/*.html', ['partials']).on('change', browserSync.reload);
});
