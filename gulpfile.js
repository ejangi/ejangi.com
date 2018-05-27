const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel')
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const eslint = require('rollup-plugin-eslint');
const uglify = require('gulp-uglifyes');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

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

gulp.task('bootstrap', function(){
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(dest+'/scripts'))
});

gulp.task('js', function(){
  return rollup({
      input: './src/scripts/app.js',
      sourcemap: true,
      format: 'iife',
      external: [ 'jQuery' ],
      globals: { 
        jQuery: 'jQuery'
      },
      name: 'ejangi',
      onwarn: function (message) {
        // Suppress this error message... there are hundreds of them. Angular team says to ignore it.
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (/The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten./.test(message)) {
            return;
        }
        console.error(message);
      },
      plugins: [
        babel({
            exclude: 'node_modules/**', // Only transpile our source code
            externalHelpersWhitelist: [ // Include only required helpers
              'defineProperties',
              'createClass',
              'inheritsLoose',
              'defineProperty',
              'objectSpread'
            ]
          }),
        eslint({
          "env": {
            "es6": true,
            "browser": true,
            "node": false
          },
          "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module"
          },
          "rules": {
            "consistent-return": "off",
            "func-style": "off",
            "no-console": "off",
            "no-magic-numbers": "off",
            "no-process-env": "off",
            "no-process-exit": "off",
            "no-sync": "off",
            "spaced-comment": "off"
          }
        })
      ]
    })

    // point to the entry file.
    .pipe(source('app.js', './src/scripts'))

    // buffer the output. most gulp plugins, including gulp-sourcemaps, don't support streams.
    .pipe(buffer())

    // tell gulp-sourcemaps to load the inline sourcemap produced by rollup-stream.
    .pipe(sourcemaps.init({loadMaps: true}))

        // transform the code further here.
    .pipe(uglify({ 
       mangle: false, 
       ecma: 6 
    }))

    // if you want to output with a different name from the input file, use gulp-rename here.
    .pipe(rename(function (path) {
      path.extname = '.min.js';
    }))

    // write the sourcemap alongside the output file.
    .pipe(sourcemaps.write('.'))    

    // and output to ./dist/main.js as normal.
    .pipe(gulp.dest(dest+'/scripts'))
});

gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(clean());
});

gulp.task('default', [ 'php', 'style.css', 'css', 'js' ]);

gulp.task('watch', function() {
    gulp.watch('src/styles/*.scss', ['css']);
    gulp.watch('src/scripts/*.js', ['js']);
    gulp.watch('src/style.css', ['style.css']);
    gulp.watch('src/**/*.php', ['php']);
});