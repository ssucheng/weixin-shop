// pages/goods_detail/goods_detail.js
import {getGoodsDetailApi} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:500,
    circular:true,
    goodsDetailList:{}
  },
  params:{
    goods_id:0
  },
  // 商品详情对象
  goodsObj:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.params.goods_id = options.goods_id
    this.getGoodsDetail()
  },
  async getGoodsDetail(){
    const {data:res} = await getGoodsDetailApi('goods/detail',this.params)
    if(res.meta.status !== 200) return wx.showToast({
      title: '获取详情页失败',
      icon: 'none',
    })
    // 商品详情对象
    this.goodsObj = res.message
    let goodsDetailList = {
      pics:res.message.pics,
      goods_price:res.message.goods_price,
      goods_name:res.message.goods_name,
      // 注意返回的富文本如何图片是wepb格式的 iphone 部分机型不识别
      // goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg'),
      // 上述的解决方案仅仅是保证https上边有jpg的文件如果没有 就得和后台沟通了
      goods_introduce:res.message.goods_introduce
    }
    this.setData({
      goodsDetailList
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