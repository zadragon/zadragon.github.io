const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'), // sass 컴파일
    minifyCss = require('gulp-minify-css'), //sass 미니파인더
    imagemin = require('gulp-imagemin'),
    open = require('gulp-open'),
    webserver = require('gulp-webserver'),
    htmlmin = require('gulp-htmlmin'),
    watch = require('gulp-watch');


var devSrc = 'front/pre-build';
var devPaths = {
  js : devSrc + '/js/**/*.js',
  css : devSrc + '/css/**/*.scss',
  html : devSrc + '/html/**/*.*',
  images : devSrc + '/images/**/*.*'
}

var buildSrc = './front/build';

gulp.task('combine-js', function () {
    gulp.src(devPaths.js)
    .pipe(uglify())
    .pipe(concat('result.js'))
    .pipe(gulp.dest(buildSrc + '/js'));
});

gulp.task('compile-sass',function(){
  gulp.src(devPaths.css)
  .pipe(concat('result.css'))
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(gulp.dest(buildSrc + '/css'));
});

gulp.task('htmlmin', function() {
  gulp.src(devPaths.html)
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(buildSrc + '/html'));
});

gulp.task('imagemin',function(){
    gulp.src(devPaths.images)
    //.pipe(imagemin())
    .pipe(gulp.dest(buildSrc + '/images'));
});

gulp.task('server',function(){
  var options = {
       uri: "http://localhost:8000/html/index.html",
       app: "chrome"
   };
   gulp.src(buildSrc + "/")
   .pipe(webserver({
       livereload : true,
       port :8000
   }))
   .pipe(open(options));
});

gulp.task('watch',function(){
  gulp.watch(devPaths.js,['combine-js']);
  gulp.watch(devPaths.css,['compile-sass']);
  gulp.watch(devPaths.html,['htmlmin']);
  gulp.watch(devPaths.images,['imagemin']);
});

gulp.task('default', [ 'combine-js','compile-sass','htmlmin','imagemin','server','watch' ]);
