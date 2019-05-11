<template lang="html">
  <div id="app">
    <!-- HeaderComponent -->
    <HeaderComponent :title='titles' :show='isHeader'></HeaderComponent>
    <HomeComponent></HomeComponent>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view><!-- 这里是会被缓存的视图组件 --></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"><!-- 这里是不被缓存的视图组件 --></router-view>
  </div>
</template>

<script>
import '../../../common/css/base.css';
import '../css/app.css';
import flexible from '../../../common/utils/flexible';
import HeaderComponent from '../components/header/header.vue';
import HomeComponent from '../components/home/home.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    HeaderComponent,
    HomeComponent
  },
  data() {
    return {
      miniprogram: false,
      isBack: false,
      isHeader: true
    }
  },
  computed: {
    ...mapGetters({
      titles: 'titles'
    })
  },
  created(){
    flexible(750,750);
  },
  methods: {
    ...mapMutations({
      changeFrom: 'changeFrom'
    }),
    //是否显示头部
    isShowHeader(data) {
      if(/\/search|\/list/.test(data)){
        this.$data.isHeader = false;
      }else {
        this.$data.isHeader = true;
      }
    }
  },
  watch: {
    $route (to, from){
      if(this.$route.query.goindex === 'true'){
        if(window.navigator.userAgent.indexOf('KFZ_COM') != -1){
          this.$data.isBack = true;
        }else {
          this.$data.isBack = false;
        }
      }else {
        this.$data.isBack = true;
      }
      if(window.history.length <= 1) {
        if(window.navigator.userAgent.indexOf('KFZ_COM') != -1){
          this.$data.isBack = true;
        }else {
          this.$data.isBack = false;
        }
        if (location.href.indexOf('?') === -1) {
          window.location.href = location.href + '?goindex=true&indexUrl='+to.path;
        } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
          window.location.href = location.href + '&goindex=true&indexUrl='+to.path;
        }
        this.$data.path = to.path;
      }
      this.changeFrom({
        data: from.path
      })
      this.isShowHeader(to.path);
    }
  }
}
</script>
