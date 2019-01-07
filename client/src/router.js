import Vue from "vue";
import Router from "vue-router";
import Escritorio from "./views/Escritorio.vue";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "escritorio",
      component: Escritorio
    },
    {
      path: "/members",
      name: "members",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "members" */ "./views/Members.vue")
    }
  ]
});