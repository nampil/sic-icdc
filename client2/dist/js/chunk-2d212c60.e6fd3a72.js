(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d212c60"],{aa9c:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{sm6:"",xs12:"",md6:"",lg3:""}},[n("events-TotalEvents")],1),n("v-flex",{attrs:{xs12:""}},[n("n-calendar",{attrs:{attributes:t.attrs,"is-linked":"","is-expanded":""}})],1),n("v-flex",{attrs:{xs12:""}},[n("events-EventsTable")],1)],1)],1)},r=[],o=(n("28a5"),n("768b")),s=n("cebc"),i=n("2f62"),l={name:"Events",data:function(){return{}},computed:Object(s["a"])({attrs:function(){var t=this;return this.rowEvents.map(function(e){return{key:"event.".concat(e._id),highlight:{backgroundColor:t.getColor(e._id)},contentStyle:{color:"#fafafa"},popover:{label:e.title},dates:[{start:new Date(new Date(e.eventDate).getFullYear(),new Date(e.eventDate).getMonth(),new Date(e.eventDate).getDate()),end:new Date(new Date(e.endDate).getFullYear(),new Date(e.endDate).getMonth(),new Date(e.endDate).getDate())}]}})}},Object(i["b"])({rowEvents:"getEvents"}),{events:function(){var t=this;return this.rowEvents.map(function(e){return Object(s["a"])({},e,{eventDate:t.formatDate(new Date(e.eventDate).toISOString().substr(0,10)),eventTime:new Date(e.eventDate).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})})}}),methods:{getColor:function(t){var e=this.events.filter(function(e){return e._id===t})[0];console.log(e);var n=this.$store.getters.getAreaScope.filter(function(t){return t.title===e.orgScope})[0];return console.log(),n.color},formatDate:function(t){var e=t.split("-"),n=Object(o["a"])(e,3),a=n[0],r=n[1],s=n[2],i="".concat(s,"/").concat(r,"/").concat(a);return i}}},c=l,u=n("2877"),v=Object(u["a"])(c,a,r,!1,null,null,null);v.options.__file="Events.vue";e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d212c60.e6fd3a72.js.map