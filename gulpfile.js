var gulp = require('gulp');
var concat = require('gulp-concat');  //合并文件插件
var connect = require('gulp-connect');  //本地服务器
// 生成CSS插件
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['Firefox < 20','>5%','ie 8','ie 9'] });
var cleanCSS = require('gulp-clean-css');
// 处理JS插件
var uglify = require('gulp-uglify');

// 配置路径
var paths = {
	html:'./app/index.html',
  	less: 'app/src/less/*.less',
  	js: 'app/src/js/*.js'
};

// 定义默认任务
gulp.task('default', ['less','js']);
gulp.task('watchme', ['connect','watch']);

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  	connect.server({
  	  	root: 'app',
  	  	livereload: true
  	});
});

// 刷新浏览器
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

// 定义处理LESS任务
gulp.task('less', function() {
	return  gulp.src(paths.less)
			.pipe(less({ plugins: [autoprefix] }))
  			.pipe(cleanCSS())
  			.pipe(concat('buddle.min.css'))
			.pipe(gulp.dest('app/dist/css'))
			.pipe(connect.reload());
});
// 定义处理JS任务
gulp.task('js', function() {
	return  gulp.src(paths.js)
			.pipe(uglify())
			.pipe(concat('buddle.min.js'))
			.pipe(gulp.dest('app/dist/js'))
			.pipe(connect.reload());
});

// 监控任务
gulp.task('watch',function() {
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.less,['less']);
	gulp.watch(paths.js,['js']);
})