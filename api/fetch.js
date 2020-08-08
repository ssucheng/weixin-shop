let ajaxTimes = 0
export function fetch(options){
    //判断请求地址中是否带有/my/的字段 如果有就是私有路径要带上token
    let header = {...options.header}
    if(options.url.includes('/my/')){
        // 请求头携带token
        header['Authorization'] = wx.getStorageSync('token') 
    }
    ajaxTimes++
    // 显示加载中的效果
    wx.showLoading({
        title: '加载中',
        mask: true,
      
    })
    return new Promise((resolve,reject) => {
        wx.request({
            ...options,
            header,
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