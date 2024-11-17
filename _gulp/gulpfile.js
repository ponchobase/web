// Concat CSS files using gulp
// https://medium.com/@prathameshk73/minify-css-js-using-gulp-4-18fd0dc26240
// https://github.com/kodecrash/gulp-starter
import gulp from "gulp";
import concat from "gulp-concat";
import browsersync from "browser-sync";
import cleanCss from "gulp-clean-css";
import uglify from "gulp-uglify";
import { deleteAsync } from "del";
import sourcemaps from "gulp-sourcemaps";


// Concat and minify CSS files
gulp.task("dist-css", () => {
    return gulp.src([
        // Vendor
        "./src/css/vendor/all.min.css",
        "./src/css/vendor/swiper.min.css",
        // Custom
        "./src/css/style.css.map",
        "./src/css/style.css"
    ])
        .pipe(concat("poncho.min.css"))
        // .pipe(sourcemaps.init())
        .pipe(cleanCss())
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("../dist/css"));
});

// Concat and uglify head JS files
gulp.task("dist-js-vendor", () => {
    return gulp.src([
        // Vendor
        "./src/js/vendor/jquery.min.js",
        "./src/js/vendor/chart.umd.min.js",
        "./src/js/vendor/particles.min.js",
        "./src/js/vendor/swiper.min.js"
    ])
        .pipe(concat("poncho-vendor.min.js"))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("../dist/js"));
});

// Concat and uglify JS files
gulp.task("dist-js", () => {
    return gulp.src([
        // Custom
        // Json
        "./src/js/custom/_json/poncho.js",
        // Init
        "./src/js/custom/initialize.js",
        // Common
        "./src/js/custom/_common/_common.js",
        "./src/js/custom/_common/accordions.js",
        "./src/js/custom/_common/charts.js",
        "./src/js/custom/_common/modals.js",
        "./src/js/custom/_common/number_counters.js",
        "./src/js/custom/_common/particles.js",
        "./src/js/custom/_common/scroll.js",
        "./src/js/custom/_common/swipers.js",
        "./src/js/custom/_common/token.js"
    ])
        .pipe(concat("poncho.min.js"))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("../dist/js"));
});

// Clean up dist folder
gulp.task("clean", async () => {
    return deleteAsync(["../dist/css/poncho.min.css", "../dist/js/poncho-vendor.min.js", "../dist/js/poncho.min.js"], { force: true });
});

// Start session
gulp.task("session-start", (cb) => {
    return gulp.series("clean", "dist-css", "dist-js-vendor", "dist-js")(cb);
});

// Static server and watching CSS/JS/HTML files for changes
gulp.task("server", (done) => {
    browsersync.init({
        server: "./dist",
        directory: true
    });

    // // Watch for file changes
    // gulp.watch("./src/css/style.css", gulp.series("session-start"), browsersync.reload);
    // gulp.watch("./src/js/**/*.js", gulp.series("session-start"), browsersync.reload);
});

// Default session start server
gulp.task("default", gulp.series("session-start", "server"));