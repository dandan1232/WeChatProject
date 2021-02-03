// navbar/navbar.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */


  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  attached() {
    var _this = this;
    var rect = wx.getMenuButtonBoundingClientRect();
    this.setData({
      rectHight: rect.height + 'px'
    })

    wx.getSystemInfo({
      success: function success(res) {
        console.log(res)
        //search方法找ios字段，如果没找到返回-1，找到了返回0，所以我们还要加上1，通过两次取反获取到boolean值
        var ios = !!(res.system.toLowerCase().search('ios') + 1);
        var statusBarHeight = res.statusBarHeight;
        //获取整个顶部导航栏的高度
        var topBarHeight = ios ? (44 + statusBarHeight) : (48 + statusBarHeight);
        //这里的wx.getMenuButtonBoundingClientRect()是获取胶囊的位置尺寸信息的哦，还记得嘛！
        var innerWidth = wx.getMenuButtonBoundingClientRect().left
        //距离右边的距离就是整个屏幕宽度-innerWidth，很好理解哦，这里的res是刚刚wx:getSystemInfo里的success函数的回调，还记得嘛！
        var innerPaddingRight = res.windowWidth - innerWidth
        //这里的_this在wx.getSystemInfo外边声明下var _this=this   不然会有作用域问题
        _this.setData({
          ios: ios,
          topBarHeight: topBarHeight,
          statusBarHeight: statusBarHeight,
          innerWidth: 'width:' + innerWidth + 'px',
          innerPaddingRight: 'padding-right:' + innerPaddingRight + 'px',
          contentWidth: innerWidth / 2 + 'px'//这个是中间内容的宽度（search/text）       
        })
      },
    })
  }
})
