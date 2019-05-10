<template lang="html">
  <div id="header">
    <div class="header">
      <div class="back" @click="back" v-if="isBacks"><img src="../../images/btn_back.png" alt=""></div>
      <div class="title" v-html="title">{{title}}</div>
    </div>
    <div style="width: 100%;height: 0.88rem;"></div>
  </div>
</template>

<script>
import './header.css';
import { methods } from '../../../../../src/common/utils/KfzJsBridge';
export default {
  components: {

  },
  name: 'HeaderComponent',
  data() {
    return {
      isBacks: this.isBack,
      version: 1                //1是默认m站返回,3是app老框架返回,2是app新框架返回
    }
  },
  props: {
    title: {
      type: String
    },
    isBack: {
      type: Boolean
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    back (){
      this.checkAppVersion();
      if(this.$route.query.indexUrl){
        switch (this.$data.version) {
          case 1:
            this.$router.go(-1);
            break;
          case 2:
            methods.goBack();
            break;
          case 3:
            location.href = "kongfz://app.kongfz.com/back";
            break;
          default:
        }
      }else {
        this.$router.go(-1);
      }
    },
    //版本检测
    toNum (a){
      var a=a.toString();
      //也可以这样写 var c=a.split(/\./);
      var c=a.split('.');
      return c;
    },
    cpr_version (a,b){
      var _a=this.toNum(a),_b=this.toNum(b),_c=0;
      if(_a.length > _b.length){_c=_a.length}else {_c=_b.length}
      for(var i=0;i<_c;i++){
        if(+_a[i] > +_b[i]){
          return true;
        }
      }
      return false;
    },
    checkAppVersion (){
      const userAgent = window.navigator.userAgent;
      if(userAgent.indexOf('ANDROID') != -1){
        const version = userAgent.split('ANDROID_KFZ_COM_')[1].split('_')[0];
        const av= this.cpr_version(version,'2.1.1');
        this.$data.isBacks = true;
        this.isNewRoler(av);
      }else if(userAgent.indexOf('IOS') != -1){
        const version = userAgent.split('IOS_KFZ_COM_')[1].split('_')[0];
        const iosv = this.cpr_version(version,'2.1.0');
        this.$data.isBacks = true;
        this.isNewRoler(iosv);
      }
    },
    isNewRoler (v){
      if(v){
        this.$data.version = 2;
      }else {
        this.$data.version = 3;
      }
    }
  },
  created() {

  },
  watch: {
    isBack (val, oldVal){
      this.$data.isBacks = val;
    }
  }
}
</script>
