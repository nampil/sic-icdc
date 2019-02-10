<template>
  <material-card
    color="info"
    title="Lista de Miembros"
    text="Hasta la fecha"
  >
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-account-search"
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
        <td>{{ item.name }}</td>
        <td class="text-xs-center">{{ item.tel }}</td>
        <td class="text-xs-center">{{ item.bdate }}</td>
        <td class="text-xs-center">
          <v-btn
            ripple
            dark
            icon
            color="primary"
            @click="goToMember(item._id)"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn
            slot="activator"
            ripple
            icon
            color="danger"
            dark
            @click="alertDeleteMember(item._id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-dialog
      v-model="showAlertDeleteMember"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title
          dark
          class="headline error white--text"
        >¿Desea eliminar este miembro?</v-card-title>
        <v-card-text>Presione Aceptar para eliminar definitivamente a este miembro.</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="info"
            @click="resetDeleteMember"
          >Cancelar</v-btn>
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="error"
            @click="deleteMember"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </material-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MembersTable',
  data: () => ({
    deleteMemberId: null,
    showAlertDeleteMember: false,
    search: '',
    headers: [
      {
        sortable: true,
        text: 'Nombre',
        value: 'name'
      },

      {
        sortable: false,
        text: 'Teléfono',
        value: 'tel',
        class: 'text-xs-center'
      },
      {
        sortable: false,
        text: 'F.Nac.',
        value: 'dbate',
        class: 'text-xs-center'
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
      const items = this.$store.state.members
      function pad (n) {
        return n < 10 ? '0' + n : n
      }
      return items.map(item => {
        return {
          ...item,
          bdate:
            pad(new Date(item.bdate).getUTCDate()) +
            '/' +
            pad(new Date(item.bdate).getUTCMonth() + 1) +
            '/' +
            new Date(item.bdate).getUTCFullYear()
        }
      })
    },
    ...mapState(['isLoading'])
  },
  methods: {
    resetDeleteMember () {
      this.deleteMemberId = null
      this.showAlertDeleteMember = false
    },
    goToMember (id) {
      this.$router.push('/members/member/' + id)
    },

    alertDeleteMember (id) {
      this.deleteMemberId = id
      this.showAlertDeleteMember = true
    },

    deleteMember () {
      this.$store.dispatch('setLoading', true)
      this.$store
        .dispatch('deleteMember', this.deleteMemberId)
        .then(async res => {
          await this.$store.dispatch('fetchMembers')
          return res
        })
        .then(res => {
          const deleteMember = res.data.data.deleteMember
          if (res.status === 200) {
            this.$store.dispatch('toggleAlert', {
              active: true,
              class: 'error',
              msg: `El miembro ${deleteMember.name} fue borrado exitosamente`
            })
          } else {
            this.$store.dispatch('showAlert', {
              class: 'warning darken-2',
              active: true,
              msg: 'Algo no anda bien aqui :('
            })
          }
          this.$store.dispatch('setLoading', false)
          this.showAlertDeleteMember = false
        })
    }
  }
}
</script>
