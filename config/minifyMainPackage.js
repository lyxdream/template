const TerserPlugin = require('terser-webpack-plugin')

module.exports = (ctx) => {
  ctx.modifyWebpackChain(args => {
    const chain = args.chain
    const minimizers = chain.optimization.get('minimizer') || []
    // 检查是否已存在TerserPlugin实例，避免重复添加
    const hasTerser = minimizers.some(minimizer => {
      return minimizer.constructor.name === 'TerserPlugin'
    })
    //没有则创建
    if(!hasTerser){
      chain.optimization.minimize(true)
      chain.merge({
        optimization: {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              test: /\.(?:[js]sx?|mjs)$/, // 一般匹配JavaScript和JSX文件，根据需要调整
              parallel: true,
              minify: TerserPlugin.swcMinify,
              cache: true,
              extractComments: true,
              sourceMap: true,
              terserOptions: {
                parse: {
                  ecma: 8,
                },
                compress: {
                  ecma: 5,
                  warnings: false,
                  arrows: false,
                  collapse_vars: false,
                  comparisons: false,
                  computed_props: false,
                  hoist_funs: false,
                  hoist_props: false,
                  hoist_vars: false,
                  inline: false,
                  loops: false,
                  negate_iife: false,
                  properties: false,
                  reduce_funcs: false,
                  reduce_vars: false,
                  switches: false,
                  toplevel: false,
                  typeofs: false,
                  booleans: true,
                  if_return: true,
                  sequences: true,
                  unused: true,
                  conditionals: true,
                  dead_code: true,
                  evaluate: true,
                },
                output: {
                  ecma: 5,
                  comments: false,
                  ascii_only: true,
                },
              },
            }),
          ],
        },
      })
    }
  })
}




