// pages/goods_list/goods_list.js
import {getGoodsSearchApi} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList:[
      {
        id:0,
        name:'综合',
        isActive:true
      }
      ,
      { 
        id:1,
        name:'销量',
        isActive:false

      }
      ,
      { 
        id:2,
        name:"价格",
        isActive:false

      }
    ],
    goodsList:[],
    flag:false,

  },
  queryData:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  count:1,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData.cid = options.cid
    this.getList()
  },
  handleItemChange(val){
    const {detail:index} = val
    const {tabsList:list} = this.data
    list.forEach((item,i) => {
      index === i ? item.isActive = true : item.isActive = false
    }
    )
    this.setData({
      tabsList:list
    })
  },
  async getList(callback){
    const {data:res} = await getGoodsSearchApi('goods/search',{ ...this.queryData})
    // count为总页数 数据总共为count页
    this.count = Math.ceil(res.message.total/this.queryData.pagesize)
    if(res.meta.status !== 200) return wx.showToast({
      title: '请求商品列表失败',
      icon:"none"
    })
    let goodsList = [...this.data.goodsList ,...res.message.goods] 
    this.setData({
      goodsList,
    })
    callback && callback()
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
    this.setData({
      goodsList:[]
    })
    this.queryData.pagenum = 1;
    this.getList(()=>{
      setTimeout(function () {
        // wx.stopPullDownRefresh()
      }, 2000)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断下当前页是否大于总页数
    console.log(this.queryData.pagenum)
    console.log(this.count)
    if(this.queryData.pagenum >= this.count) return this.setData({flag:true})
    this.queryData.pagenum++
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})