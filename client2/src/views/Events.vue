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
        <events-TotalEvents/>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalFemale/>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalMale/>
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg3
      >
        <members-TotalKids/>
      </v-flex>
      <n-calendar :attributes="attrs"></n-calendar>

      <v-flex xs12>
        <events-EventsTable></events-EventsTable>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Events',
  data() {
    return {}
  },
  computed: {
    attrs() {
      return this.rowEvents.map(event => ({
        key: `event.${event.id}`,
        dot: {
          backgroundColor: '#blue'
        },
        // highlight: {
        //   backgroundColor: '#ff8080'
        // },
        // Just use a normal style
        // contentStyle: {
        //   color: '#fafafa'
        // },
        popover: {
          label: event.title
        },
        dates: [
          new Date(
            new Date(event.eventDate).getFullYear(),
            new Date(event.eventDate).getMonth(),
            new Date(event.eventDate).getDate()
          )
        ]
      }))
    },
    ...mapGetters({
      rowEvents: 'getEvents'
    }),
    dates() {
      return
    },
    events() {
      return this.rowEvents.map(event => {
        return {
          ...event,
          eventDate: this.formatDate(
            new Date(event.eventDate).toISOString().substr(0, 10)
          ),
          eventTime: new Date(event.eventDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      })
    }
  },
  methods: {
    formatDate(date) {
      const [year, month, day] = date.split('-')

      const dateVe = `${day}/${month}/${year}`
      return dateVe
    }
  }
}
</script>