const {src, dest} = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const rename = require('gulp-rename');

const tsProject = ts.createProject('tsconfig.json');

exports.default = function() {
    return src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(concat('ts-workspace.js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write())
        .pipe(dest('build/'));
}