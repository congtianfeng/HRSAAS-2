import request from '@/utils/request'
// 登录模块
export const login = (data) => {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/** *
*
* 获取用户的基本信息  现在写它 完全是为了显示头像
* **/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
