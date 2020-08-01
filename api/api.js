import {fetch} from './fetch'
import api from './url'

// 轮播图数据
export function getCarouselApi(adress){
    return fetch({
        url:api.baseUrl + adress,
        method:'GET'
    })
}
