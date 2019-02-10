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
  path: '/users/user/:id',
  name: 'Perfil de Usuario',
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
  path: '/members/member/:id',
  name: 'Miembro',
  view: 'Member',
  meta: {
    requiresAuth: true,
    loadMemberFirst: true
  }
},
{
  path: '/members/newmember',
  name: 'Añadir Miembro',
  view: 'NewMember',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/events',
  name: 'Eventos',
  view: 'Events',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/events/newevent',
  name: 'Nuevo Evento',
  view: 'NewEvent',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/events/event/:id',
  name: 'Evento',
  view: 'Event',
  meta: {
    requiresAuth: true
  }
},
{
  path: '/events/event/:id/admin',
  name: 'Administracion de Evento',
  view: 'AdminEvent',
  meta: {
    requiresAuth: true
  }
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
},
{
  path: '/users',
  name: 'Usuarios',
  view: 'Users',
  meta: {
    requiresAuth: true
  }
}
]
