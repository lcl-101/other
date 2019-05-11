import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store/store";
import App from "./containers/app.vue";

// 要告诉 vue 使用 vueRouter
Vue.use(vueRouter);

let vm = new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
