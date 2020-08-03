import {fetch} from './fetch'
import api from './url'

// 轮播图数据
export function getCarouselApi(url){
    return fetch({
        url:api.baseUrl + url,
        method:'GET'
    })
}

// 导航数据
export function getCatitemsApi(url){
    return fetch({
        url:api.baseUrl + url,
        method:'GET'
    })
}

// 楼层数据
export function getfloorDataApi(url){
    return fetch({
        url:api.baseUrl + url,
        method:'GET'
    })
}

// 分类数据
export function getCategoryApi(url){
    return fetch({
        url:api.baseUrl + url,
        method:'GET'
    })
}
// 商品列表搜索
export function getGoodsSearchApi(url,params){
    return fetch({
        url:api.baseUrl + url,
        data:{...params},
        method:'GET'
    })
}
// 商品详情数据
export function getGoodsDetailApi(url,params){
    return fetch({
        url:api.baseUrl + url,
        data:{...params},
        method:'GET'
    })
}