let keyword=''//搜索关键字
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制底部弹出层是否显示
    modalShow:false,
  },
  onSearch(event){
    keyword=event.detail.keyword
    console.log(keyword)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
  },
  onPublish(){
    // 获取用户的当前设置，返回值中只会出现小程序已经向用户请求过的权限，
    // 根据是否具有scope.userInfo属性，判断用户是都授权
    wx.getSetting({
      success:(res)=>{
        console.log('当前设置'+JSON.stringify(res))
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:(res)=>{
              console.log(res)
              this.onLoaginSuccess({
                detail:res.userInfo
              })
            }
          })
        }else{
          this.setData({
            modalShow:true,
          })
        }
      }
    })
  },
  onLoaginSuccess(event){
    console.log('>>>>>>'+event)
    const detail=event.detail
    console.log(detail.nickName)
    wx.navigateTo({
      url: '../publish/publish',
    })
  },
  onLoginFail(){
    wx.showModal({
      title: '授权用户才能发布',
      content:'',
    })
  },
})