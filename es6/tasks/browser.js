import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser', (cb)=>{
	if(!args.watch) return cb();
	gulp.watch('app/**/*.js', ['scripts']);//app的js文件改变时，执行scripts任务
	gulp.watch('app/**/*.ejs', ['pages']);//app的ejs文件改变时，执行pages任务
	gulp.watch('app/**/*.css', ['css']);//app的css文件改变时，执行css任务
})