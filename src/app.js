// import Vue from 'vue'
import store from '@/store'

import './app.scss'

// Vue.config.productionTip = false

const App = {
  store,
  onShow () {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}
// 获取小程序当前场景值
store.dispatch('app/getAppScene')

// 获取当前手机型号以及是否是iOS全面屏
store.dispatch('app/getPhoneSystemInfo')

// 获取顶部胶囊信息
store.dispatch('nav/getNavInfo')

export default App
