/**
 *
 * Scripts Module
 *
 * Version: 1.0
 *
 * Compile CSS from Sass files
 *
 */
/* global module, require */
'use strict';
module.exports = function(gulp, plugins, config) {
    var concat = require('gulp-concat');
    var minify = require('gulp-minify');
    var rename = require('gulp-rename');
    // Combine js files
    gulp.task('bootstrapjs', function() {
        return gulp
            .src([
                config.baseDir + '/node_modules/bootstrap/js/dist/util.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/alert.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/button.js',
                // config.baseDir + '/node_modules/bootstrap/js/dist/carousel.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/collapse.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/dropdown.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/modal.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/scrollspy.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/tab.js',
                config.baseDir + '/node_modules/bootstrap/js/dist/tooltip.js'
                // config.baseDir + '/node_modules/bootstrap/js/dist/popover.js'
            ])
            .pipe(rename('bootstrap.js'))
            .pipe(gulp.dest(config.baseDir + '/' + config.scripts));
    });
    // Create minified js
    gulp.task('minifyjs', ['bootstrapjs'], function() {
        // bootstrapjs has to be finished before minifyjs
        return gulp
            .src([config.scripts + '/**/**/*.js', '!' + config.scripts + '/**/**/*.min.js']) // exclude .min.js
            .pipe(
                minify({
                    ext: {
                        src: '.js',
                        min: [/(.*)\.js$/, '$1.min.js']
                    },
                    noSource: true
                })
            )
            .pipe(gulp.dest(config.scripts));
    });
    // Combine js files
    gulp.task('combinejs', ['minifyjs'], function() {
        // minifyjs has to be finished before combinejs
        return gulp
            .src([
                // file order is important !
                config.scripts + '/jquery-3.2.1.slim.min.js',
                config.scripts + '/popper.min.js',
                config.scripts + '/bootstrap.min.js',
                config.scripts + '/plugins/loaders/pace.min.js',
                config.scripts + '/plugins/misc/holder.min.js',
                config.scripts + '/project.min.js'
            ])
            .pipe(concat(config.baseCombinedName + '.min.js'))
            .pipe(gulp.dest(config.scripts));
    });
    // main task
    gulp.task('scripts', ['bootstrapjs', 'minifyjs', 'combinejs']);
};
