<template>
  <v-snackbar
    v-model="alertData.active"
    :timeout="timeout"
    :color="alertData.class"
    multi-line
    top
    @input="resetAlert"
  >
    {{ alertData.msg }}
    <v-btn
      color="pink"
      flat
      @click="resetAlert"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      timeout: 6000
    }
  },
  computed: {
    alertData: {
      get: function () {
        return this.$store.getters.getAlert
      }
    }
  },
  methods: {
    resetAlert () {
      this.$store.commit('setAlert', {
        active: false,
        class: '',
        msg: ''
      })
    }
  }
}
</script>
