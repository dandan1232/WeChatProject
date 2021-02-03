// pages/musiclist/musiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //歌曲列表
    musiclist: [],
    //歌单信息（只获取了封面图和歌单名称）
    listInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        playlistId: options.playlistId,
        $url: 'musiclist'
      }
    }).then((res) => {
      console.log(res)
      console.log(res.result)
      const pl = res.result.playlist
      this.setData({
        musiclist: pl.tracks,
        listInfo: {
          coverImgUrl: pl.coverImgUrl,
          name: pl.name,
        }
      })
      this._setMusiclist()
      wx.hideLoading()
    })
  },
  _setMusiclist() {
    //将本歌单的歌曲列表存入本地存储
    wx.setStorageSync('musiclist', this.data.musiclist)
  },
  
  //返回上一级方法、转跳
  tovoucher: function (options) {
    wx.navigateBack()
  },

  onPageScroll(e) { //监听距离顶部的距离
    const scrollTop = e.scrollTop
    let opac = 1
    if (scrollTop < 185) {
      if (scrollTop < 100) {
        opac = 1
      }
      else if (scrollTop < 120) {
        opac = 0.8
      } else if (scrollTop < 140) {
        opac = 0.6
      } else if (scrollTop < 160) {
        opac = 0.4
      } else if (scrollTop < 180) {
        opac = 0.2
      }
      this.setData({
        isTop: true,
        navOpacity: opac
      })
    } else {
      this.setData({
        isTop: false,
        navOpacity: 1
      })
    }
  },

})