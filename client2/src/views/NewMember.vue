<template>
  <v-layout>
    <v-flex
      xs12
      sm10
      offset-sm1
    >
      <material-card
        color="primary"
        title="Nuevo Miembro"
        text="Registre los datos para el nuevo miembro"
      >
        <v-form ref="newMemberForm">
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
                  :rules="nameRules"
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
                    :rules="bdateRules"
                    label="Fecha de Nacimiento"
                    readonly
                    prepend-icon="mdi-calendar-star"
                  />

                  <v-date-picker
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
                md3
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
                md3
              >
                <v-select
                  v-model="member.gender"
                  :items="gender"
                  :rules="genderRules"
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
                  :rules="telRules"
                  label="Teléfono"
                  class="purple-input"
                  mask="(####) ###-####"
                  validate-on-blur
                  prepend-inner-icon="mdi-cellphone-iphone"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  v-model="member.email"
                  :rules="emailRules"
                  label="Email"
                  class="purple-input"
                  type="email"
                  validate-on-blur
                  prepend-inner-icon="mdi-email"
                />
              </v-flex>

              <v-flex
                xs12
                md12
              >
                <v-text-field
                  v-model="member.address"
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
                <v-btn
                  class="mx-4 font-weight-light"
                  color="tertiary"
                  @click="resetForm"
                >Borrar</v-btn>

                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                  @click="createMember"
                >Enviar</v-btn>
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
  name: 'NewMember',

  data () {
    return {
      bdateRules: [v => !!v || 'Se requiere nombre'],
      nameRules: [v => !!v || 'Se requiere nombre'],
      genderRules: [v => !!v || 'Se requiere genero'],
      emailRules: [],
      telRules: [],
      gender: ['f', 'm'],
      // date: new Date().toISOString().substr(0, 10),
      member: {},
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
    tel () {
      if (this.member.tel && this.member.tel !== '') {
        return this.member.tel
      }
    },
    email () {
      if (this.member.mail && this.member.email !== '') return this.member.email
    },
    isloading: {
      get: function () {
        return this.$store.getters.getIsloading
      },
      set: function (payload) {
        this.$store.dispatch('setLoading', payload)
      }
    },
    computedDateFormatted: {
      get: function () {
        return this.formatDate(this.member.bdate)
      },
      set: function (val) {
        return (this.member.bdate = val)
      }
    },
    memAge () {
      if (this.member.bdate) {
        const memberAge =
          Math.abs(Date.now() - new Date(this.member.bdate)) / 31557600000
        return Math.floor(memberAge)
      }
    }
  },
  watch: {
    member: {
      handler: function (newval, oldval) {
        if (!this.isEmpty(newval)) {
          return this.setLocalStoreMemberData(this.member)
        }
      },
      deep: true
    },
    menu1 (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    tel (val) {
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
        this.emailRules = [v => /.+@.+/.test(v) || 'E-mail debe ser valido']
      } else {
        this.emailRules = []
      }
    }
  },
  mounted () {
    const newMemberFormData = localStorage.getItem('newMemberFormData')
    if (newMemberFormData) {
      this.member = JSON.parse(newMemberFormData)
    }
  },
  created () {},

  methods: {
    isEmpty (obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
      }
      return true
    },
    setLocalStoreMemberData (memberData) {
      localStorage.setItem('newMemberFormData', JSON.stringify(memberData))
    },
    resetForm () {
      this.$refs.newMemberForm.resetValidation()
      this.member = {}
      window.localStorage.removeItem('newMemberFormData')
    },
    resetBdate () {
      this.menu1 = false
      if (this.member.bdate) {
        this.member.bdate = this.$store.getters.getMemberById(
          this.$route.params.id
        ).bdate
      }
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
    async createMember () {
      const validation = await this.$refs.newMemberForm.validate()

      if (validation) {
        this.isloading = true
        const member = {
          ...this.member,
          relatives: this.member.relatives ? this.member.relatives : [],
          serveIn: this.member.serveIn ? this.member.serveIn : []
        }
        console.log

        this.$store
          .dispatch('createMember', member)
          .then(res => {
            if (res.status === 200) {
              this.$store.dispatch('toggleAlert', {
                class: 'success',
                active: true,
                msg: 'Exito! Miembro creado satisfactoriamente'
              })
            } else {
              this.$store.dispatch('toggleAlert', {
                class: 'warning darken-2',
                active: true,
                msg: 'Algo no anda bien aqui :('
              })
            }
            this.isloading = false
            this.resetForm()
          })
          .catch(err => console.log(err))
      } else {
      }
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

.datePicker button.v-btn.v-btn--flat.v-btn--floating.theme--light {
  padding: 0;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.87) !important;
  &:hover {
    background-color: rgba(76, 175, 79, 0.2);
  }
}
</style>
