<template>
  <v-content>
    <div id="core-view">
      <core-alert />
      <core-loginAlert />
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </div>
    <core-footer v-if="$route.name !== 'Maps'" />
  </v-content>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "SIC - ICDC"
    };
  },
  data() {
    return {};
  },
  computed: {
    alertData() {
      return this.$store.getters.getAlert;
    }
  }
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
