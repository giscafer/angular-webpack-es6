import webpack from 'webpack';
import config from './config';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
var es3ifyPlugin = require('es3ify-webpack-plugin');

const BASE64_LIMIT = 2048;
const srcPath = config.paths.src;

export default {
    entry: {},
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }, {
                test: /\.js$/,
                exclude: [/node_modules/, path.resolve(__dirname, './src/pages/test')],
                loader: 'babel',
                query: {
                    "presets": ["es2015", "stage-0"],
                    "plugins": [
                        "transform-runtime",
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals",
                        "transform-es2015-classes",
                        "transform-proto-to-assign"
                    ]
                },
                // loaders: ['ng-annotate', 'babel?presets[]=es2015,presets[]=stage-0,plugins[]=transform-es3-property-literals,plugins[]=transform-es3-member-expression-literals']
                // loader: combineLoaders([
                //     {
                //         loader: 'ng-annotate!babel',
                //         query: {
                //             "presets": ["es2015", "stage-0"],
                //             "plugins": [
                //                 "transform-es3-property-literals",
                //                 "transform-es3-member-expression-literals",
                //                 "transform-es2015-classes",
                //                 "transform-proto-to-assign"
                //             ]
                //         },
                //     }
                // ])
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
        new es3ifyPlugin(),
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
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf(srcPath) === -1;
            }
        }),

        /**
         *
         */
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     "window.jQuery": "jquery"
        // })
    ]
};
