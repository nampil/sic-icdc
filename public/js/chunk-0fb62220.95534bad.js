(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fb62220"],{"4f37":function(t,s,r){"use strict";r("aa77")("trim",function(t){return function(){return t(this,3)}})},"6e89":function(t,s,r){},a55b:function(t,s,r){"use strict";r.r(s);var e=function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"login"},[r("v-container",[r("v-layout",[r("v-flex",{attrs:{xs12:"",sm6:"","offset-sm3":""}},[r("material-card",{staticClass:"text-xs-center",attrs:{color:"green",title:"Ingresar"}},[r("v-form",{ref:"form",on:{submit:function(s){return s.preventDefault(),t.submit(s)}}},[r("v-alert",{attrs:{value:t.hasErr,type:"error",transition:"scale-transition"}},[t._v(t._s(t.errMsg))]),r("v-text-field",{attrs:{rules:[t.rules.required],"prepend-icon":"mdi-account",required:"",label:"Email",autocapitalize:"none","validate-on-blur":""},model:{value:t.usuario,callback:function(s){t.usuario=s},expression:"usuario"}}),r("v-text-field",{attrs:{"append-icon":t.show1?"mdi-eye-off":"mdi-eye",type:t.show1?"text":"password",rules:[t.rules.required],"prepend-icon":"mdi-key",required:"",label:"Clave"},on:{"click:append":function(s){t.show1=!t.show1}},model:{value:t.password,callback:function(s){t.password=s},expression:"password"}}),r("v-btn",{staticClass:"ma-2",attrs:{color:"primary",type:"submit",small:""}},[t._v("Enviar")]),r("v-btn",{staticClass:"ma-2",attrs:{color:"tertiary",small:""},on:{click:t.clearForm}},[t._v("Cancelar")])],1),r("router-link",{attrs:{to:"/remember-pass"}},[t._v("Olvidó la clave?")])],1)],1)],1)],1)],1)},a=[],o=(r("7f7f"),r("4f37"),r("bc3a"),r("2f62"),{name:"Login",data:function(){return{usuario:"",password:"",show1:!1,rules:{required:function(t){return!!t||"Necesario."}},errMsg:"",hasErr:!1}},computed:{credentials:function(){var t={query:'\n                query {\n                    login(email: "'.concat(this.usuario,'", password: "').concat(this.password,'")\n                    {\n                        userId\n                        token\n                        tokenExpiration\n                        name\n                        role\n                    }\n                }\n            ')};return t}},methods:{clearForm:function(){this.usuario="",this.password="",this.hasErr=!1,this.errMsg="",this.$refs.form.reset()},submit:function(){var t=this;this.usuario&&this.password&&0!==this.usuario.trim().legth&&0!==this.password.trim().legth?(this.$store.commit("loading",!0),this.$store.dispatch("login",this.credentials).then(function(s){return 200===s.status||201===s.status?(t.$store.dispatch("startTime"),t.$router.push({name:"Escritorio"}),t.$store.dispatch("subscribeWebPush")):t.$store.dispatch("toggleAlert",{msg:"Hubo un problema. Error: ".concat(s.status," || ").concat(s.statusText),class:"warning",active:!0}),t.$store.commit("loading",!1),s}).then(function(s){t.$store.dispatch("toggleAlert",{msg:"Bienvenido ".concat(t.$store.state.auth.name),class:"success",active:!0})}).catch(function(t){return console.log(t)}),this.clearForm(),this.$store.commit("loading",!1)):(this.hasErr=!0,this.errMsg="Todos los campos son requeridos")}}}),i=o,n=(r("cb4f"),r("2877")),c=Object(n["a"])(i,e,a,!1,null,"3a4a5d4b",null);c.options.__file="Login.vue";s["default"]=c.exports},cb4f:function(t,s,r){"use strict";var e=r("6e89"),a=r.n(e);a.a}}]);
//# sourceMappingURL=chunk-0fb62220.95534bad.js.map