// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  setMembers(state, payload) {
    state.members = payload
  },
  setAuth(state, payload) {

    state.auth.userId = payload.userId
    state.auth.token = payload.token
    state.auth.tokenExpiration = payload.tokenExpiration
  },
  destroyAuth(state, payload) {
    state.auth.userId = localStorage.getItem('userId') || null,
      state.auth.token = localStorage.getItem('token') || null,
      state.auth.tokenExpiration = localStorage.getItem('tokenExpiration') || null
  },
  loading(state, payload) {
    state.isLoading = payload
  },
  setAlert(state, payload) {
    state.alert = payload
  },
  updateTime(state) {
    state.now = new Date
  },
  loginAlert(state, payload) {
    state.loginAlert = payload
  }
}