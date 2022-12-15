import { constantRoutes, syncRoutes } from '@/router'
const state = {
  routes: constantRoutes //  默认只有静态路由数组
}
const mutations = {
  setRoutes(state, newRoutes) {
    //  注意state.routes = [...routes, ...newRoutes]这种写法业务上是不正确的，因为这样的话是不断地往里添加，而正确的是应该始终以静态路由为基础，往里添加动态路由
    state.routes = [...constantRoutes, ...newRoutes] //  合并动态路由和静态路由
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(item => {
      routes.push(...syncRoutes.filter(key => key.name === item))
    })
    context.commit('setRoutes', routes)
    return routes //  这里return出routes是给addRoutes用来动态添加路由表的，而vuex里面的routes则是用来跟左侧菜单栏关联渲染的
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
