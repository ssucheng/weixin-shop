//Page Object
import {getCarouselApi,getCatitemsApi} from '../../api/api.js'
Page({
  data: {
    carouselList:[],//轮播图数据
    catitemsList:[],
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
  },
  //获取轮播图数据的方法
  async getCarousel(){
  const {data:res} = await getCarouselApi('home/swiperdata')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'轮播图请求失败' })
    this.setData({
      carouselList:res.message
    })
  },
  // 获取分类数据的方法
  async getCatitems(){
    const {data:res} = await getCatitemsApi('home/catitems')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'分类请求失败' })
    this.setData({
      catitemsList:res.message
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