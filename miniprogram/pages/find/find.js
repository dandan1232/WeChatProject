let keyword = ''
Page({
  data: {
    //控制底部弹出层是否显示
    modalShow: false,
    //博客数组
    blogList: [],
  },
  getDetail(event){
    wx.navigateTo({
      url: '../../pages/blog-detail/blog-detail?blogId='+event.target.dataset.blogid,
    })
  },
  onSearch(event) {
    console.log(event.detail.keyword)
    this.setData({
      blogList:[]
    })
    keyword = event.detail.keyword
    // console.log(keyword)
    this._loadBlogList(0)
  },
  onLoad(options) {
    this._loadBlogList()
  },
  onPublish() {
    wx.getSetting({
      success: (res) => {
        console.log('当前设置' + JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'en',
            success: (res) => {
              console.log(res)
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            modalShow: true,
          })
        }
      }
    })
  },
  onLoginSuccess(event) {
    console.log(event)
    const detail = event.detail
    console.log(detail.nickName)
    wx.navigateTo({
      url: `../publish/publish?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },
  onLoginFail() {
    wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)
  },

  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '数据加载中',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        start,
        count: 10,
        $url: 'list',
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  onLoad(options) { },
})