<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>

      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalMembers />

      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalFemale />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalMale />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalKids />

      </v-flex>
      <v-flex
        md12
        lg6
      >
        <members-MembersTable />
      </v-flex>
      <v-flex
        md12
        lg6
      >

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Members",
  data() {
    return {
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    };
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    }
  },
  created() {
    if (this.$store.state.members.length < 1) {
      this.$store.dispatch("fetchMembers");
    }
  }
};
</script>
