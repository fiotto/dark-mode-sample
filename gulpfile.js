const gulp = require('gulp');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const mode = require('gulp-mode')({
    modes: ['production', 'development'],
    default: 'development',
    verbose: false
});

exports.default = function (cb) {
    console.log('gulp run');
    cb();
}

function html() {
    return gulp.src('src/html/index.pug')
        .pipe(pug())
        .pipe(rename({ exports: '.html' }))
        .pipe(gulp.dest('./dist'));
}

function style() {
    return gulp.src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(mode.development(sourcemaps.write('.')))
        .pipe(gulp.dest('./dist'));
}

function server() {
    return connect.server({
        root: 'dist',
        host: '0.0.0.0',
        livereload: true
    })
}

const build = gulp.parallel(html, style);

const watch = gulp.parallel(build, function(cb) {
    gulp.watch('src/html/**/*.pug', html);
    gulp.watch('src/sass/**/*.scss', style);
    cb();
})

const dev = gulp.parallel(server, watch)

exports.html = html;
exports.style = style;
exports.build = build;
exports.server = server;
exports.watch = watch;
exports.dev = dev;
