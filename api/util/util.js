// Promise 封装内部微信内部api
// 获取权限
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
// 打开权限
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
// 获取地址
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
/**
 * @method showModal
 * @param {stirng} content 提示的主题内容
 * @return {object} 
 * promise 形式 showModal
 */
export const showModal = (content) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content: content,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
/**
 * @method showToast
 * @param {string} title 要提示文字的内容
 * 
 * promise 形式 showToast
 */
export const showToast = (title) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title:title,
            icon:'none',
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
/** 
 * @method navigateTo 
 *
 *@param {string} url 地址字符串
 *@return promise 形式 wx-navigateTo
*/
export const navigateTo = (url) => {
    return new Promise((resolve,reject) => {
        wx.navigateTo({
            url,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
             reject(err)
            },
            complete: ()=>{}
          });
    })
}

/** 
 * @method switchTab 
 *
 *@param {string} url 地址字符串
 *@return promise 形式 wx.switchTab
*/
export const switchTab = (url) => {
    return new Promise((resolve,reject) => {
        wx.switchTab({
            url,
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
             reject(err)
            },
            complete: ()=>{}
          });
    })
}

