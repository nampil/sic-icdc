// https://vuex.vuejs.org/en/state.html

export default {
  //
  loginAlert: false,
  alert: {
    active: false,
    class: '',
    msg: '',
    timeout: 6000
  },
  isLoading: false,
  members: [],
  auth: {
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    tokenExpiration: localStorage.getItem('tokenExpiration') || null
  }
}