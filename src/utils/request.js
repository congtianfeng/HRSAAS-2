import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getItem } from '@/utils/auth'
const timeStamp = 2 //定义token超时时间，单位为小时
//  定义一个判断时间戳是否超时的函数
const checkTimeKey = time => {
  const isCheckTimeOut = (+new Date() - time) / 1000 / 60 / 60
  return isCheckTimeOut > timeStamp
}
// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器，统一注入token
request.interceptors.request.use(config => {
  if (store.getters.token) {
    const timeKey = getItem('timeKey')
    if (checkTimeKey(timeKey)) {
      store.commit("user/delToken");
      store.commit("user/removeUserInfo");
      router.push('/login')
      return Promise.reject(new Error('token超时,请重新登录'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, err => Promise.reject(err)
)

// 响应拦截器。1、剥离一层返回的data。2、被动处理token过期问题
request.interceptors.response.use(res => {
  if (res.data.success) {
    return res.data
  } else {
    return Promise.reject(new Error(res.message))
  }
},
  err => {
    if (err.response && err.response.data && err.response.data.code === 10002) {
      store.commit("user/delToken");
      store.commit("user/removeUserInfo");
      router.push('/login')
      return Promise.reject(new Error('token超时,请重新登录'))
    }
    Message.error(err.message)
    return Promise.reject(err)
  }
)

export default request
