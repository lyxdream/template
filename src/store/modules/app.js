import {
  getScene,
  getPhoneSystemInfo
} from '@/utils/app'

export default {
  namespaced: true,
  state: {
    systemInfo: {}, // 设备信息
    isIOS: false, // 是否是ios
    isIOSFullScreen: false, // 是否是ios全面屏
    scene: '', // 当前小程序场景值
    windowHeight: '', // 设备高度
    windowWidth: '' // 设备宽度
  },
  mutations: {
    // 获取当前小程序场景值
    GET_APP_SCENE (state, payload) {
      state.scene = payload
    },
    // 获取当前手机型号以及是否是iOS全面屏
    GET_PHONE_SYSTEN_INFO (state, payload) {
      state.systemInfo = payload.systemInfo
      state.isIOS = payload.isIOS
      state.isIOSFullScreen = payload.isIOSFullScreen
      state.windowHeight = payload.windowHeight
      state.windowWidth = payload.windowWidth
    }
  },
  getters: {},
  actions: {
    // 获取当前小程序场景值
    async getAppScene ({ commit }) {
      const scene = getScene()
      commit('GET_APP_SCENE', scene)
    },
    // 获取当前手机型号以及是否是iOS全面屏
    async getPhoneSystemInfo ({ commit }) {
      const phonesystemInfo = getPhoneSystemInfo()
      commit('GET_PHONE_SYSTEN_INFO', phonesystemInfo)
    }
  }
}
