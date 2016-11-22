import webpack from 'webpack';
import config from './config';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const BASE64_LIMIT = 2048;
const srcPath = config.paths.src;

export default {
    entry: {},
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/, path.resolve(__dirname, './src/pages/test')],
            loader: 'ng-annotate!babel'
        }, {
            test: /\.html$/,
            exclude: /index.html/,
            loader: 'ngtemplate?relativeTo=' + srcPath + '/!html?attrs=false'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: "url-loader?name=images/[name]_[hash:8].[ext]&limit=" + BASE64_LIMIT
        }]
    },
    resolveLoader: {
        noParse: []
    },
    plugins: [
        /**
         * 将webpack打包后的js插入html中
         */
        new HtmlWebpackPlugin({
            template: srcPath + '/index.html',
            inject: 'body',
            hash: true
        }),

        /**
         * 合并公用代码
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(srcPath) === -1;
            }
        }),

        /**
         *
         */
        new webpack.ProvidePlugin({
            $: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
