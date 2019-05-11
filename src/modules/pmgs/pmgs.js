import Vue from "vue";
import vueRouter from "vue-router";
import store from "./store/store";
import App from "./containers/app.vue";
import Router from "./router";
import VueLazyload from 'vue-lazyload'  //懒加载插件
import error from './images/error.png';
import loading from './images/loading.gif';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import preview from 'vue-photo-preview'
import './css/skin.css';

//大图预览
Vue.use(preview)

Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 要告诉 vue 使用 vueRouter
Vue.use(vueRouter);

//添加VueLazyload 选项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: error,
  adapter: {
    loading (listender, Init) {
      listender.el.style.objectFit = 'contain';
      listender.el.style.width = '50%';
    },
    error (listender, Init) {
      listender.el.style.objectFit = 'contain';
      listender.el.style.width = '50%';
    },
    loaded (listender, Init){
      listender.el.style.objectFit = 'cover';
      listender.el.style.width = '100%';
    }
  },
  attempt: 1
})

// 创建 router 实例，然后传 `routes` 配置
const router = new vueRouter({
  routes: Router
})

let vm = new Vue({
  store,
  router,
  el: "#app",
  render: h => h(App)
})
