export function fetch(options){
    return new Promise((resolve,reject) => {
        wx.request({
            ...options,
            success: (result)=>{
                resolve(result)
            },
            fail: (error)=>{
                reject(error)
            },
            complete: ()=>{}
        });
    })
}