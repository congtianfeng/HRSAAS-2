// 访问权限拦截设置
import router from '@/router'
import store from '@/store'
const whiteList = ['/404', '/login']
router.beforeEach((to, from, next) => {
  //判断有无token
  if (store.getters.token) {// 有token
    if (to.path === '/login') next('/')// 有token还要去登录页强制跳转到主页
    else { next() } //  有token去别的页面直接放行
  } else {//  无token
    if (whiteList.includes(to.path)) next()//  无token但是去的页面在白名单内，放行
    else { next('/login') }//  无token但是去的页面也不在白名单内，强制跳转到登录页
  }
})