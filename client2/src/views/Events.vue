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
      <v-flex xs12>
        <n-calendar
          :attributes="attrs"
          is-linked
          is-expanded
        />
      </v-flex>

      <v-flex xs12>
        <events-EventsTable/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Events',
  data () {
    return {}
  },
  computed: {
    attrs () {
      return this.rowEvents.map(event => ({
        key: `event.${event._id}`,
        highlight: {
          backgroundColor: this.getColor(event._id)
        },
        // dot: {
        //   backgroundColor: this.getColor(event._id)
        // },

        contentStyle: {
          color: '#fafafa'
        },
        popover: {
          label: event.title
        },
        dates: [
          {
            start: new Date(
              new Date(event.eventDate).getFullYear(),
              new Date(event.eventDate).getMonth(),
              new Date(event.eventDate).getDate()
            ),
            end: new Date(
              new Date(event.endDate).getFullYear(),
              new Date(event.endDate).getMonth(),
              new Date(event.endDate).getDate()
            )
          }
        ]
      }))
    },
    ...mapGetters({
      rowEvents: 'getEvents'
    }),
    events () {
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
    getColor (id) {
      const eventSelected = this.events.filter(event => {
        return event._id === id
      })[0]

      console.log(eventSelected)

      const matchArea = this.$store.getters.getAreaScope.filter(area => {
        return area.title === eventSelected.orgScope
      })[0]
      console.log()

      return matchArea.color
    },
    formatDate (date) {
      const [year, month, day] = date.split('-')

      const dateVe = `${day}/${month}/${year}`
      return dateVe
    }
  }
}
</script>
