const moment= require('moment')

let musiclist = []
//正在播放的歌曲index
let playingIndex = 0
const backgroundAudioManager=wx.getBackgroundAudioManager()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picUrl: '',
    isPlaying:false, //音乐是否播放
    currentTime:'00:00', //实时时间
    durationTime:'04:21', //总时长
    currentWidth:0,//实时进度条的宽度
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
      picUrl: music.al.picUrl,
    })
    // let songData =  request('/song/detail',{ids:musicId});
    // let durationTime=moment(songData.songs[0].dt).format('mm:ss')
    // this.setData({
    //   song:songData.song[0],
    //   durationTime
    // })


    wx.cloud.callFunction({
      name: 'music',
      data: {
        musicId,
        $url: 'musicUrl'
      }
      
    }).then((res) => {
      console.log(res)
      const url =res.result.data[0].url
      if(url === null){
        wx.showToast({
          title: '没有权限播放'
        })
        backgroundAudioManager.pause()
        this.setData({
          isPlaying:false
        })
        return
      }
      backgroundAudioManager.src=url
      backgroundAudioManager.title =music.name
      backgroundAudioManager.coverImgUrl=music.al.picUrl
      backgroundAudioManager.singer=music.ar[0].name
      this.setData({
        isPlaying:true
      })
      wx.hideLoading()
    })
  },
  togglePlaying(){
    if(this.data.isPlaying){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying:!this.data.isPlaying
    })
  },
  onPrev(){
    playingIndex--
    if(playingIndex < 0){
      playingIndex = musiclist.length - 1
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },
  onNext(){
    playingIndex++
    if(playingIndex === musiclist.length){
      playingIndex = 0
    }
    this._loadMusicDetail(musiclist[playingIndex].id)
  },

//  this.backgroundAudioManager.onTimeUpdate(()=>{
//    let currenTime = moment(this.backgroundAudioManager.currentTime *1000).format('mm:ss')
    
//  })


})

