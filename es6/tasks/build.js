import gulp from 'gulp';
import gulpSequence from 'gulp-sequence';

gulp.task('build', gulpSequence('clean', 'css', 'pages', 'scripts', ['browser', 'server']));//数组在其它任务之后执行，数组内的browser在server之前执行