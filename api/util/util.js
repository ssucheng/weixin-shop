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
// 提示框
export const showModal = () => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '是否删除商品',
            content: '',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
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