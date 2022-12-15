import { getItem, setItem, removeItem } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getItem('token'),
  userInfo: {}
}
const mutations = {
  // 更新token
  updateToken(state, payload) {
    state.token = payload
    setItem('token', payload)
  },
  delToken(state) {
    state.token = null
    removeItem('token')
  },
  //  更新用户信息
  updateUserInfo(state, payload) {
    state.userInfo = { ...payload }
    setItem('userInfo', JSON.stringify(payload))
  },
  //  删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
    removeItem('userInfo')
  }
}
const actions = {
  // 异步获取token
  async loginGetToken(context, payload) {
    const { data } = await login(payload)
    context.commit('updateToken', data)
  },
  //  异步获取用户信息
  async asyncGetUserInfo(context) {
    const { data } = await getUserInfo()
    const res = await getUserDetailById(data.userId)
    context.commit('updateUserInfo', { ...data, ...res.data })
    return data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

