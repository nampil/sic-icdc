/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [{
    path: '/dashboard',
    // Relative to /src/views
    name: 'Escritorio',
    view: 'Dashboard',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/members',
    name: 'Miembros',
    view: 'Members',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/member/:id',
    name: 'Miembro',
    view: 'Member',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/newmember',
    name: 'Añadir Miembro',
    view: 'NewMember',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  },
  {
    path: '/login',
    name: 'Ingresar',
    view: 'Login'
  },
  {
    path: '/register',
    name: 'Registro de Usuario',
    view: 'Register',
    meta: {
      requiresAuth: true
    }
  }
]