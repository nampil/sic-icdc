<template>
  <material-card color="info">
    <div slot="header">
      <v-layout
        row
        wrap
        justify-space-between
        align-center
        px-2
      >
        <div class="title font-weight-light">Lista de Usuarios</div>

        <v-tooltip
          bottom
          dark
        >
          <v-btn
            slot="activator"
            small
            icon
            color="secondary"
            class="hidden"
            @click="newUserModal = true"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
          <span>Nuevo Usuario</span>
        </v-tooltip>
      </v-layout>
    </div>

    <v-list
      v-if="users"
      two-line
    >
      <template v-for="(user, index) in usersFormat">
        <v-list-tile :key="user.name">
          <v-list-tile-avatar>
            <img
              src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
              alt="avatar"
            >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            <v-list-tile-sub-title>Email: {{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ user.role }}</v-list-tile-action-text>
            <v-icon @click="alertDeleteUser(user._id)">mdi-delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="index"/>
      </template>
    </v-list>
    <v-dialog
      v-model="showAlertDeleteUser"
      persistent
      max-width="390"
    >
      <v-card>
        <v-card-title
          dark
          class="headline error white--text"
        >¿Desea eliminar este usuario?</v-card-title>
        <v-card-text>Presione Aceptar para eliminar definitivamente a este usuario.</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="info"
            @click="resetDeleteUser"
          >Cancelar</v-btn>
          <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            color="error"
            @click="deleteUser"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="newUserModal"
      max-width="390px"
    >
      <v-card>
        <v-card-text>
          <users-NewUser @closeModal="newUserModal = false"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </material-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UsersList',
  data () {
    return {
      search: null,
      showAlertDeleteUser: false,
      deleteUserId: null,
      newUserModal: false
    }
  },
  computed: {
    ...mapGetters({
      users: 'getAllUsers',
      isLoading: 'getIsloading'
    }),
    usersFormat () {
      const uf = this.users.map(user => {
        return {
          ...user,
          role: this.userRole(user)
        }
      })
      return uf
    }
  },
  methods: {
    userRole (user) {
      const role = this.$store.state.roles.filter(
        role => role.role === user.role
      )[0]
      console.log(role)
      return role.title
    },
    goToProfile (id) {
      this.$router.push('/users/user/' + id)
    },
    alertDeleteUser (id) {
      this.deleteUserId = id
      this.showAlertDeleteUser = true
    },
    resetDeleteUser () {
      this.deleteUserId = null
      this.showAlertDeleteUser = false
    },
    deleteUser () {
      this.$store.dispatch('setLoading', true)
      this.$store
        .dispatch('deleteUser', this.deleteUserId)
        .then(async res => {
          await this.$store.dispatch('fetchUsers')
          return res
        })
        .then(res => {
          const deleteUser = res.data.data.deleteUser
          if (res.status === 200) {
            this.$store.dispatch('toggleAlert', {
              active: true,
              class: 'error',
              msg: `El usuario ${deleteUser.name} fue borrado exitosamente`
            })
          } else {
            this.$store.dispatch('showAlert', {
              class: 'warning darken-2',
              active: true,
              msg: 'Algo no anda bien aqui :('
            })
          }
          this.$store.dispatch('setLoading', false)
          this.showAlertDeleteUser = false
        })
    }
  }
}
</script>

<style lang="scss">
.bg {
  background-color: #fff;
  height: 100%;
}
</style>
