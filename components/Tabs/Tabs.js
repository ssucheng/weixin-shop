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
          console.log(e)
          const{index} = e.currentTarget.dataset
          console.log(index)
           const {tabsList:list} = this.data
           console.log(list)
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
