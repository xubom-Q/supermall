import { request } from "./request";
// 首页面向此模块开发，为首页提供所需要的接口函数
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
// 首页商品的接口
export function getHomeGoods(type, page) {  
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}