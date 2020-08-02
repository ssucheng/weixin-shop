//Page Object
import {getCarouselApi,getCatitemsApi,getfloorDataApi} from '../../api/api.js'
Page({
  data: {
    carouselList:[],//轮播图数据
    catitemsList:[],//导航数据
    floorData:[],//楼层数据
    autoplay:true,
    interval:5000,
    duration:500,
    circular:true,
    indicatorDots:true
  },
  //options(Object)
  onLoad: function(options){
   this.getCarousel()
   this.getCatitems()
   this.getfloorData()
  },
  //获取轮播图数据的方法
  async getCarousel(){
  const {data:res} = await getCarouselApi('home/swiperdata')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'轮播图请求失败' ,icon:"none"})
    this.setData({
      carouselList:res.message
    })
  },
  // 获取分类数据的方法
  async getCatitems(){
    const {data:res} = await getCatitemsApi('home/catitems')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'分类数据请求失败' ,icon:"none"})
    this.setData({
      catitemsList:res.message
    })
  },
  // 获取楼层数据
  async getfloorData(){
    const {data:res} = await getfloorDataApi('home/floordata')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'楼层数据请求失败' ,icon:"none"})
    this.setData({
      floorData:res.message
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});