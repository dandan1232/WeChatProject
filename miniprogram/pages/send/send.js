// pages/send/send.js
Component({
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
    
    if(content.trim()===''){
      wx.showModal({
        title: '请输入内容',
        content:'',
      })
      return
    }
  },

  wx.showLoading({
    title: '发布中',
    mask:true, //带遮罩的加载动画
  }),
})
