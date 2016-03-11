var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function(){
  connect.server({
    fallback:'index.html',
    livereload: true
  });
})
