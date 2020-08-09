// pages/cart/cart.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
  navigateTo
} from '../../api/util/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttonClicked:true,
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
    this.setData({
      address
    })
    this.setDataStr(cart)
    
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
  // 单个操作数量处理函数
  async handleItemEdit(e){
    const {edit,id} = e.currentTarget.dataset
    // console.log(edit,id)
    let {cart} = this.data
    let index = cart.findIndex(v =>  v.goods_id === id)
      // 如果商品数量为1并且点击的是 减号
    if(cart[index].num === 1 && edit === -1){
     this.buttonClicked(this)
     let res = await showModal('确定删除商品')
     if(!res.confirm) return false
     cart.splice(index,1)
    }else{
      cart[index].num += edit
    }
    this.setDataStr(cart)
    
   
  },
   buttonClicked(self) {
    self.setData({
      buttonClicked: false
    })
    setTimeout(function () {
      self.setData({
        buttonClicked: true
      })
    }, 500)
  },
  handleAllSelect(){
    // 点击全选
    let {cart,allCollect}  = this.data
    allCollect = !allCollect
    cart.forEach(v=> v.checked = allCollect)
    this.setDataStr(cart)

  },
  // 结算
  handlePay(){
    if(!this.data.address.userName){
      return showToast('购物车地址未填写')
    }else if(!this.data.cart.length){
      return showToast('未添加商品')
    }
    navigateTo('/pages/pay/pay')
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
    this.buttonClicked(this)
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