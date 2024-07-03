const TerserPlugin = require('terser-webpack-plugin')

module.exports = (ctx) => {
  ctx.modifyWebpackChain((args) => {
    const chain = args.chain
    chain.optimization.delete('minimizer')
    // 确保最小化处理开启
    chain.optimization.minimize(true)
    // 获取现有的minimizer数组，以便在其中添加TerserPlugin
    const minimizers = chain.optimization.get('minimizer') || []
    console.log(minimizers,'==minimizers')

    // 检查是否已存在TerserPlugin实例，避免重复添加
    const hasTerser = minimizers.some(minimizer => {
      console.log(minimizer.constructor.name,'===minimizer.constructor.name')
      return minimizer.constructor.name === 'TerserPlugin'
    })
    console.log(hasTerser,'==hasTerser')
    if (!hasTerser) {
      // 如果TerserPlugin尚未添加，则创建一个新的实例并添加到minimizers数组
      minimizers.push(new TerserPlugin({
        // 指定要应用压缩的文件模式，这里通过正则表达式匹配文件名
        test: /\.(?:[js]sx?|mjs)$/, // 一般匹配JavaScript和JSX文件，根据需要调整
        parallel: true,
        terserOptions: {
          sourceMap: false, // 这里放置sourceMap选项
          compress: true
          // 根据需要调整其他的terser配置
        },
        // 如果需要针对特定文件进行优化，可以使用下面的配置来覆盖默认行为
        include: ['common.js', 'taro.js', 'vendors.js'] // 包含的文件列表
        // exclude: [], // 排除的文件列表
      }))
    }
    console.log(minimizers,'==minimizers')
    // 设置修改后的minimizer数组回chain.optimization
    chain.optimization.set('minimizer', minimizers)
  })
}
