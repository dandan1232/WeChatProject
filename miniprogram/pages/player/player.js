let musiclist = []
//正在播放的歌曲index
let playingIndex = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options.musicId, typeof (options.musicId))  //可查看id类型
    playingIndex = options.index
    musiclist = wx.getStorageSync('musiclist')
    this._loadMusicDetail(options.musicId)
  },

  _loadMusicDetail(musicId) {
    let music = musiclist[playingIndex]
    console.log(music)
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
    }).then((res) => {
      console.log(res)
    })
  }
})