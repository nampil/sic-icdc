<template>
  <material-stats-card
    :value="totalEventos"
    :sub-text="'Al ' + today "
    color="green"
    icon="mdi-account-group"
    title="Total de Eventos"
    sub-icon="mdi-calendar"
  />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'TotalEvents',
  computed: {
    ...mapState({
      events: 'events'
    }),
    totalEventos () {
      return JSON.stringify(this.events.length)
    },
    today () {
      const date = new Date().toLocaleDateString(['es-VE'], {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })

      return date
    }
  }
}
</script>
