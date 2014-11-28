var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function () {
  return gulp.src('./build', {read: false})
    .pipe(clean());
});

gulp.task('usemin', function () {
  return gulp.src('./*.html')
    .pipe(usemin({
        css: [sass(), minifyCss(), 'concat'],
        html: [minifyHtml({empty: true})]
    }))
    .pipe(gulp.dest('./build'))
    .pipe(reload({ stream:true }));
});

// Minify Images
gulp.task('imagemin', function(){
  return gulp.src('./images/*')
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('sass', function() {
  return gulp.src('./styles/main.scss')
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./styles'))
    .pipe(reload({ stream:true }));
});

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('./styles/*.scss', ['sass']);
});
