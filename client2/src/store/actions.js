// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'
import router from '../router'

let timeToLogout
let timeToLoginAlert

function StopTime(id) {
  clearTimeout(id)
}

export default {
  //
  fetchMembers({
    commit,
    state
  }) {
    const query = {
      query: `{
        members{
          _id
          name,
          tel,
          email,
          bdate,
          address,
          gender,
          serveIn,
          relatives
        }
      }`
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    axios.post('/api/', query, headers)
      .then((res) => {
        commit('setMembers', res.data.data.members)

      }).catch(error => {
        console.log(error)
      })
  },
  login({
    commit
  }, credentials) {

    return new Promise((resolve, reject) => {
      axios
        .post("/api/", credentials, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          const auth = res.data.data.login

          localStorage.setItem('token', auth.token)
          localStorage.setItem('userId', auth.userId)
          localStorage.setItem('tokenExpiration', auth.tokenExpiration)
          commit('setAuth', auth)
          resolve()
        })
        .catch(err => {
          reject(err)
          console.log(err)
        });
    })

  },
  logout({
    commit
  }) {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('userId')
    window.localStorage.removeItem('tokenExpiration')
    commit('destroyAuth')

  },
  setLoading({
    commit
  }, payload) {
    commit('loading', payload)
  },
  toggleAlert({
    commit
  }, args) {
    commit('setAlert', args)
  },
  startTime: ({
    commit,
    dispatch
  }) => {


    StopTime(timeToLoginAlert)
    StopTime(timeToLogout)

    timeToLogout = setTimeout(() => {
      dispatch('logout')
      commit('loginAlert', false)
      router.push('/login')

    }, 1000 * 60 * 59);
    timeToLoginAlert = setTimeout(() => {
      commit('loginAlert', true)

    }, 1000 * 60 * 58);

  },
  relogin({
    commit,
    state,
    dispatch
  }) {
    const reLoginQuery = {
      query: `{
        relogin{
          userId
          token
          tokenExpiration
        }
      }`
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    axios
      .post("/api/", reLoginQuery, headers)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }

        const auth = res.data.data.relogin

        localStorage.setItem('token', auth.token)
        localStorage.setItem('userId', auth.userId)
        localStorage.setItem('tokenExpiration', auth.tokenExpiration)
        commit('setAuth', auth)
        commit('loginAlert', false)

        return res

      }).then(res => {
        dispatch('startTime')
        console.log('relogin, retimer')
      })
      .catch(err => {

        console.log(err)
      });

  },
  deleteMember: ({
    state
  }, id) => {

    const query = {
      query: `mutation {
        deleteMember(memberId: "${id}"){
          _id
          name
        }
      }`
    }
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post('/api/', query, headers)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject()
          console.log(err)
        })
    })

  }
}