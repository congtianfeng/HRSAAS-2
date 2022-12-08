import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器，统一注入token
request.interceptors.request.use(
)

// 响应拦截器。1、剥离一层返回的data。2、主动处理token过期问题
request.interceptors.response.use(res=>{
  if(res.data.success){
    return res.data
  }else{
     return Promise.reject(new Error(res.message))
  }
},
err=>{
  Message.error(err,message)
  return Promise.reject(error)
}
)

export default request
