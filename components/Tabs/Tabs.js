// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabsList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     
  },

  /**
   * 组件的方法列表
   */
  methods: {
      btn(e){
          const{index} = e.currentTarget.dataset
          //  const {tabsList:list} = this.data
          // //  debugger
          //  list.forEach((item,i) => {
          //   i === index? item.isActive = true : item.isActive = false
          //  })
          //  this.setData({
          //    tabsList:list
          //  })
          this.triggerEvent('itemTap',index)
      }
  }
})
