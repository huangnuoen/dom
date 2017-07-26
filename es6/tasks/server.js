//处理服务器
import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';//引入启动服务器包
import args from './util/args';

gulp.task('server', (cb)=>{
	if(!args.watch) return cb();//不是监听状态，返回回调函数

	//监听状态下，启动服务器
	var server = liveserver.new(['--harmony', 'server/bin/www']);
	server.start();

	//启动服务器后，监听目录下的js和ejs文件（前端）
	gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file){
		server.notify.apply(server, [file]);//通知服务器有改动
	})

	//服务器路由、接口改变（路由）
	gulp.watch(['server/routes/**/*.js', 'server/routes/**/*.ejs'], function(){
		server.start.bind(server)()//服务重启
	})
})