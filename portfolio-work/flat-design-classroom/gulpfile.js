const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");

gulp.task("autoprefixer", function() {
  return gulp
    .src("./assets/styles.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(
      rename({
        suffix: "-generated"
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./assets"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("default", gulp.parallel("browserSync", "autoprefixer"), function() {
  gulp.watch("./assets/styles.css", ["autoprefixer"]);
  gulp.watch("./index.html", browserSync.reload);
});
