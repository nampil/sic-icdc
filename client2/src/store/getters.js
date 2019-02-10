// https://vuex.vuejs.org/en/getters.html

export default {

  //
  getAreaScope: state => {
    return state.areaScope
  },
  getUserRole: state => {
    return state.auth.role
  },

  isAuth: state => {
    return state.auth.token !== null
  },

  getAllGuests: state => {
    return state.guests
  },

  getAllMembers: state => {
    return state.members
  },

  getAllUsers: state => {
    return state.users
  },

  getMembers: state => {
    if (state.members) {
      return state.members.length.toString()
    } else {
      return '0'
    }
  },
  getMembersFemaleCount: state => {
    if (state.members) {
      return state.members.filter(members => {
        return members.gender === 'f'
      }).length.toString()
    } else {
      return '0'
    }
  },
  getMembersMaleCount: state => {
    if (state.members) {
      return state.members.filter(members => {
        return members.gender === 'm'
      }).length.toString()
    } else {
      return '0'
    }
  },
  getMembersKidsCount: state => {
    if (state.members) {
      let membersAges = []
      for (let i = 0; i < state.members.length; i++) {
        let memberAge = Math.abs(Date.now() - new Date(state.members[i].bdate))
        membersAges.push(Math.floor(memberAge / 31557600000))
      }
      return membersAges.filter(membersAges => {
        return membersAges < 12
      }).length.toString()
    } else {
      return '0'
    }
  },
  getMemberById: (state) => (id) => {
    if (state.members.length > 0) {
      const member = state.members.find(member => member._id === id)

      function pad (n) {
        return n < 10 ? '0' + n : n
      }
      return {
        ...member,
        bdate: new Date(member.bdate).getUTCFullYear() +
          '-' +
          pad(new Date(member.bdate).getUTCMonth() + 1) +
          '-' +
          pad(new Date(member.bdate).getUTCDate())
      }
    } else {
      return null
    }
  },
  getEventById: (state) => (id) => {
    if (state.events.length > 0) {
      const event = state.events.find(event => event._id === id)

      function pad (n) {
        return n < 10 ? '0' + n : n
      }
      return {
        ...event,
        eventDate: new Date(event.eventDate).toLocaleString(['es-VE'], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
          .split('/')
          .reverse()
          .join('-'),
        eventTime: new Date(event.eventDate).toLocaleString('es-VE', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        }),
        endDate: new Date(event.endDate).toLocaleString(['es-VE'], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
          .split('/')
          .reverse()
          .join('-'),
        eventTimeC: new Date(event.endDate).toLocaleString('es-VE', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        })

      }
    } else {
      return null
    }
  },
  getIsloading: state => {
    return state.isLoading
  },
  getAlert: state => {
    return state.alert
  },
  getLoginAlert: state => {
    return state.loginAlert
  },

  getEvents: state => {
    return state.events
  }
}
