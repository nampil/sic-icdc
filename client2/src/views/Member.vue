<template>
  <v-layout>
    <v-flex
      xs12
      sm10
      offset-sm1
    >
      <material-card
        v-if="member"
        color="primary"
      >
        <v-layout
          slot="header"
          align-center
          justify-space-between
          row
          fill-height
        >
          <div>
            <div class="title">{{ member.name }}</div>
            <div class="font-weight-light mb-2">Tel: {{ member.tel }}</div>
          </div>

          <v-btn
            v-if="!edit"
            color="info"
            @click="edit = !edit"
          >Editar</v-btn>
          <v-btn
            v-else
            color="tertiary"
            @click="(edit = !edit), resetForm()"
          >Cancelar</v-btn>
        </v-layout>
        <v-form>
          <v-container
            py-0
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

            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="member.name"
                  :rules="rulesName"
                  :readonly="!edit"
                  class="purple-input"
                  label="Nombre"
                  prepend-inner-icon="mdi-account-outline"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-menu
                  ref="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="member.bdate"
                  v-model="menu1"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Fecha de Nacimiento"
                    readonly
                    prepend-icon="mdi-calendar-star"
                  />

                  <v-date-picker
                    v-show="edit"
                    ref="picker"
                    :max="new Date().toISOString().substr(0, 10)"
                    v-model="member.bdate"
                    class="datePicker"
                    locale="ES-ve"
                    min="1950-01-01"
                  >
                    <v-spacer/>
                    <v-btn
                      flat
                      color="primary"
                      @click="resetBdate"
                    >Cancelar</v-btn>
                    <v-btn
                      flat
                      color="primary"
                      @click="$refs.menu1.save(member.bdate)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex
                xs12
                md2
              >
                <v-text-field
                  :value="memAge"
                  label="Edad"
                  class="purple-input"
                  readonly
                  prepend-inner-icon="mdi-counter"
                />
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-select
                  v-model="member.gender"
                  :items="gender"
                  :readonly="!edit"
                  class="purple-input"
                  label="Genero"
                  prepend-inner-icon="mdi-gender-male-female"
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="member.tel"
                  :readonly="!edit"
                  label="Teléfono"
                  class="purple-input"
                  mask="(####) ###-####"
                  prepend-inner-icon="mdi-cellphone-iphone"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="member.email"
                  :readonly="!edit"
                  label="Email"
                  class="purple-input"
                  type="email"
                  prepend-inner-icon="mdi-email"
                />
              </v-flex>

              <v-flex
                xs12
                md12
              >
                <v-text-field
                  v-model="member.address"
                  :readonly="!edit"
                  label="Dirección"
                  class="purple-input"
                  prepend-inner-icon="mdi-home-map-marker"
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-combobox
                  :readonly="!edit"
                  v-model="member.relatives"
                  :items="member.relatives"
                  label="Familiares y amigos en la ICDC"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-human-handsdown"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-combobox
                  :readonly="!edit"
                  v-model="member.serveIn"
                  :items="areasServicio"
                  label="Áreas de Servicio"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-room-service"
                />
              </v-flex>
              <v-flex
                xs12
                text-xs-right
              >
                <v-expand-transition>
                  <div v-show="edit">
                    <v-btn
                      class="mx-4 font-weight-light"
                      color="tertiary"
                      @click="resetForm"
                    >Cancelar</v-btn>

                    <v-btn
                      class="mx-0 font-weight-light"
                      color="success"
                      @click="updateMember"
                    >Actualizar</v-btn>
                  </div>
                </v-expand-transition>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'Member',

  data () {
    return {
      edit: false,
      rulesName: [v => !!v || 'Se requiere nombre'],
      emailRules: [],
      telRules: [],
      gender: ['f', 'm'],
      member: this.$store.getters.getMemberById(this.$route.params.id),
      // date: new Date().toISOString().substr(0, 10),
      dateFormatted: null,
      menu1: false,
      areasServicio: [
        'AUV',
        'MAV',
        'OeI',
        'ECI',
        'Recupera',
        'Amor y Respeto',
        'MqT',
        'ZdC',
        'Discipularte',
        'Admin',
        'Protocolo',
        'CAFE'
      ]
    }
  },
  computed: {
    stateMember: function () {
      return this.$store.getters.getMemberById(this.$route.params.id)
    },
    tel: function () {
      if (this.member && this.member.tel !== 'undefined') {
        return this.member.tel
      } else {
        return ''
      }
    },
    email () {
      if (this.member) {
        return this.member.email
      } else {
        return 'Loading...'
      }
    },
    isloading: {
      get: function () {
        return this.$store.getters.getIsloading
      },
      set: function (payload) {
        this.$store.dispatch('setLoading', payload)
      }
    },
    computedDateFormatted () {
      return this.formatDate(this.member.bdate)
    },
    memAge () {
      const memberAge =
        Math.abs(Date.now() - new Date(this.member.bdate)) / 31557600000
      return Math.floor(memberAge)
    }
  },
  watch: {
    stateMember: function () {
      this.member = this.stateMember
    },
    menu1 (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    tel: function (val) {
      if (val && val !== '') {
        this.telRules = [
          v =>
            /^0[0-9]{10}$/g.test(v) || 'Teléfono invalido. Ejemplo 0412-1234567'
        ]
      } else {
        this.telRules = []
      }
    },
    email (val) {
      if (val && val !== '') {
        this.emailRules = [
          v =>
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
              v
            ) || 'E-mail debe ser valido'
        ]
      } else {
        this.emailRules = []
      }
    }
  },
  created () {},
  methods: {
    resetForm () {
      this.member = this.$store.getters.getMemberById(this.$route.params.id)
    },
    resetBdate () {
      this.menu1 = false
      this.member.bdate = this.$store.getters.getMemberById(
        this.$route.params.id
      ).bdate
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    updateMember () {
      this.isloading = true
      console.log(JSON.stringify(this.member.relatives))
      const query = {
        query: `
            mutation {
          updateMember (
            memberId: "${this.$route.params.id}",
            memberInputUpdate:{
              name: "${this.member.name}",
              tel: "${this.member.tel}",
              address:"${this.member.address}",
              bdate:"${this.member.bdate}",
              gender: "${this.member.gender}",
              email: "${this.member.email}",
              relatives: ${JSON.stringify(this.member.relatives)},
              serveIn: ${JSON.stringify(this.member.serveIn)}
              })
            {
              name
            }
}`
      }

      axios
        .post(process.env.VUE_APP_API_ENDPOINT, query, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.auth.token
          }
        })
        .then(async res => {
          await this.$store.dispatch('fetchMembers')

          return res
        })
        .then(res => {
          this.isloading = false
          if (res.status === 200 && res.statusText === 'OK') {
            this.$store.dispatch('toggleAlert', {
              class: 'purple',
              active: true,
              msg: `Informacion de ${this.member.name} actualizada.`
            })
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.75);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
.progress {
  margin: 0 auto;
}
.relative {
  position: relative;
}
</style>
