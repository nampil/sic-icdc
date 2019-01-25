<template>
  <material-stats-card
    color="red"
    icon="mdi-human-male"
    title="Hombres"
    :value="maleMembersCount"
    sub-icon="mdi-human-male"
    sub-text="Miembros Hombres"
  />
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "TotalMembers",
  computed: {
    ...mapGetters({
      maleMembersCount: "getMembersMaleCount"
    })
  }
};
</script>