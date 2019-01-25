<template>

  <material-stats-card
    :value="totalMembers"
    color="green"
    icon="mdi-account-group"
    title="Miembros"
    sub-icon="mdi-calendar"
    sub-text="Al 30 Ene 2019"
  />

</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TotalMembers",
  computed: {
    ...mapGetters({
      totalMembers: "getMembers"
    })
  }
};
</script>