<template>
  <div class="register">
    <v-layout>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <material-card
          color="green"
          title="Registro"
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
              label="Usuario"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-email"
              v-model="email"
              required
              label="Email"
              :rules="[rules.required]"
              type="email"
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

export default {
  name: "register",
  data() {
    return {
      email: "",
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
                mutation {
                    createUser(userInput: {name: "${this.usuario}", email: "${
          this.email
        }", password: "${this.password}"}){
                        _id
                        email
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
      this.email = "";
      this.password = "";
      this.hasErr = false;
      this.errMsg = "";
      this.$refs.form.reset();
    },
    submit() {
      if (
        !this.usuario ||
        !this.email ||
        !this.password ||
        this.usuario.trim().legth === 0 ||
        this.password.trim().legth === 0 ||
        this.email.trim().legth === 0
      ) {
        this.hasErr = true;
        this.errMsg = "Todos los campos son requeridos";
      } else {
        axios
          .post("/api/", this.credentials, {
            headers: { "Content-Type": "application/json" }
          })
          .then(res => {
            if (res.status !== 200 && res.status !== 2001) {
              throw new Error("Failed!");
            }
            console.log(res.data.data.createUser.email);
          })
          .catch(err => console.log(err));
        this.clearForm();
      }
    }
  }
};
</script>
