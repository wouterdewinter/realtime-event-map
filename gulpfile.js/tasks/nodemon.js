var nodemon = require('gulp-nodemon');
var gulp = require('gulp');

gulp.task('nodemon', function () {
    nodemon({
        script: 'src/nodejs/server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});