<template>
  <v-layout>
    <v-flex
      xs12
      sm10
      offset-sm1
    >
      <material-card
        color="info darken-3"
        title="Nuevo Evento"
        text="Registre los datos para el nuevo evento"
      >
        <v-form ref="newEventForm">
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
                    class="progress"
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
                </v-flex>
              </v-layout>
            </div>

            <v-flex xs12>
              <h3 class="section-title">Información General</h3>
            </v-flex>

            <v-layout wrap>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  class="purple-input"
                  label="Titulo"
                  v-model="event.title"
                  :rules="[rules.required]"
                  prepend-inner-icon="mdi-calendar-week"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  class="purple-input"
                  label="Coordinador"
                  v-model="event.cordinator"
                  prepend-inner-icon="mdi-clipboard-account"
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <div
                  :class="{'hass-error': showErrorDate}"
                  class="label"
                >
                  <v-layout
                    row
                    wrap
                  >
                    <span>
                      <v-icon class="mr-1">mdi-calendar</v-icon>
                    </span>
                    <label class="labelPicker">Fecha de Inicio</label>
                  </v-layout>
                </div>
                <v-date-picker
                  class="datePicker"
                  :events="eventsDates"
                  locale="ES-ve"
                  ref="picker"
                  :max="maxDate"
                  :min="new Date().toISOString().substr(0, 10)"
                  v-model="event.eventDate"
                  full-width
                  @input="[showErrorDate = false]"
                >
                  <v-layout>
                    <v-flex
                      xs12
                      text-xs-center
                    >
                      <v-btn
                        class="font-weight-light"
                        color="error"
                        flat
                        @click="resetDate"
                      >Borrar</v-btn>
                    </v-flex>
                  </v-layout>
                </v-date-picker>

                <div class="errorMessagesWrapper">
                  <v-slide-y-transition>
                    <div
                      class="error--text"
                      v-if="showErrorDate"
                    >{{datePickerError}}</div>
                  </v-slide-y-transition>
                </div>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <div
                  :class="{'hass-error': showErrorTime}"
                  class="label"
                >
                  <v-layout
                    row
                    wrap
                  >
                    <span>
                      <v-icon class="mr-1">mdi-clock</v-icon>
                    </span>
                    <label class="labelPicker">Hora de Inicio</label>
                  </v-layout>
                </div>
                <v-time-picker
                  v-model="event.eventTime"
                  color="secondary"
                  full-width
                  class="timePicker"
                  @input="showErrorTime = false"
                >
                  <v-flex
                    xs12
                    text-xs-center
                  >
                    <v-btn
                      class="font-weight-light"
                      color="error"
                      flat
                      @click="resetTime"
                    >Borrar</v-btn>
                  </v-flex>
                </v-time-picker>
                <div class="errorMessagesWrapper">
                  <v-slide-y-transition>
                    <div
                      class="error--text"
                      v-if="showErrorTime"
                    >{{timePickerError}}</div>
                  </v-slide-y-transition>
                </div>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <div
                  :class="{'hass-error': showErrorDate}"
                  class="label"
                >
                  <v-layout
                    row
                    wrap
                  >
                    <span>
                      <v-icon class="mr-1">mdi-calendar</v-icon>
                    </span>
                    <label class="labelPicker">Fecha de Culminación</label>
                  </v-layout>
                </div>
                <v-date-picker
                  class="datePicker"
                  :events="eventsDates"
                  locale="ES-ve"
                  ref="pickerC"
                  :max="maxDate"
                  :min="minDateC"
                  v-model="event.eventDateC"
                  full-width
                  @input="showErrorDateC = false"
                >
                  <v-layout>
                    <v-flex
                      xs12
                      text-xs-center
                    >
                      <v-btn
                        class="font-weight-light"
                        color="error"
                        flat
                        @click="resetDateC"
                      >Borrar</v-btn>
                    </v-flex>
                  </v-layout>
                </v-date-picker>

                <div class="errorMessagesWrapper">
                  <v-slide-y-transition>
                    <div
                      class="error--text"
                      v-if="showErrorDateC"
                    >{{datePickerErrorC}}</div>
                  </v-slide-y-transition>
                </div>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <div
                  :class="{'hass-error': showErrorTimeC}"
                  class="label"
                >
                  <v-layout
                    row
                    wrap
                  >
                    <span>
                      <v-icon class="mr-1">mdi-clock</v-icon>
                    </span>
                    <label class="labelPicker">Hora de Culminación</label>
                  </v-layout>
                </div>
                <v-time-picker
                  v-model="event.eventTimeC"
                  color="secondary"
                  full-width
                  class="timePicker"
                  :max="maxTimeC"
                  :min="minTimeC"
                  @input="showErrorTimeC = false"
                >
                  <v-flex
                    xs12
                    text-xs-center
                  >
                    <v-btn
                      class="font-weight-light"
                      color="error"
                      flat
                      @click="resetTimeC"
                    >Borrar</v-btn>
                  </v-flex>
                </v-time-picker>
                <div class="errorMessagesWrapper">
                  <v-slide-y-transition>
                    <div
                      class="error--text"
                      v-if="showErrorTimeC"
                    >{{timePickerErrorC}}</div>
                  </v-slide-y-transition>
                </div>
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  name="place"
                  label="Lugar"
                  id="place"
                  v-model="event.place"
                  :rules="[placeRules.required]"
                  clearable
                  prepend-inner-icon="mdi-map-marker"
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  name="description"
                  label="Descripción"
                  id="description"
                  hint="Breve descripción del evento"
                  v-model="event.description"
                  prepend-inner-icon="mdi-tooltip-text"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <h3 class="section-title">Servidores</h3>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffAuv"
                  label="AUV"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-bookmark-music"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffProto"
                  label="Protocolo"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-human-greeting"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffDarte"
                  label="DicipulArte"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-guy-fawkes-mask"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffEci"
                  label="ECI"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-teach"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffMav"
                  label="MAV"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-speaker"
                ></v-combobox>
              </v-flex>
              <v-flex xs12>
                <v-combobox
                  v-model="event.staffVar"
                  label="Otros Servidores"
                  multiple
                  small-chips
                  prepend-inner-icon="mdi-worker"
                ></v-combobox>
              </v-flex>

              <v-flex
                xs12
                text-xs-right
              >
                <v-btn
                  class="mx-4 font-weight-light"
                  color="error"
                  @click="resetForm"
                >Cancelar</v-btn>

                <v-btn
                  class="mx-0 font-weight-light"
                  :color="enviarBtn.color"
                  @click="createEvent"
                >{{enviarBtn.text}}</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </material-card>
    </v-flex>
  </v-layout>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: 'NewEvent',
  data() {
    return {
      menuEndTime: null,
      showErrorDate: false,
      showErrorTime: false,
      datePickerError: '',
      timePickerError: '',
      showErrorDateC: false,
      showErrorTimeC: false,
      datePickerErrorC: '',
      timePickerErrorC: '',
      eventsDates: null,
      event: JSON.parse(localStorage.getItem('newEventFormData')) || {},
      placeRules: {
        required: value => !!value || 'Requerido.'
      },
      rules: {
        required: value => !!value || 'Requerido.'
      }
    }
  },
  watch: {
    'event.eventDate'(val) {
      this.resetDateC()
    },
    event: {
      handler: function(newval) {
        if (!this.isEmpty(newval)) {
          this.setLocalStoreEventData(this.event)
        }
      },
      deep: true
    }
  },
  computed: {
    maxTimeC() {
      if (this.minTimeC) {
        return '24:30'
      } else {
        return undefined
      }
    },

    minTimeC() {
      if (this.event.eventDateC && this.event.eventDate) {
        const [yearC, monthC, dayC] = this.event.eventDateC.split('-')
        const [year, month, day] = this.event.eventDate.split('-')
        const date = new Date(year, month - 1, day).getTime()
        const dateC = new Date(yearC, monthC - 1, dayC).getTime()

        return dateC - date === 0 ? this.event.eventTime : undefined
      } else {
        return undefined
      }
    },
    minDateC() {
      return this.event.eventDate
        ? this.event.eventDate
        : new Date().toISOString().substr(0, 10)
    },
    enviarBtn() {
      if (this.showErrorDate || this.showErrorTime) {
        return {
          text: 'Datos invalidos',
          color: 'warning'
        }
      } else {
        return {
          text: 'Enviar',
          color: 'success'
        }
      }
    },
    endTimeFormatted: {
      get: function() {
        return this.formatEndTime(this.event.endTime)
      },
      set: function(val) {
        this.event.endTime = val
      }
    },

    computedDateFormatted() {
      return this.formatDate(this.event.eventDate)
    },
    maxDate() {
      const nowDate = new Date()
      const nowYear = nowDate.getFullYear()
      const nowMonth = nowDate.getMonth()
      const nowDay = nowDate.getDay()

      return new Date(nowYear + 1, nowMonth, nowDay).toISOString().substr(0, 10)
    },
    isloading: {
      get: function() {
        return this.$store.getters.getIsloading
      },
      set: function(payload) {
        this.$store.dispatch('setLoading', payload)
      }
    }
  },
  methods: {
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
      }
      return true
    },
    setLocalStoreEventData(eventData) {
      localStorage.setItem('newEventFormData', JSON.stringify(eventData))
    },
    formatEndTime(endTime) {
      if (!endTime) return null
      const hour = endTime.split(':')[0]
      const min = endTime.split(':')[1]
      if (hour - 12 > 0) {
        const fHour = hour - 12
        return fHour + ':' + min + ' pm'
      } else {
        return hour + ':' + min + ' am'
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    resetValidation() {
      this.$refs.newEventForm.resetValidation()
    },
    resetForm() {
      this.datePickerError = ''
      this.showErrorDate = false
      this.showErrorTime = false
      this.$refs.newEventForm.reset()
      this.event = {}
      window.localStorage.removeItem('newEventFormData')
    },
    resetDate() {
      this.event.eventDate = ''
      this.resetDateC()
      this.resetTimeC()
    },
    resetDateC() {
      if (this.event.eventDateC) this.event.eventDateC = ''
    },
    resetTimeC() {
      if (this.event.eventTimeC) this.event.eventTimeC = ''
    },
    resetTime() {
      this.resetTimeC()
      this.event.eventTime = ''
    },
    async createEvent() {
      //Validate the form
      const validation = await this.$refs.newEventForm.validate()
      //Custom validation
      let errorsCount = 0
      if (!this.event.eventDate || this.event.eventDate === '') {
        this.showErrorDate = true
        this.datePickerError = 'Se requiere la fecha del evento'
        errorsCount++
      }
      if (!this.event.eventTime || this.event.eventTime === '') {
        this.showErrorTime = true
        this.timePickerError = 'Se requiere la fecha del evento'
        errorsCount++
      }
      if (!this.event.eventTimeC || this.event.eventTimeC === '') {
        this.showErrorTimeC = true
        this.timePickerErrorC = 'Se requiere la hora de culminacion del evento'
        errorsCount++
      }
      if (!this.event.eventDateC || this.event.eventDateC === '') {
        this.showErrorDateC = true
        this.datePickerErrorC = 'Se requiere la hora de culminación del evento'
        errorsCount++
      }

      if (validation && errorsCount === 0) {
        this.$store.dispatch('setLoading', true)
        const date = this.event.eventDate.split('-')
        const time = this.event.eventTime
        const year = date[0]
        const month = date[1] - 1
        const day = date[2]
        const hour = time.split(':')[0]
        const min = time.split(':')[1]

        const dateTosave = new Date(
          year,
          month,
          day,
          hour,
          min,
          0
        ).toISOString()

        const dateC = this.event.eventDateC.split('-')
        const timeC = this.event.eventTimeC
        const yearC = date[0]
        const monthC = date[1] - 1
        const dayC = date[2]
        const hourC = timeC.split(':')[0]
        const minC = timeC.split(':')[1]

        const endDateTosave = new Date(
          yearC,
          monthC,
          dayC,
          hourC,
          minC,
          0
        ).toISOString()

        const event = {
          ...this.event,
          eventDate: dateTosave,
          endDate: endDateTosave,
          staffAuv: this.event.staffAuv ? this.event.staffAuv : [],
          staffMav: this.event.staffMav ? this.event.staffMav : [],
          staffProto: this.event.staffProto ? this.event.staffProto : [],
          staffDarte: this.event.staffDarte ? this.event.staffDarte : [],
          staffEci: this.event.staffEci ? this.event.staffEci : [],
          staffVar: this.event.staffVar ? this.event.staffVar : []
        }

        console.log(endDateTosave, dateTosave)

        this.$store
          .dispatch('createEvent', event)
          .then(res => {
            if (res.status === 200 || res.status === 201) {
              this.$store.dispatch('toggleAlert', {
                msg: `El Evento ${
                  this.event.title
                } ha sido creado satisfactoriamente`,
                class: 'success',
                active: true
              })
            } else {
              this.$store.dispatch('toggleAlert', {
                msg: `Hubo un problema al crear este evento. Error: ${
                  res.status
                } || ${res.statusText}`,
                class: 'warning',
                active: true
              })
            }
          })
          .then(() => {
            this.resetForm()
            this.$store.dispatch('setLoading', false)
          })
          .catch(err => {
            console.log(err)
            this.$store.dispatch('setLoading', false)
            this.$store.dispatch('toggleAlert', {
              msg: `Hubo un problema al crear este evento. Error: ${err}`,
              class: 'warning',
              active: true
            })
          })
      }
    },
    created() {
      const newEventFormData = window.localStorage.getItem('newEventFormData')
      if (newEventFormData) {
        this.event = JSON.parse(newEventFormData)
        console.log(newEventFormData)
      }
    }
  }
}
</script>

<style lang="scss" >
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

.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
  font-size: 56px;
  height: 56px;
}
.timePicker.v-picker__title {
  padding: 1rem;
}
.labelPicker {
  font-size: 14px;
  color: #aaa;
  font-weight: 400;
  margin-bottom: 5px;
}
.errorMessagesWrapper {
  font-size: 12px;
  line-height: 12px;
  height: 12px;
  overflow: hidden;
}

.showError {
  animation: pickerErrorAnimation 300ms ease-in-out;
}
.hideError {
  animation: pickerErrorAnimation 300ms ease-in-out reverse forwards;
}

@keyframes pickerErrorAnimation {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
.label {
  padding: 2px 0;
  border-bottom: 1px solid rgb(205, 205, 205);
  margin-bottom: 5px;
}
.label.hass-error {
  label {
    animation: shake 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
}

@keyframes labelError {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(10px);
  }
}

.section-title {
  border-bottom: 1px solid rgba(155, 39, 176, 0.53);
  margin-top: 2rem;
  font-size: 1.1rem !important;
}
</style>
