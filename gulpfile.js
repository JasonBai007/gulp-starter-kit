var gulp = require('gulp');
var connect = require('gulp-connect');  //文件服务器
var concat = require('gulp-concat');  //合并
var rename = require('gulp-rename');  //重命名
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['Firefox < 20','>5%'] });
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

// 配置输入输出路径
var inputPath = {
	html:'./app/index.html',
  	less: 'app/src/less/*.less',
  	js: 'app/src/js/*.js'
};
var outputPath = {
    css: 'app/dist/css/',
    js: 'app/dist/js/'
};

// 定义默认任务和监控任务
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
    gulp.src(inputPath.html)
        .pipe(connect.reload());
});

// 定义处理LESS任务
gulp.task('less', function() {
	return  gulp.src(inputPath.less)
			.pipe(less({ plugins: [autoprefix] }))
  			.pipe(concat('buddle.css'))
            .pipe(gulp.dest(outputPath.css))
            .pipe(cleanCSS())
            .pipe(rename( {extname: '.min.css'} ))
			.pipe(gulp.dest(outputPath.css))
			.pipe(connect.reload());
});
// 定义处理JS任务
gulp.task('js', function() {
	return  gulp.src(inputPath.js)
			.pipe(concat('buddle.js'))
            .pipe(gulp.dest(outputPath.js))
            .pipe(uglify())
            .pipe(rename( {extname: '.min.js'} ))
			.pipe(gulp.dest(outputPath.js))
			.pipe(connect.reload());
});

// 监控任务
gulp.task('watch',function() {
	gulp.watch(inputPath.html, ['html']);
	gulp.watch(inputPath.less,['less']);
	gulp.watch(inputPath.js,['js']);
})