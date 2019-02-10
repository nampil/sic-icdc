<template>

  <material-stats-card
    :value="kidsMembersCount"
    color="info"
    icon="mdi-human-child"
    title="Niños"
    sub-icon="mdi-human-child"
    sub-text="Miembros Niños"
  />

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TotalKids',
  computed: {
    ...mapGetters({
      kidsMembersCount: 'getMembersKidsCount'
    })
  }
}
</script>
