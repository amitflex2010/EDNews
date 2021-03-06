var gulp = require('gulp');
var gutil = require('gulp-util');
//var bower = require('bower');
//var concat = require('gulp-concat');
/*
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
*/
var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', []);

//gulp.task('default', ['sass']);



gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./www/templates/**/*.html', ['cache_templates']);

});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

var minifyHtml    = require('gulp-minify-html'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('cache_templates', function() {
  gulp.src('www/app/views/**/*.html')
      .pipe(minifyHtml({empty: true}))
      .pipe(templateCache({
        standalone: true,
        root: 'templates'
      }))
      .pipe(gulp.dest('www/app/js'));
})