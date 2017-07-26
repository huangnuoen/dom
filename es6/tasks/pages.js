import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';
//处理视图模板
gulp.task('pages', ()=>{
	return gulp.src('app/**/*.ejs')
		.pipe(gulp.dest('server/views'))
		.pipe(gulpif(args.watch, livereload()))//监听，自动刷新
})