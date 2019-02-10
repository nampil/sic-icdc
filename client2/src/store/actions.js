// https://vuex.vuejs.org/en/actions.html
import axios from 'axios'
import router from '../router'

let timeToLogout
let timeToLoginAlert

function StopTime (id) {
  clearTimeout(id)
}
export default {
  fetchGuests ({
    commit,
    state
  }) {
    const query = {
      query: `{
        guests{
          _id
          name
          tel
          email
          bdate
          gender
          invitedBy
          createdBy{
            _id
            name
          }
        }
      }`
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    return new Promise((resolve, reject) => {
      return axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          if (!res.status === 200 || !res.status === 201) {
            throw new Error('fetching Guests failed with status: ' + res.status + ' & statusText:  ' + res.statusText)
          }
          commit('setGuests', res.data.data.guests)

          return res
        }).then(res => {
          resolve(res)
        }).catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },
  fetchUsers ({
    commit,
    state
  }) {
    const query = {
      query: `{
        users {
          _id
          name
          email
          role
          
        }
      }`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          commit('setUsers', res.data.data.users)
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  fetchMembers ({
    commit,
    state
  }) {
    const query = {
      query: `{
        members{
          _id
          name
          tel
          email
          bdate
          address
          gender
          serveIn
          relatives
        }
      }`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then((res) => {
          const formattedmembers = res.data.data.members.map(member => {
            return {
              ...member,
              address: member.address !== 'undefined' ? member.address : '',
              email: member.email !== 'undefined' ? member.email : '',
              tel: member.tel !== 'undefined' ? member.tel : ''
            }
          })

          if (!res.status === 200 || !res.status === 201) {
            throw new Error('fetching Members failed with status: ' + res.status + ' & statusText:  ' + res.statusText)
          }
          const members =
            commit('setMembers', formattedmembers)
          return res
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  fetchEvents ({
    commit,
    state
  }) {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    const query = {
      query: `{
          events{
            _id
            title
            eventDate
            endDate
            place
            description
            cordinator
            orgScope
            staffAuv
            staffMav
            staffProto
            staffDarte
            staffEci
            staffVar
            active
            guests{
              _id
              name
            }
            memberAsist{
              name
              _id
            }
            createdBy{
              _id
              name
            }
          }    
        
      }`

    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          if (!res.status === 0 || !res.status === 201) {
            throw new Error('fetch Events failed with status: ' + res.status + ' & statusText:  ' + res.statusText)
          }
          commit('setEvents', res.data.data.events)
          return res
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  login ({
    commit
  }, credentials) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_ENDPOINT, credentials, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!')
          }
          const auth = res.data.data.login

          localStorage.setItem('token', auth.token)
          localStorage.setItem('userId', auth.userId)
          localStorage.setItem('tokenExpiration', auth.tokenExpiration)
          localStorage.setItem('name', auth.name)
          commit('setAuth', auth)
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err)
        })
    })
  },
  logout ({
    commit
  }) {
    localStorage.clear()
    commit('destroyAuth')
  },
  setLoading ({
    commit
  }, payload) {
    commit('loading', payload)
  },
  toggleAlert ({
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
    }, 1000 * 60 * 59)
    timeToLoginAlert = setTimeout(() => {
      commit('loginAlert', true)
    }, 1000 * 60 * 58)
  },
  relogin ({
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
          name
          role
        }
      }`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    axios
      .post(process.env.VUE_APP_API_ENDPOINT, reLoginQuery, headers)
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('relogin Failed!')
        }

        const auth = res.data.data.relogin

        localStorage.setItem('token', auth.token)
        localStorage.setItem('userId', auth.userId)
        localStorage.setItem('tokenExpiration', auth.tokenExpiration)
        localStorage.setItem('name', auth.name)
        commit('setAuth', auth)

        commit('loginAlert', false)

        return res
      }).then(res => {
        dispatch('loadData')
        dispatch('startTime')
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteUser: ({
    state
  }, id) => {
    const query = {
      query: `mutation {
        deleteUser(userId: "${id}"){
          _id
          name
        }
      }`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject()
          console.log(err)
        })
    })
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
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject()
          console.log(err)
        })
    })
  },
  createUser ({
    state,
    dispatch
  }, newUser) {
    const query = {
      query: `
        mutation{
          createUser(
            userInput: {
              name: "${newUser.name}",
              password: "${newUser.password}",
              email: "${newUser.email}",
              role: ${newUser.role}
            })
            {
              _id
              name
              email
              role
            }
        }`
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          dispatch('fetchUsers')

          resolve(res)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },

  createMember ({
    dispatch,
    state
  }, member) {
    const query = {
      query: `
        mutation {
      createMember (
        memberInput:{
          name: "${member.name}",
          tel: "${member.tel}",
          address:"${member.address}",
          bdate:"${member.bdate}",
          gender: "${member.gender}",
          email: "${member.email}",
          relatives: ${JSON.stringify(member.relatives)},
          serveIn: ${JSON.stringify(member.serveIn)}
          })
        {
          name
        }
}`
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }

    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(async res => {
          await dispatch('fetchMembers')
          resolve(res)
          return res
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  createEvent ({
    dispatch,
    state
  }, event) {
    const query = {
      query: `
        mutation {
          createEvent(eventInput:{
            title: "${event.title}",
            eventDate:"${event.eventDate}",
            endDate: "${event.endDate}",
            place: "${event.place}",
            description: "${event.description}",
            orgScope: "${event.orgScope}",
            cordinator: "${event.cordinator}",
            staffAuv:${JSON.stringify(event.staffAuv)},
            staffMav:${JSON.stringify(event.staffMav)},
            staffProto:${JSON.stringify(event.staffProto)},
            staffDarte:${JSON.stringify(event.staffDarte)},
            staffEci: ${JSON.stringify(event.staffEci)},
            staffVar: ${JSON.stringify(event.staffVar)}
          })
          {
            _id
          }
        
      }`
    }

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          console.log(res)
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Create new event failed!')
          }
          dispatch('fetchEvents')

          return res
        }).then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err)
        })
    })
  },
  deleteEvent: ({
    state
  }, id) => {
    const query = {
      query: `mutation {
        deleteEvent(eventId: "${id}"){
          _id
          title
        }
      }`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, query, headers)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject()
          console.log(err)
        })
    })
  },
  createGuest ({
    commit,
    state
  }, guest) {
    const name = guest.name ? `name: "${guest.name}"` : ''
    const tel = guest.tel ? `tel: "${guest.tel}"` : ''
    const email = guest.email ? `email: "${guest.email}"` : ''
    const bdate = guest.bdate ? `bdate: "${guest.bdate}"` : ''
    const gender = guest.gender ? `gender: "${guest.gender}"` : ''
    const invitedBy = guest.invitedBy ? `invitedBy: "${guest.invitedBy}"` : ''

    const queryDos = {
      query: ` mutation { createGuest(guestInput: {` + name + tel + email + bdate + gender + invitedBy + `}){_id, name}}`
    }
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + state.auth.token
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_ENDPOINT, queryDos, headers).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },

  async loadData ({
    commit,
    dispatch,
    state
  }) {
    let counter = 0

    commit('loading', true)
    await dispatch('fetchEvents')
      .then(res => {
        console.log('events fetched')
        counter++
      })
      .catch(err => console.log(err))

    await dispatch('fetchMembers')
      .then(res => {
        counter++
        console.log('members fetched')
      })
      .catch(err => {
        console.log(err)
      })

    await dispatch('fetchGuests')
      .then(res => {
        counter++
        console.log('guests fetched')
      })
      .catch(err => console.log(err))

    if (state.auth.role === 5) {
      await dispatch('fetchUsers')
        .then(res => {
          counter++
          console.log('users fetched')
        })
        .catch(err => console.log(err))
    }

    if (counter >= 4) {
      console.log('Data loaded')

      commit('loading', false)
    }
  }
}
