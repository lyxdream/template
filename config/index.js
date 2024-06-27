const path = require('path')
const config = {
  projectName: 'temp5',
  date: '2024-6-27',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/styles/_entry.scss')
    ]
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue',
  compiler: 'webpack4',
  mini: {
    optimizeMainPackage: { 
      enable: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain (chain) {
      chain.merge({
        plugin: {
          install: {
              // 解决包体积过大无法进行预览的问题
            plugin: require('terser-webpack-plugin'),
            args: [
              {
                terserOptions: {
                  compress: true, // 默认使用terser压缩
                  keep_classnames: true, // 不改变class名称
                  keep_fnames: true // 不改变函数名称
                }
              }
            ]
          }
        }
      })
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
