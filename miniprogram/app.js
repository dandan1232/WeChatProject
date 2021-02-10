//app.js
App({
  onLaunch: function (options) {
    // console.log('onLaunch 执行')
    // console.log(options)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        env: 'waitu1232-5g8lqyx0ae8251d7',
        traceUser: true,
      })
    }
    this.getOpenid()

    this.globalData = {
      sysInfo: this.getSysInfo(),
      openid: -1,
    }
  },
  getOpenid() {
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      const openid = res.result.openid
      this.globalData.openid = openid
      if (wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, [])
      }
    })
  },

  getSysInfo: function () {
    //获得系统信息
    let systemInfo = wx.getSystemInfoSync()
    //计算px转换到rpx的比列
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    //状态栏的高度px
    let statusBarHeight = systemInfo.statusBarHeight
    ////////
    //胶囊按钮信息
    let rect = wx.getMenuButtonBoundingClientRect()
    const sysInFo = {
      pxToRpxScale,
      statusBarHeight,
      rect
    }
    return sysInFo
  },

  onShow(options) {
    console.log('onShow 执行')
    console.log(options)
  }

})
