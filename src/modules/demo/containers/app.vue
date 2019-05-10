<template lang="html">
  <div id="app">
    <!-- HeaderComponent -->
    <HeaderComponent :title='titles' v-if="!miniprogram" :isBack='isBack'></HeaderComponent>
    <vue-progress-bar></vue-progress-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import '../../../common/css/base.css';
import '../css/app.css';
import flexible from '../../../common/utils/flexible';
import HeaderComponent from '../components/header/header.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    HeaderComponent
  },
  data() {
      return {
        miniprogram: false,
        isBack: false
      }
  },
  computed: {
    ...mapGetters({
      titles: 'titles'
    })
  },
  mounted() {

  },
  created(){
    flexible(750,750);
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    this.isminiprogram();
  },
  methods: {
    ...mapMutations({
      changeFrom: 'changeFrom'
    }),
    isminiprogram() {
      if(window.__wxjs_environment && window.__wxjs_environment === 'miniprogram'){
        this.$data.miniprogram = true;
      }else {
        this.$data.miniprogram = false;
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
    }
  }
}
</script>
