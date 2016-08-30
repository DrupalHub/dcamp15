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
  return gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    // .pipe(prefix({ browsers: ['last 3 versions'] }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// todo: Add js performance when deploying.
gulp.task('js', function() {
  return gulp.src('./src/js/main.js')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', function() {
  return gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['partials', 'sass', 'js', 'images']);

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server : './dist',
    open: true
  });

  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/js/*.', ['js']).on('change', browserSync.reload);
  gulp.watch('src/html/index.html', ['partials']).on('change', browserSync.reload);
  gulp.watch('src/html/*/*.html', ['partials']).on('change', browserSync.reload);
});
