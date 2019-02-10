<template>

  <material-stats-card
    :value="femaleMembersCount"
    color="orange"
    icon="mdi-human-female"
    title="Mujeres"
    sub-text="Miembros Mujeres"
  />

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TotalFemale',
  computed: {
    ...mapGetters({
      femaleMembersCount: 'getMembersFemaleCount'
    })
  }
}
</script>
