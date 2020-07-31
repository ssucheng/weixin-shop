// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      tabsList:[
        {
          id: 0,
          name: '首页',
          isActive:false
        },
        {
          id: 1,
          name: '原创',
          isActive:true
        },
        {
          id: 2,
          name: '分类',
          isActive:false
        },
        {
          id: 3,
          name: '关于',
          isActive:false
        }
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
      btn(e){
          const{index} = e.currentTarget.dataset
           const {tabsList:list} = this.data
          //  debugger
           list.forEach((item,i) => {
            i === index? item.isActive = true : item.isActive = false
           })
           this.setData({
             tabsList:list
           })

      }
  }
})
