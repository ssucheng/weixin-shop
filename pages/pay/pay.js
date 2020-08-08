// pages/cart/cart.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showToast
} from '../../api/util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allPrice:0,
    allNum:0,
    allCollect:true
  },
  onShow: function () {
    // 获取地址信息
    let address = wx.getStorageSync("address") || {}
    // 获取购物车数据
    let cart = wx.getStorageSync("carList") || []
    const cart1 = cart.filter((v)=> v.checked)
    this.setData({
      address
    })
    this.setDataStr(cart1)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  handlItemChange(e){
    let {index} = e.currentTarget.dataset
    let {cart}  = this.data
    cart.forEach((v)=> {
      if(index === v.goods_id){
        v.checked= !v.checked
      }
    })
    this.setDataStr(cart)
  },
  // 设置cart 到内存和缓存中
  setDataStr(cart){
    let allNum = 0
    let allPrice = 0
    let allCollect = true
      // 只有选中的才算钱 和数量
     cart.forEach(v => {
       if(!v.checked){
           allCollect = false
       }else{
         
        allNum += v.num
        allPrice += v.goods_price * v.num
       }
      
    })
    // 空数组无法进行循环遍历所以 会影响allCollect的值 
    allCollect = cart.length === 0?false:allCollect
    this.setData({
      cart,
      allNum,
      allPrice,
      allCollect
    })
    wx.setStorageSync('carList',cart)
  },
  handlePays(){
    // 暂无支付接口
    showToast("暂无支付接口")
  },
 
  
  onLoad: function (options) {

  },
  
  async btn() {
    // 1 获取用户的收货地址
    // 1 绑定点击事件
    // 2 调用小程序内置 api 获取用户的收货地址 wx.chooseAddress

    // 2 获取 用户 对小程序 所授予 获取地址的 权限 状态 scope     wx.getSetting
    // 1 假设 用户 点击获取收货地址的提示框 确定 authSetting scope.address
    // scope 值 true 直接调用 获取收货地址
    // 2 假设 用户 从来没有调用过 收货地址的api
    // scope undefined 直接调用 获取收货地址
    // 3 假设 用户 点击获取收货地址的提示框 取消
    // scope 值 false
    // 1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候
    // 2 获取收货地址
    // 4 把获取到的收货地址 存入到 本地存储中

    // 版本一：
    // wx.getSetting({
    //   success: (result)=>{
    //     console.log(result)
    //     const status = result.authSetting['scope.address']
    //     // 1 如果为true  or undefined 就获取地址
    //     if( status === true || status === undefined) {
    //       wx.chooseAddress({
    //         success: (result)=>{
    //           console.log(result)
    //         }
    //       })
    //     } else{
    //       // 2 否则获取权限
    //       wx.openSetting({
    //         success: (result2)=>{
    //           wx.chooseAddress({
    //             success: (result3)=>{
    //                 console.log(result3)
    //             }

    //           })
    //         },
    //         fail: (err)=>{console.log(err)},
    //         complete: ()=>{}
    //       })
    //     }
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // })
    //  版本二：
    // wx.getSetting({
    //     success: (result)=>{
    //       console.log(result)
    //       const status = result.authSetting['scope.address']
    //       // 1 如果为false 获取权限
    //       if( status === false) {
    //         wx.openSetting({
    //           success: (result2)=>{
    //             wx.chooseAddress({
    //               success: (result3)=>{
    //                   console.log(result3)
    //               }

    //             })
    //           },
    //           fail: (err)=>{console.log(err)},
    //           complete: ()=>{}
    //         })

    //       } 
    //     },
    //     fail: ()=>{},
    //     complete: ()=>{}
    //   })
    //   wx.chooseAddress({
    //     success: (result)=>{
    //       console.log(result)
    //     }
    //   })
    try {
      let res = await getSetting()
      let status = res.authSetting['scope.address']
      if (status === false) {
        openSetting()
      }
      let address = await chooseAddress()
      // 给address 添加个all属性用于显示信息
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 添加到本地缓存中
      wx.setStorageSync('address', address);
    } catch (err) {
      // console.log(err)
    }
  },
  handlChange(){
    // console.log(1)
    this.btn()
    
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