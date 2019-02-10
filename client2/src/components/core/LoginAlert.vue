<template>
  <v-dialog
    v-model="loginAlert"
    persistent
    max-width="390"
  >
    <v-card
      color="info"
      dark
    >
      <v-card-title class="headline">Su sesion esta a punto de expirar</v-card-title>
      <v-card-text>Para continuar con la sesion, presione continuar. De lo contrario, puede cancelar para salir inmediatamente</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="tertiary"
          @click="loginAlert = false"
        >Cancelar</v-btn>
        <v-btn
          color="primary"
          @click="continuar"
        >Continuar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data () {
    return {
      timeout: 6000
    }
  },
  computed: {
    loginAlert: {
      get: function () {
        return this.$store.getters.getLoginAlert
      },
      set: function (payload) {
        this.$store.commit('loginAlert', payload)
      }
    }
  },
  methods: {
    continuar () {
      this.$store.dispatch('relogin')
    }
  }
}
</script>
