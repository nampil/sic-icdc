<template>
  <div class="members">
    <b-container>
      <b-row>
        <b-table
          :items="members"
          :fields="fields"
        ></b-table>
      </b-row>
    </b-container>

  </div>
</template>

<script>
export default {
  name: "Members",
  data() {
    return {
      fields: [
        {
          key: "name",
          sortable: true,
          label: "Nombre"
        },
        {
          key: "bdate",

          label: "Fecha Nacimiento"
        },
        {
          key: "address",

          label: "Direccion"
        }
      ]
    };
  },
  computed: {
    members() {
      return this.$store.getters.getMembers;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
