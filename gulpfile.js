import gulp from "gulp";
import browserSync from "browser-sync"
import cleanCSS from "gulp-clean-css"
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import rename from "gulp-rename";

const sass = gulpSass(dartSass);

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    })
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({  suffix: '.min' }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'))
});

gulp.task('default', gulp.parallel('watch', 'styles', 'server'));