<template lang="html">
  <div class="">
    <div class="goApp" @click="goApp" v-if="isApp">
      <img src="../../images/app@2x.png" alt="">
    </div>
    <div class="goHome" @click="goHome">
      <img src="../../images/home.png" alt="">
    </div>
  </div>
</template>

<script>
import './home.css'
export default {
  components: {

  },
  name: 'HomeComponent',
  data() {
    return {
      isApp: false
    }
  },
  props: {

  },
  computed: {

  },
  mounted() {

  },
  methods: {
    goHome (){
      if(this.$route.path == '/'){
        return;
      }
      this.$router.push('/?load=1');
    },
    goApp (){
      location.href = "kongfz://app.kongfz.com?page=home";
    },
    checkApp (){
      const userAgent = window.navigator.userAgent;
      if(userAgent.indexOf('ANDROID_KFZ_COM') != -1){
        this.$data.isApp = true;
        return true;
      }else if(userAgent.indexOf('IOS_KFZ_COM') != -1){
        this.$data.isApp = true;
        return true;
      }
    }
  },
  created() {
    this.checkApp();
  },
  watch: {

  }
}
</script>
