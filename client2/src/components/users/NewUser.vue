<template>
  <material-card>
    <div slot="header">
      <v-layout
        row
        wrap
        justify-space-between
        align-center
        px-2
      >
        <div class="title font-weight-light">Registrar Nuevo Usuario</div>
      </v-layout>
    </div>

    <v-card-text>
      <v-form
        ref="newUserForm"
        class="relative"
      >
        <div
          v-if="isloading"
          class="loading"
        >
          <v-layout
            align-center
            justify-center
            row
            fill-height
          >
            <v-flex
              xs12
              class="text-xs-center"
            >
              <v-progress-circular
                :size="70"
                :width="7"
                class="progress"
                color="purple"
                indeterminate
              />
            </v-flex>
          </v-layout>
        </div>
        <v-text-field
          v-model="newUser.name"
          :rules="[rules.required]"
          prepend-icon="mdi-account"
          required
          label="Nombre"
        />
        <v-text-field
          v-model="newUser.email"
          :rules="emailRules"
          prepend-icon="mdi-email"
          required
          label="Email"
        />
        <v-text-field
          :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
          v-model="newUser.password"
          :type="show1 ? 'text' : 'password'"
          :rules="[rules.required]"
          prepend-icon="mdi-key"
          required
          label="Clave"
          @click:append="show1 = !show1"
        />

        <v-select
          v-model="newUser.role"
          :items="roles"
          prepend-icon="mdi-account-key"
          item-text="title"
          item-value="value"
          label="Role"
          persistent-hint
          single-line
        />
      </v-form>
      <v-card-actions
        slot="actions"
        class="fullwidth justify-center"
      >
        <v-btn
          color="info"
          @click="resetForm"
        >Borrar</v-btn>
        <v-btn
          color="success"
          @click="registerUser"
        >Registrar</v-btn>
      </v-card-actions>
    </v-card-text>
  </material-card>
</template>
<script>
export default {
  name: 'NewUser',
  data() {
    return {
      show1: false,
      newUser: {
        name: null,
        email: null,
        password: null,
        role: null
      },
      rules: {
        required: value => !!value || 'Necesario.'
      },
      emailRules: [
        v => !!v || 'Se requiere Email',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      errMsg: '',
      hasErr: false,
      roles: [
        { title: 'Usuario', value: 1 },
        { title: 'Coordinador', value: 2 },
        { title: 'Supervisor', value: 3 },
        { title: 'Administrador', value: 4 },
        { title: 'SuperAdmin', value: 5 }
      ]
    }
  },
  computed: {
    isloading() {
      return this.$store.getters.getIsloading
    }
  },
  methods: {
    resetForm() {
      this.newUser.name = ''
      this.newUser.password = ''
      this.newUser.email = ''
      this.hasErr = false
      this.errMsg = ''
      this.$refs.newUserForm.reset()
    },
    cancelar() {
      this.$emit('closeModal')
    },

    async registerUser() {
      const validation = await this.$refs.newUserForm.validate()
      if (validation) {
        this.$store.commit('loading', true)

        this.$store
          .dispatch('createUser', this.newUser)
          .then(res => {
            if (res.status === 200 || res.status === 201) {
              this.$store.dispatch('toggleAlert', {
                msg: `Usuario ${
                  res.data.data.createUser.name
                } creado stisfactoriamente`,
                class: 'success',
                active: true
              })
              this.resetForm()
              this.$emit('closeModal')
            } else {
              this.$store.dispatch('toggleAlert', {
                msg: 'Algo anda mal por aqui',
                class: 'error',
                active: true
              })
            }
            this.$store.commit('loading', false)
          })
          .catch(err => {
            this.$store.dispatch('toggleAlert', {
              msg: `Algo anda mal por aqui. Error: ${err}`,
              class: 'error',
              active: true
            })
            this.$store.commit('loading', false)
            console.log(err)
          })
      }
    }
  }
}
</script>
<style lang="scss">
.loading {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.75);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.relative {
  position: relative;
}
</style>
