import gulp     from 'gulp';
import gutil    from 'gulp-util';
import del      from 'del';
import webpack  from 'webpack';
import config   from './config';

gulp.task('clean', () => {
    del([config.paths.dist]).then(function (paths) {
        gutil.log("[clean]", paths);
    })
});


gulp.task('build', ['clean'], () => {
    const webpackConfig = require('./webpack.dist.config').default;

    webpackConfig.entry.app = config.webpack.entry;

    webpack(webpackConfig, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }));
    });
});


