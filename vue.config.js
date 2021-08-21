
// 在vue-config.js 中加入
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

// vue-config.js 文件
module.exports = {
    chainWebpack: config => {
        // 生产模式
        config.when(process.env.NODE_ENV === 'production', config => {
            // 生产模式加载 main-prod 入口文件
            config.entry('app').clear().add('./src/main-prod.js')
            // CDN - externals
            config.set('externals', {
            vue: 'Vue',
            axios: 'axios',
            'element-ui': 'ELEMENT'
            })
            // 首页自定义，添加一个变量来控制html模版，是否加载cdn资源。
            config.plugin('html').tap(args => {
            args[0].isProd = true
            return args
            })
        })
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            // 开发模式加载 main-dev 入口文件
            config.entry('app').clear().add('./src/main-dev.js')
            // 首页自定义
            config.plugin('html').tap(args => {
            args[0].isProd = false
            return args
            })
        })
    },
    // 配置webpack
    configureWebpack: config => {
        
        if (isProduction) {
            // 开启gzip压缩
            config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.html$|\.json$|\.css/,
            threshold: 10240,
            minRatio: 0.8
            }))
            // 开启分离js
            config.optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name (module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            }
        }
    },
    
      
  
    assetsDir: "static",
    // 修改的配置
    devServer: {
        proxy: {
            '/api': {
                target: 'http://47.100.10.8:5002',
                pathRewrite: {
                  '^/api': '/api/'
                }
              },
              "/chat": {
                target: "http://47.100.10.8:4001",
                pathRewrite: {
                  '^/chat': '/chat/'
                }
            },
            "/nlp": {
                target: "http://127.0.0.1:5555/",
                // target: "http://47.100.10.8:8888",
                pathRewrite: {
                    '^/nlp': ''
                },
                changeOrigin: true,
            }
        }
    },
    
}