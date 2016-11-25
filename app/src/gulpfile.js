// 构建工具依赖包
var gulp        = require("gulp");
var less        = require("gulp-less");
var fileinclude = require('gulp-file-include');
var sourcemaps  = require('gulp-sourcemaps');
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');

// 构建工具常用参数
var dist_url = "../dist/";

// ==编译 js 文件
gulp.task('script', function() {
    // 1. 找到文件
    gulp.src(['js/**.*", "js/**/**.*', 'js/**/**/**.*'])
    // 3. 另存压缩后的文件
        .pipe(gulp.dest(dist_url + "js"));
})

// ==编译less
gulp.task('less', function () {
    // 1. 找到 less 文件
    gulp.src(['less/**.less', 'less/**/**.less', '!less/**_no.less', '!less/{common,component,Ku,pages,variable}/**.less'])
    // 生成sourcemap
        .pipe(sourcemaps.init())
    // 2. 编译为css
        .pipe(less())
    // 书写sourcemap文件
        .pipe(sourcemaps.write('../map_css'))
    // 3. 另存文件
        .pipe(gulp.dest(dist_url + 'css'));
});

// ==压缩图片任务
gulp.task('images', function () {
    // 1. 找到图片
    gulp.src(['img/**.*', 'img/**/*.*'])
    // 2. 另存图片
        .pipe(gulp.dest(dist_url + "img"));
});

// ==引入html结构组件
gulp.task('fileinclude', function() {
    gulp.src(['**.html', '**/**/**.html', '**/**/**/**.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest(dist_url));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch(['js/**.*", "js/**/**.*', 'js/**/**/**.*'], ['script']);
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch(['less/**.less', 'less/**/**.less'], ['less']);
    // 监听文件修改，当文件被修改则执行 css 任务
    gulp.watch(['img/**.*', 'img/**/*.*'], ['images']);
    // 监听文件修改，当文件被修改则执行 fileinclude 任务
    gulp.watch(['**.html', '**/**/**.html', '**/**/**/**.html'], ['fileinclude']);
})

gulp.task('default', ['script', 'less', 'images', 'fileinclude', 'auto']);

// ==删除文件操作--gulp-clean
gulp.task('clean_file_clean', function () {
    gulp.src(dist_url, {read: false})
        .pipe(clean({force: true}));
})