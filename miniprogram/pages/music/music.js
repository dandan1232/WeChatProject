// pages/music/music.js
const MAX_LIMIT = 15
// const db = wx.cloud.database()
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [{
      url: 'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/9Ayx-EeCnuLRWKTcIhGB6g==/109951165664742856.jpg?imageView&quality=89'
    }],
    placeholder: '         搜索歌曲',
    // imgUrls: [],
    playlist: [],
    statusBarHeight: 0,
    opacity: 0,
    // playlist:[{
    //   "id":"1001",
    //   "playCount":1.4641238e+06,
    //   "name":"2021·心里装着鲜花银河星光和我爱的人",
    //   "picUrl":"http://p1.music.126.net/O8LkkfC7PtV7TA4UP693XA==/109951164569667332.jpg?param=140y140"
    // },
    // {
    //   "id":"1002",
    //   "playCount":87656.4,
    //   "name":"【翻/原】温柔不是我说 而是你觉得.",
    //   "picUrl":"http://p1.music.126.net/PJylNWy_2-jI7LRgQ2Cm6w==/109951165649129522.jpg?param=140y140"
    // },
    // {
    //   "id":"1003",
    //   "playCount":1.785097e+06,
    //   "name":"和林同学说晚安",
    //   "picUrl":"http://p3.music.126.net/v_-wonc6yEl9UVa-aPNOSQ==/109951165350855516.jpg?param=140y140"
    // },
    // {
    //   "id":"1004",
    //   "playCount":475,
    //   "name":"刘大壮/是你的垚/王泽科/王巨星/王小帅",
    //   "picUrl":"https://p2.music.126.net/flrqQ9juQtMqqCQIpLMU7w==/109951163576714902.jpg?param=140y140"
    // },
    // {
    //   "id":"1005",
    //   "playCount":1.06749088e+08,
    //   "name":"什么“游戏运营节奏”拿捏了",
    //   "picUrl":"http://p4.music.126.net/8sdYwsOfLA_3ciiuVHo0rQ==/109951165498690725.jpg?param=140y140"
    // },
    // {
    //   "id":"1006",
    //   "playCount":1.5742008e+06,
    //   "name":"你一定要在自己热爱的世界里闪闪发亮啊",
    //   "picUrl":"http://p3.music.126.net/uesfHcJmZ23S3er_1mpeaw==/109951165621856219.jpg?param=140y140"
    // }],
    // songlist:[{
    //   "id":"①",
    //   "name":"天外来物",
    //   "from":"薛之谦-《天外来物》"
    // },
    // {
    //   "id":"②",
    //   "name":"迟迟",
    //   "from":"薛之谦-《天外来物》"
    // },
    // {
    //   "id":"③",
    //   "name":"刚刚好",
    //   "from":"薛之谦-《初学者》"
    // },
    // {
    //   "id":"④",
    //   "name":"认真的雪",
    //   "from":"薛之谦-《未完成的歌》"
    // }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this._getPlaylist()

  // },
  onLoad() {
    let rect = app.globalData.sysInfo.rect
    console.log(JSON.stringify(rect))
    this.setData({
      statusBarHeight: app.globalData.sysInfo.statusBarHeight,
    })
    console.log(this.data.statusBarHeight)
    this._getPlaylist()
    this._getSwiper
  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop
    // console.log(scrollTop)
    let _opacity = (scrollTop / 100 > 1) ? 1 : scrollTop / 100
    // console.log(_opacity)
    this.setData({
      opacity: _opacity
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlaylist()
    this._getSwiper()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._getPlaylist()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },

  _getPlaylist() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.playlist.length,
        count: MAX_LIMIT,
        $url: 'playlist',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        playlist: this.data.playlist.concat(res.result.data)
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  },
})