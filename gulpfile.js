var gulp = require('gulp');
var connect = require('gulp-connect'); //文件服务器
var concat = require('gulp-concat'); //合并
var rename = require('gulp-rename'); //重命名
var less = require('gulp-less');  //LESS转CSS
const autoprefixer = require('gulp-autoprefixer'); //CSS加前缀
var cleanCSS = require('gulp-clean-css');  //清洗CSS
var uglify = require('gulp-uglify');  //丑化JS
const imagemin = require('gulp-imagemin'); //压缩图片

// 配置输入输出路径
var inputPath = {
    html: 'app/index.html',
    libs: 'app/src/libs/*.js',
    css: 'app/src/css/*.css',
    less: 'app/src/less/*.less',
    js: 'app/src/js/*.js',
    img:'app/src/img/**/*'
};

// 输出路径
var outputPath = {
    css: 'app/dist/css',
    js: 'app/dist/js',
    img:'app/dist/img'
};

// 定义默认任务和监控任务
gulp.task('default', ['handleLess','handleCss', 'handleJs','handleLibs','handleImg']);
gulp.task('watchme', ['connect', 'watch']);
gulp.task('deploy', ['handleLessMin','handleCss', 'handleJsMin','handleLibs','handleImg']);

//使用connect启动一个Web服务器
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

// 定义处理HTML任务
gulp.task('html', function() {
    gulp.src(inputPath.html)
        .pipe(connect.reload());
});
// 定义处理CSS任务
gulp.task('handleCss', function() {
    return gulp.src(inputPath.css)
        .pipe(cleanCSS())
        .pipe(concat('libs.css'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(outputPath.css))
        .pipe(connect.reload());
});
// 定义处理LIBS任务
gulp.task('handleLibs', function() {
    return gulp.src(inputPath.libs)
        .pipe(uglify())
        .pipe(concat('libs.js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(outputPath.js))
        .pipe(connect.reload());
});

// 定义处理LESS任务
gulp.task('handleLess', function() {
    return gulp.src(inputPath.less)
        .pipe(less())
        .pipe(autoprefixer({ browsers: ['last 4 versions','IE 9',"Firefox >= 10"] }))
        .pipe(concat('buddle.css'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(outputPath.css))
        .pipe(connect.reload());
});

// 编译LESS
gulp.task('handleLessMin', function() {
    return gulp.src(inputPath.less)
        .pipe(less())
        .pipe(autoprefixer({ browsers: ['last 4 versions','IE 9',"Firefox >= 10"] }))
        .pipe(concat('buddle.css'))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(outputPath.css))
});
// 定义处理JS任务
gulp.task('handleJs', function() {
    return gulp.src(inputPath.js)
        .pipe(concat('buddle.js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(outputPath.js))
        .pipe(connect.reload());
});
// 生成压缩版Js
gulp.task('handleJsMin', function() {
    return gulp.src(inputPath.js)
        .pipe(uglify())
        .pipe(concat('buddle.js'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(outputPath.js))
});
// 定义处理图片任务
gulp.task('handleImg', function() {
    return gulp.src(inputPath.img)
        .pipe(imagemin())
        .pipe(gulp.dest(outputPath.img))
        .pipe(connect.reload());
});

// 监控任务（监控4类文件）
gulp.task('watch', function() {
    gulp.watch(inputPath.html, ['html']);
    gulp.watch(inputPath.img, ['handleImg']);
    gulp.watch(inputPath.less, ['handleLess']);
    gulp.watch(inputPath.js, ['handleJs']);
})
