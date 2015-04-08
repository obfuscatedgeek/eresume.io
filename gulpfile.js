var gulp = require('gulp')
    ,compass = require('gulp-compass')
    ,sass = require('gulp-ruby-sass')
    ,notify = require('gulp-notify')
    ,watch = require('gulp-watch')
    ,rename = require('gulp-rename')
    ,minifycss = require('gulp-minify-css')
    ,concat = require('gulp-concat')
    ,ngmin = require('gulp-ngmin')
    ,uglify = require('gulp-uglify')


    ,cssDirs= {
        css: 'public/styles/css'
        ,min: 'public/styles/min'
    }

    ,jsDirs = {
        min: 'public/build'
    }
;


gulp.task('scripts', function() {

    return gulp.src([
            'public/vendor/angular/angular.js'
            ,'public/vendor/angular-animate/angular-animate.js'
            ,'public/vendor/angular-sanitize/angular-sanitize.js'
            ,'public/vendor/angular-ui-router/release/angular-ui-router.js'
            ,'public/vendor/angular-resource/angular-resource.js'
            ,'public/vendor/ionic/release/js/ionic.js'
            ,'public/vendor/ionic/release/js/ionic-angular.js'
            ,'public/vendor/ngprogress/build/ngProgress.js'
            ,'public/vendor/satellizer/satellizer.js'
            ,'public/vendor/rightjs/rightjs.js'
            ,'public/vendor/lodash/dist/lodash.min.js'
            ,'public/app/**/*.js']
        )
        .pipe(ngmin())
        .pipe(concat('cv-build.js'))
        .pipe(gulp.dest(jsDirs.min))
        //.pipe(uglify())
        .pipe(uglify({mangle: false}))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(jsDirs.min))
        .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('styles', function() {
    return gulp.src('public/styles/*.scss')

        // initial compilation
        .pipe(sass({ style: 'expanded' }))// compile scss to css
        .pipe(gulp.dest(cssDirs.css)) // store the css


        // minifier
        .pipe(rename({suffix: '.min'})) // append min
        .pipe(minifycss()) // minify
        .pipe(gulp.dest(cssDirs.min)) // store the min

        // notify
        .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('watch', function() {
    gulp.watch('public/styles/**.scss', ['styles']);
});


gulp.task('default', ['watch'], function() {

});
