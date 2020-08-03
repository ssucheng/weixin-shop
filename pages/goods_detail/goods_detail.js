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
    goodsDetailList:{},
    isCollect:false
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
    // 1获取收藏的数据
    let Collect = wx.getStorageSync('Collect') || [];
    // 2查询商品是否存在收藏的数据中
    let isCollect = Collect.some((v)=> v.goods_id === this.goodsObj.goods_id)
    // 3.存在就让isCollect 为true  不存在就false 
    let goodsDetailList = {
      pics:res.message.pics,
      goods_price:res.message.goods_price,
      goods_name:res.message.goods_name,
      // 注意返回的富文本如何图片是wepb格式的 iphone 部分机型不识别
      // goods_introduce: res.message.goods_introduce.replace(/\.webp/g, '.jpg'),
      // 上述的解决方案仅仅是保证https上边有jpg的文件如果没有 就得和后台沟通了
      goods_introduce:res.message.goods_introduce.replace(/\.webp/g, '.jpg')
    }
    this.setData({
      isCollect,
      goodsDetailList
    })
  },
  handlItemChange(e){
    // 点击查看图片预览
    const {index} = e.currentTarget.dataset
    const current = this.goodsObj.pics[index].pics_mid
    const urls = this.goodsObj.pics.map((item)=> item.pics_mid)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })

  },
  handlItemCar(){
    console.log(1)
      // 点击加入购物车，如果没有直接添加，如果存在就数量++
      let carList = wx.getStorageSync('carList') || []
      let index = carList.findIndex(v => v.goods_id === this.goodsObj.goods_id)
      if(index !== -1){
        // 已经有了
        carList[index].num ++
        wx.showToast({
          title: '添加成功0',
          icon: 'success',
        })
      }else{
        // 没有
        this.goodsObj.num = 1,
        this.goodsObj.checked = true
        carList.push(this.goodsObj)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
        })
      }
      wx.setStorageSync('carList',carList)
      let carList1 = wx.getStorageSync('carList') || []
      console.log(carList1)
  },
  // 点击收藏事件
  handlItemCollect(){
    //思路： 点击收藏先判断下是否收藏了此件商品 如果收藏了就取消收藏 ，
    // 如果没收藏，就添加收藏
    // 1.定义变量isCollect 
    let isCollect = ''
    // 2.获取数据
    let Collect = wx.getStorageSync('Collect') || []
    // 3.对比数据
    let index = Collect.findIndex(v => v.goods_id === this.goodsObj.goods_id)
    // findIndex 如何没有找到复合条件的就返回 -1  如果找到就返回索引
    // 4.做判断
    if(index !== -1) {
      // 已经收藏了
      Collect.splice(index,1)
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
      })
      isCollect = false
    }else{
      // 没有收藏
      Collect.push(this.goodsObj)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      })
      
    }
    // 5.将数据存储
    wx.setStorageSync("Collect", Collect)
    // 6.将状态进行改变
    this.setData({
      isCollect
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