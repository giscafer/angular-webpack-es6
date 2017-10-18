import path from 'path';
const basePath = path.join(__dirname, '../');
export default {
    /**
     * 端口
     */
    serverPort: 4000,
    /**
     * 路径地址
     */
    paths: {
        src: path.join(basePath, 'src'),
        dist: path.join(basePath, 'dist')
    },
    /**
     * Webpack 配置
     */
    webpack: {
        entry: [
            'babel-polyfill', path.join(basePath, 'src/main.js'),
        ]
    }
};
