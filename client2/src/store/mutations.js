// https://vuex.vuejs.org/en/mutations.html

export default {
  //
  pushGuestToStorageEventGuests(state, payload) {
    console.log(payload)
    state.events[payload.index].guests.push(payload._id)
  },
  pushGuestToStorageGuests(state, payload) {
    state.guests.push(payload)
  },
  setGuestsOnEvent(
    state, payload) {

    state.events[payload.index].guests = payload.guestsIdTosave
  },

  setGuests(state, payload) {
    state.guests = payload
  },
  setUsers(state, payload) {
    state.users = payload
  },
  setMembers(state, payload) {
    state.members = payload
  },
  setEvents(state, payload) {
    state.events = payload
  },
  setAuth(state, payload) {

    state.auth.userId = payload.userId
    state.auth.token = payload.token
    state.auth.tokenExpiration = payload.tokenExpiration
    state.auth.name = payload.name
    state.auth.role = payload.role
  },
  destroyAuth(state, payload) {
    state.auth.userId = localStorage.getItem('userId') || null,
      state.auth.token = localStorage.getItem('token') || null,
      state.auth.tokenExpiration = localStorage.getItem('tokenExpiration') || null
    state.auth.name = localStorage.getItem('name') || null
    state.auth.role = localStorage.getItem('role') || null
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
  },
  setActive(state, payload) {
    const event = state.events.find(event => event._id === payload.id)
    event.active = payload.active

  }
}