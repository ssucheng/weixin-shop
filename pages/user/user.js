// pages/user/user.js
import {showModal} from '../../api/util/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const userinfo = wx.getStorageSync("userInfo") || {}
    this.setData({
      userinfo
    })
  },
  async handleOutLogin(){
    const {confirm:res} = await showModal('是否退出登录')
    if(!res) return false
    let userinfo = ''
    this.setData({
      userinfo
    })
    wx.setStorageSync('userInfo',userinfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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