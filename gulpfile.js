"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const imageminMozjpeg = require('imagemin-mozjpeg');
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore")
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const gulpIf = require("gulp-if");

let production = false;

const productionOn = (done) => {
  production = true;
  done();
};

const css = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

const reload = (done) => {
  sync.reload();
  done();
};

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(css));
  gulp.watch("source/js/**/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

const images = () => {
  return gulp
    .src(["source/img/**/*.{png,jpg,svg}", "!source/img/icons/*.svg"])
    .pipe(
      gulpIf(
        production,
        imagemin([
          imageminMozjpeg({
            progressive: true,
            quality: 90,
          }),
          imagemin.optipng({ optimizationLevel: 3 }),
          imagemin.svgo(),
        ])
      )
    )
    .pipe(gulp.dest("build/img"));
};

const createWebp = () => {
  return gulp
    .src("source/img/content/**/*.{jpeg,jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img/content"));
};

const sprite = () => {
  return gulp.src("source/img/icons/*.svg")
    .pipe(imagemin(
      imagemin.svgo()
    ))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

const html = () => {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
};

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source//*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
};

gulp.task("clean", function () {
  return del("build");
});


const scripts = () => {
  return gulp
  .src(["./source/js/**/*.js"])
  .pipe(concat("main.js"))
  .pipe(gulp.dest("./build/js"))
};

const devTools = (done) => {
  gulp
    .src(["source/pixel-glass/**/*"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

const clean = () => {
  return del("build");
};

const build = gulp.series(
  clean,
  gulp.parallel(
    copy,
    css,
    sprite,
    html,
    scripts,
    createWebp,
    images)
);

const predeploy = gulp.series(productionOn, build);

const dev = gulp.series(
  build,
  gulp.parallel(gulp.series(server, watcher), devTools)
);

exports.start = dev;
exports.build = predeploy;
