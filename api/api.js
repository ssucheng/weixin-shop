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