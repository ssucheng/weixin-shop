// pages/login/login.js
import {switchTab,getSetting,openSetting} from '../../api/util/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    
  },
  
  async handleLogin(e){
    const {userInfo} = e.detail
  // const  {authSetting:res} =  await getSetting()
  //   if(res['scope.userInfo']  === true){
  //     return wx.getUserInfo({
  //       withCredentials: 'false',
  //       lang: 'zh_CN',
  //       timeout:10000,
  //       success: (result)=>{
          
  //       },
  //       fail: ()=>{},
  //       complete: ()=>{}
  //     });
  //   }
    wx.setStorageSync('userInfo', userInfo);
    // if(userInfo) return switchTab('/pages/user/user')
    switchTab('/pages/user/user')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  

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