import formatTime from '../../utils/formatTime.js'
const app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blog:{}, //博客对象
    commentList:[], //博客的评论列表
    blogId:'', //博客id
    statusBarHeight:app.globalData.sysInfo.statusBarHeight,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.statusBarHeight)
    console.log(options)
    this.setData({
      blogId:options.blogId
    })
    this._getBlogDetail()
  },
  _getBlogDetail(){
    wx.showLoading({
      title: '加载中',
      mask:true,
    })
    //请求云函数博客详情数据
    wx.cloud.callFunction({
      name:'blog',
      data:{
        blogId:this.data.blogId,
        $url:'detail',
      }
    }).then((res)=>{
      console.log(res)
      //取出博客对象（注意仔细观察res.result,进行解析）
      const blog=res.result.list[0]
      let commentList=blog.commentList
      //格式化每条评论的时间
      for(let i=0,len=commentList.length;i<len;i++){
        commentList[i].creatTime=formatTime(new Date(commentList[i].creatTime))
      }
      this.setData({
        commentList,
        blog,
      })
      wx.hideLoading()
    })
  }
})