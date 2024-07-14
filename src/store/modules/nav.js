import Taro from '@tarojs/taro'
/**
 * @description: 获取顶部胶囊位置信息，如果获取异常则尝试重复获取
 */
export async function getMenuButtonBoundingClientRect () {
  return new Promise((resolve) => {
    const timeId = setInterval(() => {
      try {
        const info = Taro.getMenuButtonBoundingClientRect()
        const keyArr = Object.keys(info)
        const usable = keyArr.some(key => {
          return info[key] === 0
        })
        if (!usable) {
          clearInterval(timeId)
          resolve(info)
        }
      } catch (error) {
        console.log(error)
      }
    }, 300)
  })
}
export default {
  namespaced: true,
  state: {
    customNavInfo: {} // 自定义nav信息
  },
  getters: {
    navbarHeight (state) {
      return state.customNavInfo.navbarHeight || 0
    },
    navbarTitleHeight (state) {
      return state.customNavInfo.titleHeight || 0
    },
    navbarPaddingTop (state, getters) {
      return getters.navbarHeight - getters.navbarTitleHeight
    }
  },
  mutations: {
    SET_NAV_INFO (state, payload) {
      state.customNavInfo = payload
    }
  },
  actions: {
    async getNavInfo ({ commit }) {
      let customNavInfo = Taro.getStorageSync('customNavInfo')
      if (customNavInfo) {
        commit('SET_NAV_INFO', customNavInfo)
      } else {
        const clientRect = await getMenuButtonBoundingClientRect() // 胶囊位置信息
        const systemInfo = Taro.getsystemInfoSync()
        const statusBarHeight = systemInfo.statusBarHeight // 状态栏高度
        const computedClientRect = {
          // 胶囊实际位置，坐标信息不是左上角原点
          height: clientRect.height,
          width: clientRect.width,
          top: clientRect.top - statusBarHeight,
          bottom: clientRect.bottom - clientRect.height - statusBarHeight,
          right: systemInfo.windowWidth - clientRect.right
        }
        customNavInfo = {
          clientRect,
          statusBarHeight,
          titleHeight: computedClientRect.height + computedClientRect.top + computedClientRect.bottom,
          navbarHeight: clientRect.bottom + computedClientRect.bottom,
          navbarBtn: computedClientRect,
          navbarBoxHeight: (clientRect.bottom + computedClientRect.bottom + computedClientRect.bottom) / 2
        }
        commit('SET_NAV_INFO', customNavInfo)
        Taro.setStorageSync('customNavInfo', customNavInfo)
      }
    }
  }
}
