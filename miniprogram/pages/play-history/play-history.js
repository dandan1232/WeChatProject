// pages/play-history/play-history.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musiclist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 取出本地存储key为openid的数据（播放历史）
    const playHistory = wx.getStorageSync(app.globalData.openid)
    if (playHistory.length == 0) {
      wx.showModal({
        title: '播放历史为空',
        content: '',
      })
    } else {
      // storage里面存储的musiclst替换成播放历史的歌单
      wx.setStorage({
        key: 'musiclist',
        data: playHistory,
      })
      this.setData({
        musiclist: playHistory
      })
    }
  },
  
})