import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    members: []
  },
  getters: {
    getMembers(state) {
      return state.members
    }
  },
  mutations: {
    setMembers(state, payload) {
      state.members = payload
    }
  },
  actions: {
    fetchMembers({
      commit
    }) {
      axios.post('/api/', {
          query: `{
          members{
            name,
            bdate,
            address
          }
        }`
        })
        .then((res) => {
          commit('setMembers', res.data.data.members)
          console.log(res.data.data.members)
        }).catch(error => {
          console.log(error)
        })
    }
  }
});