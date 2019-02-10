<template>
  <material-card
    color="accent"
    title="Lista de Eventos"
    text="Hasta la fecha"
  >
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-calendar-search"
        label="Buscar"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="true"
    >
      <template
        slot="headerCell"
        slot-scope="{ header }"
      >
        <span
          class="text-info text--darken-3"
          v-text="header.text"
        />
      </template>
      <v-progress-linear
        slot="progress"
        color="blue"
        indeterminate
      />
      <template
        slot="items"
        slot-scope="{ index, item }"
      >
        <td>{{ item.eventDate }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.createdBy.name }}</td>
        <td class="text-xs-center">
          <v-btn
            class="action-btn"
            ripple
            icon
            dark
            color="secondary"
            @click="goToAdminEvent(item._id)"
          >
            <v-icon>mdi-calendar</v-icon>
          </v-btn>
          <v-btn
            class="action-btn"
            ripple
            icon
            dark
            color="primary"
            @click="goToEvent(item._id)"
          >
            <v-icon>mdi-calendar-edit</v-icon>
          </v-btn>
          <v-btn
            slot="activator"
            class="action-btn"
            ripple
            icon
            color="danger"
            dark
            @click="alertDeleteEvent(item._id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog
      v-model="showAlertDeleteEvent"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title
          dark
          class="headline error white--text"
        >¿Desea eliminar este evento?</v-card-title>
        <v-card-text>Presione Aceptar para eliminar definitivamente este evento.</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="info"
            @click="resetDeleteEvent"
          >Cancelar</v-btn>
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="error"
            @click="deleteEvent"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </material-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'EventsTable',
  data: () => ({
    deleteEventId: null,
    showAlertDeleteEvent: false,
    search: '',
    headers: [
      {
        sortable: true,
        text: 'Fecha y Hora',
        value: 'eventDate'
      },
      {
        sortable: true,
        text: 'Titulo',
        value: 'title'
      },
      {
        sortable: false,
        text: 'Creador',
        value: 'createdBy.name'
      },
      {
        sortable: false,
        text: 'Accción',
        value: 'name',
        class: 'text-xs-center'
      }
    ]
    // items: []
  }),
  computed: {
    items () {
      const items = this.$store.state.events
      function pad (n) {
        return n < 10 ? '0' + n : n
      }
      return items.map(item => {
        return {
          ...item,
          eventDate: new Date(item.eventDate).toLocaleTimeString(['es-VE'], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      })
    },
    ...mapState(['isLoading'])
  },
  methods: {
    resetDeleteEvent () {
      this.deleteEventId = null
      this.showAlertDeleteEvent = false
    },
    goToEvent (id) {
      this.$router.push('/events/event/' + id)
    },
    goToAdminEvent (id) {
      this.$router.push('/events/event/' + id + '/admin')
    },
    alertDeleteEvent (id) {
      this.deleteEventId = id
      this.showAlertDeleteEvent = true
    },

    deleteEvent () {
      this.$store.dispatch('setLoading', true)
      this.$store
        .dispatch('deleteEvent', this.deleteEventId)
        .then(async res => {
          await this.$store.dispatch('fetchEvents')
          return res
        })
        .then(res => {
          const deletedEvent = res.data.data.deleteEvent
          console.log(deletedEvent)
          if (res.status === 200) {
            this.$store.dispatch('toggleAlert', {
              active: true,
              class: 'error',
              msg: `El evento ${deletedEvent.title} fue borrado exitosamente`
            })
          } else {
            this.$store.dispatch('showAlert', {
              class: 'warning darken-2',
              active: true,
              msg: 'Algo no anda bien aqui :('
            })
          }
          this.$store.dispatch('setLoading', false)
          this.showAlertDeleteEvent = false
        })
    }
  }
}
</script>
<style lang="scss">
.action-btn.v-btn {
  margin-left: 5px;
}

.v-icon.mdi.mdi-chevron-right.theme--light,
.v-icon.mdi.mdi-chevron-left.theme--light {
  color: rgba(0, 0, 0, 0.54);
}
</style>
