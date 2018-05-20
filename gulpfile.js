const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const dest = 'wp-content/themes/ejangi';

gulp.task('php', function(){
  return gulp.src('src/**/*.php')
    .pipe(gulp.dest(dest))
});

gulp.task('style.css', function(){
  return gulp.src('src/style.css')
    .pipe(gulp.dest(dest))
});

gulp.task('css', function(){
  return gulp.src('src/styles/main.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dest+'/styles'))
});

gulp.task('js', function(){
  return gulp.src('src/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest+'/scripts'))
});

gulp.task('default', [ 'php', 'style.css', 'css', 'js' ]);

gulp.task('watch', function() {
    gulp.watch('src/styles/*.scss', ['css']);
    gulp.watch('src/scripts/*.js', ['js']);
    gulp.watch('src/style.css', ['style.css']);
    gulp.watch('src/**/*.php', ['php']);
});