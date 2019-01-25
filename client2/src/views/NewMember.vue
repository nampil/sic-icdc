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
                  class="purple-input"
                  label="Nombre"
                  v-model="member.name"
                  required
                />
              </v-flex>

              <v-flex
                xs12
                md6
              >
                <v-text-field
                  label="Teléfono"
                  class="purple-input"
                  v-model="member.tel"
                />
              </v-flex>
              <v-flex
                xs12
                md6
              >
                <v-text-field
                  label="Email"
                  class="purple-input"
                  type="email"
                  v-model="member.email"
                />

              </v-flex>

              <v-flex
                xs12
                md12
              >
                <v-text-field
                  label="Dirección"
                  class="purple-input"
                  v-model="member.address"
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
                  >

                  </v-text-field>

                  <v-date-picker
                    locale="ES-ve"
                    dark
                    ref="picker"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    v-model="member.bdate"
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
                  label="Edad"
                  class="purple-input"
                  :value="memAge"
                  readonly
                />

              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-select
                  class="purple-input"
                  label="Genero"
                  v-model="member.gender"
                  :items="gender"
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
                ></v-combobox>
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
                >
                  Borrar
                </v-btn>

                <v-btn
                  class="mx-0 font-weight-light"
                  color="success"
                  @click="createMember"
                >
                  Enviar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>

      </material-card>
    </v-flex>

  </v-layout>

</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "NewMember",

  data() {
    return {
      gender: ["f", "m"],
      //date: new Date().toISOString().substr(0, 10),
      member: {},
      dateFormatted: null,
      menu1: false,
      areasServicio: [
        "AUV",
        "MAV",
        "OeI",
        "ECI",
        "Recupera",
        "Amor y Respeto",
        "MqT",
        "ZdC",
        "Discipularte",
        "Admin",
        "Protocolo",
        "CAFE"
      ]
    };
  },
  computed: {
    isloading: {
      get: function() {
        return this.$store.getters.getIsloading;
      },
      set: function(payload) {
        this.$store.dispatch("setLoading", payload);
      }
    },
    computedDateFormatted() {
      return this.formatDate(this.member.bdate);
    },
    memAge() {
      if (this.member.bdate) {
        const memberAge =
          Math.abs(Date.now() - new Date(this.member.bdate)) / 31557600000;
        return Math.floor(memberAge);
      }
    }
  },
  watch: {
    menu1(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    resetForm() {
      this.member = {};
    },
    resetBdate() {
      this.menu1 = false;
      this.member.bdate = this.$store.getters.getMemberById(
        this.$route.params.id
      ).bdate;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    createMember() {
      this.isloading = true;

      const query = {
        query: `
            mutation {
          createMember (
            memberInput:{
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
      };

      axios
        .post("/api/", query, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.state.auth.token
          }
        })
        .then(async res => {
          await this.$store.dispatch("fetchMembers");

          return res;
        })
        .then(res => {
          if (res.status === 200) {
            this.$store.dispatch("toggleAlert", {
              class: "success",
              active: true,
              msg: "Exito! Miembro creado satisfactoriamente"
            });
          } else {
            this.$store.dispatch("toggleAlert", {
              class: "warning darken-2",
              active: true,
              msg: "Algo no anda bien aqui :("
            });
          }
          this.isloading = false;
          this.resetForm();
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    if (this.$store.state.members.length < 1) {
      this.$store.dispatch("relogin");
    }
  }
};
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
