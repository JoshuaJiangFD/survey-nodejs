/**
 * Created by joy on 2015/6/11.
 */
var gulp = require('gulp');
var uglify=require('gulp-uglify');//condese the javascript and css to *.min.js and *.min.css version
var htmlreplace = require('gulp-html-replace');//replace the original css and js with condensed  min version
var browserify = require('browserify');//pack the commonJS modules into a js file and use it in the browser
var reactify = require('reactify');//convert jsx file to js file
var source = require('vinyl-source-stream');
var streamify=require('gulp-streamify');
var watchify = require('watchify');//watch the file update and automatically trigger the build task


var path = {
    HTML: 'views/index.ejs',
    MINIFIED_OUT: 'app.min.js',
    OUT:'app.js',
    ENTRY_POINT: './public/javascripts/src/app.js',
    DEST_SRC:'./public/javascripts/build/'
};

gulp.task('watch',function(){

    var watcher=watchify(browserify({
            entries:[path.ENTRY_POINT],
            transform:[reactify],
            debug:true,
            cache:{},packageCache:{},fullPaths:true
        })
    );

    return watcher.on('update',function(){
        watcher.bundle()
            .pipe(source(path.OUT))
            .pipe(gulp.dest(path.DEST_SRC));
        console.log("updated from watcher");
    }).bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('default', ['watch']);




























//gulp.task('js', function(){
//    browserify('./public/javascripts/src/app.js')
//        .transform(reactify)
//        .bundle()
//        .pipe(source('app.js'))
//        .pipe(gulp.dest('public/javascripts/build/'));
//});

