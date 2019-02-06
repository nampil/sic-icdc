// https://vuex.vuejs.org/en/state.html

export default {
  //
  eventToAdmin: {
    guests: []
  },
  loginAlert: false,
  alert: {
    active: false,
    class: '',
    msg: '',
    timeout: 6000
  },
  isLoading: false,
  members: [],
  guests: [],
  events: [],
  auth: {
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('token') || null,
    tokenExpiration: localStorage.getItem('tokenExpiration') || null,
    name: localStorage.getItem('name') || null,
    role: localStorage.getItem('role') || null
  },
  users: []
}