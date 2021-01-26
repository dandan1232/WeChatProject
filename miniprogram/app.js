//app.js
App({
  onLaunch: function () {
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
    this.globalData = {}
  },
  
  onShow(options){
    console.log('onShow 执行')
    console.log(options)
  }
})
