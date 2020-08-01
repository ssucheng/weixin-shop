//Page Object
import {getCarouselApi} from '../../api/api.js'
Page({
  data: {
    carouselList:[]
  },
  //options(Object)
  onLoad: function(options){
   this.getCarousel()
  },
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