//Page Object
import {getCarouselApi} from '../../api/api.js'
Page({
  data: {
    carouselList:[],//轮播图数据
    autoplay:true,
    interval:5000,
    duration:500,
    circular:true,
    indicatorDots:true
  },
  //options(Object)
  onLoad: function(options){
   this.getCarousel()
  },
  //获取轮播图数据的方法
  async getCarousel(){
  const {data:res} = await getCarouselApi('home/swiperdata')
    if(res.meta.status !== 200 ) return wx.showToast({ title:'轮播图请求失败' })
    this.setData({
      carouselList:res.message
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