import webpack       from 'webpack';
import config        from './config';
import webpackConfig from './webpack.config';
import ExtractTextPlugin from "extract-text-webpack-plugin";

webpackConfig.devtool = 'inline-source-map';

webpackConfig.output = {
    filename: 'scripts/[name].js',
    publicPath: '/',
    path: config.paths.src
};

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader","css?-url&sourceMap!less?sourceMap")
    }
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
    /**
     * 增加webpack HMR支持
     * 监听到文件改动后自动刷新浏览器
     */
    new webpack.HotModuleReplacementPlugin(),

    new ExtractTextPlugin("styles/app.css"),

    new webpack.DefinePlugin({ 'env':'"dev"' }),

]);

export default webpackConfig;