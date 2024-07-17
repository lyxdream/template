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
/**
 * @description 获取当前小程序进入的场景值
 */
export const getScene = () => {
  const scene = Taro.getLaunchOptionsSync()
  return scene.scene
}

/**
 * @description 获取手机型号以及是否是iOS全面屏
 */
export const getPhoneSystemInfo = () => {
  let phoneSystemInfo = Taro.getStorageSync('phoneSystemInfo')
  if (!phoneSystemInfo) {
    let isIOSFullScreen = false
    let isIOS = false
    Taro.getSystemInfo({
      success: function (res) {
        const model = res.model
        if (res.system.indexOf('iOS') !== -1) {
          isIOS = true
          if (model.indexOf('11') !== -1 || model.indexOf('X') !== -1 || model.indexOf('12') !== -1) {
            isIOSFullScreen = true
          }
        }
        phoneSystemInfo = {
          systemInfo: res,
          isIOSFullScreen,
          isIOS,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        }
      }
    })
    Taro.setStorageSync('phoneSystemInfo', phoneSystemInfo)
  }
  return phoneSystemInfo
}

/**
 * @description: 检查小程序更新
 */
export const updateApp = () => {
  if (Taro.canIUse('getUpdateManager')) {
    const update = Taro.getUpdateManager()
    if (!update) return false
    update.onCheckForUpdate((res) => {
      // 检测是否有新版本
      if (res.hasUpdate) {
        update.onUpdateReady(() => {
          // 如果有新版本，给用户提示确认更新即可
          Taro.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启，如果想静默更新，直接在检测有新版本的时候调用此方法即可
                update.applyUpdate()
              }
            }
          })
        })
        update.onUpdateFailed(() => {
          Taro.showModal({
            title: '已经有新版本了',
            content: '新版本已经上线，请删除当前小程序，重新打开。'
          })
        })
      }
    })
  } else {
    console.log('当前版本不支持getUpdateManager')
  }
}

/**
 * 网络异常处理
 */
export const checkNetwork = (fn) => {
  Taro.getNetworkType({
    success (res) {
      const networkType = res.networkType
      if (typeof fn === 'function') return fn(networkType)
      if (networkType === 'none') {
        Taro.navigateTo({ url: '/pages/no-network/index' })
      }
    }
  })
}

/**
 * @description 获取当前页url
 */
export const getCurrentPageRoute = () => {
  const pages = Taro.getCurrentPages()
  let currentPageRoute = ''
  if (pages[pages.length - 1]) {
    currentPageRoute = pages[pages.length - 1].route
  }
  return currentPageRoute
}
