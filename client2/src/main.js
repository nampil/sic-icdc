// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import {
  sync
} from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'

//Other imports

import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
// Sync store with router
sync(store, router)

Vue.config.productionTip = false

Vue.use(VCalendar, {
  firstDayOfWeek: 1, // Sunday
  componentPrefix: "n"
});

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  mounted() {
    if (this.$store.state.auth.token) {
      this.$store.dispatch('relogin')
    }
  },
  render: h => h(App),
  created() {


  }

}).$mount('#app')