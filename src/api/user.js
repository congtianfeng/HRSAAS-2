import request from '@/utils/request'
// 登录模块
export const login=(data)=>{
    return request({
        method:'POST',
        url:'/sys/login',
        data
    })
}