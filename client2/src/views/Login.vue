<template>
  <div class="login">
    <v-layout>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <material-card
          color="green"
          title="Ingresar"
          class="text-xs-center"
        >
          <v-form
            ref="form"
            v-on:submit.prevent="submit"
          >
            <v-alert
              :value="hasErr"
              type="error"
              transition="scale-transition"
            >
              {{errMsg}}
            </v-alert>

            <v-text-field
              prepend-icon="mdi-account"
              v-model="usuario"
              required
              label="Email"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-key"
              :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
              v-model="password"
              required
              label="Clave"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules.required]"
            ></v-text-field>
            <v-btn
              color="primary"
              class="ma-2"
              type="submit"
            >Enviar</v-btn>
            <v-btn
              color="primary"
              class="ma-2"
              @click="clearForm"
            >Cancelar</v-btn>
          </v-form>
        </material-card>

      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "login",
  data() {
    return {
      usuario: "",
      password: "",
      show1: false,
      rules: {
        required: value => !!value || "Necesario."
      },
      errMsg: "",
      hasErr: false
    };
  },
  computed: {
    
    credentials() {
      const authQuery = {
        query: `
                query {
                    login(email: "${this.usuario}", password: "${
          this.password
        }")
                    {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
      };
      return authQuery;
    }
  },
  methods: {
    clearForm() {
      this.usuario = "";
      this.password = "";
      this.hasErr = false;
      this.errMsg = "";
      this.$refs.form.reset();
    },
    submit() {
      if (
        !this.usuario ||
        !this.password ||
        this.usuario.trim().legth === 0 ||
        this.password.trim().legth === 0
      ) {
        this.hasErr = true;
        this.errMsg = "Todos los campos son requeridos";
      } else {
        this.$store
          .dispatch("login", this.credentials)
          .then(res => {
            this.$store.dispatch("startTime");
            this.$router.push({ name: "Escritorio" });
          })
          .catch(err => console.log(err));
        this.clearForm();
      }
    }
  }
};
</script>
