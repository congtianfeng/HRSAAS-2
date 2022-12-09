const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,//建立token的快捷访问
  userInfo: state => state.user.userInfo//建立用户的快捷访问
}
export default getters