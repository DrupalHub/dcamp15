var gulp 		      = require('gulp'),
 	  sass 		        = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
	  injectPartials  = require('gulp-inject-partials'),
    fs = require('fs'),
    path = require('path'),
    YAML = require('yamljs');

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

gulp.task('speakers', function() {
  var tpl = '<div class="four wide column">' +
            '<img src="images/{{image}}" class="ui small centered circular image" />' +
            '<h4>{{name}}</h4>' +
            '{{job}}' +
            '</div>';

  fs.readdir('./src/speakers', function(err, files) {
    var content = files.map(function(file) {
      var result = YAML.load('./src/speakers/' + file);

      return tpl
        .replace('{{name}}', result.name)
        .replace('{{job}}', result.job)
        .replace('{{image}}', result.image);
    });

    fs.writeFileSync('src/html/includes/_speaker_list.html', content.join(""));
  });

});

gulp.task('build', ['speakers', 'partials', 'sass', 'js', 'images']);

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
