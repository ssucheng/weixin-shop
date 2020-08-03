let ajaxTimes = 0
export function fetch(options){
    ajaxTimes++
    // 显示加载中的效果
    wx.showLoading({
        title: '加载中',
        mask: true,
      
    })
    return new Promise((resolve,reject) => {
        wx.request({
            ...options,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{
                ajaxTimes--
                if(ajaxTimes !== 0) return false
                wx.hideLoading()
            }
        });
    })
}