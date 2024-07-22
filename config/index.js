const path = require('path')
const $OSS_HOST = '"@todo"'
const config = {
  projectName: 'taro3-vue2',
  date: '2024-6-27',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
    $OSS_HOST
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  },
  sass: {
    // sass 全局变量 https:nervjs.github.io/taro-docs/docs/config-detail
    resource: ['src/styles/_entry.scss'],
    projectDirectory: path.resolve(__dirname, '..'),
    data: `$OSS_HOST:${$OSS_HOST};` // sass 全局变量
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
    webpackChain () {
    }
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
