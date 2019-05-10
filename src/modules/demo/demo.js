import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store/store";
import App from "./containers/app.vue";
import Router from "./router";
import VueProgressBar from 'vue-progressbar';

const options = {
  color: '#dd6969',
  failedColor: 'red',
  height: '2px'
}

Vue.use(VueProgressBar, options)

// 要告诉 vue 使用 vueRouter
Vue.use(vueRouter);

// 创建 router 实例，然后传 `routes` 配置
const router = new vueRouter({
  routes: Router
})

router.beforeEach((to, from, next) => {
  next();
})

let vm = new Vue({
  store,
  router,
  el: "#app",
  render: h => h(App)
})
