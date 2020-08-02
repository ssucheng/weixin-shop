// pages/category/category.js
import {
  getCategoryApi
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftCateList: [], //左侧数据
    rigtCatgeList: [], //右侧数据
    countIndex: 0,
    scrollTop:0
  },
  cateList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1判断下有没数据
    // 2没有数据就发送请求
    // 3有数据判断下存入的时间如果超过规定的时间重新请求
    
    const CateList = wx.getStorageSync('cateList')
    if (!CateList) {
      this.getCategory(()=>{
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
      })
    } else {
      // 用于场景 重新进入小程序如果没有超过这个时间 就不会请求
      //30分钟
      if (Date.now() - CateList.time > 1000 * 60 * 30 ) {
        this.getCategory(()=>{
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
        })
      } else {
        // 没有过期的旧数据的使用
        this.cateList = CateList.data
        let leftCateList = this.cateList.map(v => v.cat_name)
        let rigtCatgeList = this.cateList[0].children
        this.setData({
          leftCateList,
          rigtCatgeList
        })
      }

    }
  },
  async getCategory(callback) {
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    const {
      data: res
    } = await getCategoryApi('categories')
    this.cateList = res.message
    if(res.meta.status !== 200 ) return wx.showToast({
      title: '请求分类数据失败',
      icon: 'none' 
    })
    //{} 不加就是默认return  加了得自己加关键字return
    // 将数据存在本地的存储中
    wx.setStorageSync('cateList', {
      time: Date.now(),
      data: this.cateList
    });
    let leftCateList = this.cateList.map(v => v.cat_name)
    let rigtCatgeList = this.cateList[0].children
    this.setData({
      leftCateList,
      rigtCatgeList
    })
    callback && callback()
    // debugger
  },
  handItemTap(e) {
    const {
      index: countIndex
    } = e.target.dataset
    let rigtCatgeList = this.cateList[countIndex].children
    let scrollTop = 0
    this.setData({
      countIndex,
      rigtCatgeList,
      scrollTop
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
      // console.log('onshow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      // console.log('onhide')
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})