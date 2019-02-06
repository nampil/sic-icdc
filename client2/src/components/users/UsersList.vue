<template>
  <material-card
    color="info"
  >
  <div slot="header">
    <v-layout row wrap justify-space-between align-center px-2>
      
   
    <div class="title font-weight-light">Lista de Usuarios</div>
     
      
       <v-tooltip bottom dark>
      <v-btn small icon color="secondary" class="hidden" slot="activator" @click="newUserModal = true">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <span>Nuevo Usuario</span>
    </v-tooltip>

       </v-layout>
    </div>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-account-search"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-list two-line>
      <v-list-tile
      v-if="users"
        v-for="(user, index) in users"
        :key="index"
      >
        <v-list-tile-action>
          <v-avatar 
          
          size="36px"
          color="grey lighten-4">
            <img
              src="https://vuetifyjs.com/apple-touch-icon-180x180.png"
              alt="avatar"
            >
          </v-avatar>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{user.name}}</v-list-tile-title>
          <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
          <v-list-tile-sub-title>{{user.rol}}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action >
            <v-icon @click="alertDeleteUser(user._id)">mdi-delete</v-icon>
        </v-list-tile-action>
      </v-list-tile>
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
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            @click="resetDeleteUser"
          >Cancelar</v-btn>
          <v-btn
            color="error"
            @click="deleteUser"
            :disabled="isLoading"
            :loading="isLoading"
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
        <users-NewUser/>
      </v-card-text>
    </v-card>
    </v-dialog>
  </material-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UsersList',
  data() {
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
    })
  },
  methods: {
    goToProfile(id){
      this.$router.push('/users/user/' + id)
    },
     alertDeleteUser(id) {
      this.deleteUserId = id
      this.showAlertDeleteUser = true
    },
    resetDeleteUser(){
      this.deleteUserId = null
      this.showAlertDeleteUser = false
    },
    deleteUser(){
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
  },
}
</script>

<style lang="scss">
  .bg{
    background-color: #fff;
    height: 100%;
  }
</style>