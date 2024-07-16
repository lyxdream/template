<template>
  <view class="no-network">
    <view class="no-network__title">
      网络异常
    </view>
    <view class="no-network__text">
      请确认网络正常后，再次刷新试试
    </view>
    <view class="no-network__btn" @tap="refresh">
      刷新
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { checkNetwork } from '@/utils/app'
export default {
  name: 'NoNetwork',
  created () {
    this.refresh()
  },
  methods: {
    checkNetwork,
    refresh(){
      this.checkNetwork((res) => {
        if (res !== 'none') {
          Taro.reLaunch({ url: '/pages/index/index' })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.no-network{
  text-align: center;
  padding-top:160px;
  &__title{
    font-size: 32px;
    color: #333333;
    margin-top:40px;
    font-weight: bold;
  }
  &__text{
    margin-top:8px;
    margin-bottom:40px;
    font-size: 24px;
    color: #999999;
  }
  &__btn{
    width:302px;
    height: 80px;
    border-radius: 40px;
    margin:0 auto;
  }
}
</style>
