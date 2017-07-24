import gulp from 'gulp';
import gulpif from 'gulp-if';//if判断
import concat from 'gulp-concat';//处理文件拼接
import webpack from 'webpack';//打包
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';//文件重命名标记
import livereload from 'gulp-livereload';//自动刷新
import plumber from 'gulp-plumber';//处理文件信息流
import rename from 'gulp-rename';//文件重命名
import gulify from 'gulp-uglify';//压缩js
import {log, colors} from 'gulp-util';//gulp命令输出
import args from './util/args';

gulp.task('scripts', ()=>{
	return gulp.src('app/js/index.js')
		.pipe(plumber({
			errorHandle: function(){

			}
		}))
		.pipe(named())
		.pipe(gulpWebpack({
			module: {
				loaders: [{
					test:/\.js$/,
					loader: 'babel'
				}]
			}
		}), null, (err, stats)=>{
			log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
				chunks: false
			}))
		})
		.pipe(gulp.dest('server/public/js'))
		.pipe(rename({
			basename: 'cp',
			extname: '.min.js'
		}))
		.pipe(uglif                  y({compress:{properties: false},output:{'quote_keys': true}}))
		.pipe(gulp.dest('server/public/js'))
		.pipe(gulpif(args.watch, livereload()))
})