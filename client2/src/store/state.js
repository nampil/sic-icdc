// https://vuex.vuejs.org/en/state.html

export default {
  //

  areaScope: [

    {
      title: 'AUV',
      color: '#303f9f'
    },
    {
      title: 'Pastores',
      color: '#1565c0'
    },
    {
      title: 'ICDC',
      color: '#536dfe'
    },
    {
      title: 'CCV',
      color: '#0097a7'
    },
    {
      title: 'Zona de Cambio',
      color: '#bf360c'
    },
    {
      title: 'Cotef',
      color: '#0288d1'
    },
    {
      title: 'ECI',
      color: '#00796b'
    },
    {
      title: 'Protocolo',
      color: '#ab47bc'
    },
    {
      title: 'Consolidación',
      color: '#512da8'
    },
    {
      title: 'Mujeres que Trascienden',
      color: '#ef5350'
    },
    {
      title: 'Discipularte',
      color: '##ec407a'
    },
    {
      title: 'Cafe',
      color: '#5d4037'
    },
    {
      title: 'Amor y Respeto',
      color: '#fbc02d'
    },
    {
      title: 'Encuentro con Dios',
      color: '#f57c00'
    },
    {
      title: 'Otro',
      color: '#388e3c'
    }
  ],
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
  users: [],
  roles: [{
    role: 1,
    title: 'Usuario'
  },
  {
    role: 2,
    title: 'Coodinador'
  },
  {
    role: 3,
    titles: 'Supervisor'
  },
  {
    role: 4,
    title: 'Administrador'
  },

  {
    role: 5,
    title: 'SuperAdmin'
  }

  ]

}
