import {getToken,setToken,removeToken} from '@/utils/auth'
import {login} from '@/api/user'
const state = {
  token:getToken()
}
const mutations = {
  // 更新token
  updateToken(state,payload){
    state.token=payload
    setToken(payload)
  },
  delToken(state){
    state.token=null
    removeToken()
  }
}
const actions = {
  //异步获取token
  async loginGetToken(context,payload){
    const res=await login(payload)
    context.commit('updateToken',res)
    
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

