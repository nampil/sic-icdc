<template>
  <material-card color="primary">
    <div slot="header">
      <v-layout
        justify-space-between
        row
        wrap
      >
        <v-flex xs10>
          <div class="title font-weight-light mb-2">Registro de Invitados</div>
          <div class="category"></div>
        </v-flex>
      </v-layout>
    </div>
    <!-- <v-card-text> -->
    <!-- <v-container grid-list-md> -->
    <v-form
      ref="guestForm"
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
              class="progress"
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </div>
      <v-layout wrap>
        <v-flex xs12>
          <v-text-field
            label="Nombre"
            color="secondary"
            required
            v-model="guest.name"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md6
        >
          <v-text-field
            label="Teléfono"
            color="secondary"
            v-model="guest.tel"
            mask="(####) ###-####"
            validate-on-blur
            :rules="telRules"
            prepend-inner-icon="mdi-cellphone-iphone"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            label="Email"
            color="secondary"
            type="email"
            v-model="guest.email"
            :rules="emailRules"
            validate-on-blur
            prepend-inner-icon="mdi-email"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-text-field
            label="Invitado por"
            color="secondary"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs12
          sm6
        >
          <v-select
            color="secondary"
            label="Genero"
            v-model="guest.gender"
            :items="gender"
            prepend-inner-icon="mdi-gender-male-female"
          />
        </v-flex>
        <v-flex
          xs12
          sm6
        >
          <v-menu
            ref="menu1"
            :close-on-content-click="false"
            :return-value.sync="guest.bdate"
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
              color="secondary"
              slot="activator"
              v-model="computedDateFormatted"
              label="Fecha de Nacimiento"
              readonly
              prepend-icon="mdi-calendar-star"
            ></v-text-field>

            <v-date-picker
              class="datePicker"
              locale="ES-ve"
              ref="picker"
              :max="new Date().toISOString().substr(0, 10)"
              min="1900-01-01"
              v-model="guest.bdate"
            >
              <v-spacer></v-spacer>
              <v-btn
                flat
                color="primary"
                @click="resetBdate"
              >Cancelar</v-btn>
              <v-btn
                flat
                color="primary"
                @click="$refs.menu1.save(guest.bdate)"
              >OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <v-checkbox
            label="¿Desea añadir a este usuario al evento actual?"
            color="secondary"
            v-model="add"
            hide-details
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-form>
    <!-- </v-container> -->
    <!-- </v-card-text> -->
    <v-card-actions
      slot="actions"
      class="fullwidth"
    >
      <v-spacer></v-spacer>
      <v-btn
        class="ml-auto"
        color="tertiary"
        @click="closeModal"
      >Cancelar</v-btn>
      <v-btn
        @click="registerGuest"
        class="ml-4"
        color="success"
      >Registrar</v-btn>
    </v-card-actions>
  </material-card>
</template>
<script>
export default {
  name: 'RegisterGuests',
  props: {
    eventId: String
  },
  data() {
    return {
      menu1: false,
      guest: {},
      telRules: [],
      emailRules: [],
      gender: ['m', 'f'],
      add: false
    }
  },
  watch: {
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  computed: {
    isloading() {
      return this.$store.getters.getIsloading
    },
    computedDateFormatted: {
      get: function() {
        return this.formatDate(this.guest.bdate)
      },
      set: function(val) {
        return (this.guest.bdate = val)
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
      this.$refs.guestForm.reset()
    },
    resetBdate() {
      this.menu1 = false
      this.guest.bdate = undefined
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    registerGuest(val) {
      this.$store.commit('loading', true)
      const index = this.$store.state.events
        .map(event => event._id)
        .indexOf(this.$store.state.route.params.id)

      this.$store
        .dispatch('createGuest', this.guest)
        .then(res => {
          console.log(res.data.data.createGuest)
          if (this.add) {
            const guestToAdd = res.data.data.createGuest

            const payload = {
              index: index,
              _id: guestToAdd._id
            }
            this.$store.commit('pushGuestToStorageEventGuests', payload)
          }

          this.$store.dispatch('fetchGuests').then(res => {
            this.$emit('close-modal')
            this.$store.commit('loading', false)
          })
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('loading', false)
        })
    }
  },
  created() {}
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
.fullwidth {
  width: 100%;
}
.datePicker button.v-btn.v-btn--flat.v-btn--floating.theme--light {
  padding: 0;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.87) !important;
  &:hover {
    background-color: rgba(76, 175, 79, 0.2);
  }
}
.datePicker,
.timePicker {
  margin-bottom: 10px;
}
.datePicker button.v-btn.v-btn--icon.theme--light,
.datePicker button.v-btn.v-btn--flat.theme--light:not(.error--text) {
  color: rgba(0, 0, 0, 0.87) !important;
}
.datePicker
  button.v-btn.v-btn--flat.v-btn--floating.theme--light.v-btn--disabled {
  color: rgba(0, 0, 0, 0.38) !important;
}
.datePicker
  button.v-btn.v-btn--active.v-btn--icon.v-btn--floating.theme--light.accent {
  background-color: #4caf50 !important;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: #fff !important;
  line-height: 32px;
}
.datePicker.v-btn.v-btn--icon {
  line-height: 32px;
}
</style>
