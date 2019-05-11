<template lang="html">
  <!-- header -->
  <div id="header" v-if="show">
    <div class="header" v-show="isTop">
      <div class="img" @click="back" v-if="!isApp && show">
        <img src="../../images/backb.png" alt="">
      </div>
      <div class="header_search" :class="isApp?'header_search_app':''">
        <router-link to="/search">
          <div class="pmgs_search">
            <img src="../../images/searchIn.png" alt="">
            <span>请输入拍品名称</span>
          </div>
        </router-link>
      </div>
      <!-- <div style="width: 100%;height: 1.88rem;position: absolute;left: 0;top: -1rem;background-image: linear-gradient(-180deg,#000,transparent);"></div> -->
    </div>
    <transition name="fade" appear>
      <div class="header bg_b" v-show="!isTop" :style="styleObject" v-if="!isApp && show">
        <div class="img" @click="back">
          <img src="../../images/backb.png" alt="">
        </div>
        <div class="text">{{title}}</div>
        <div class="img">
          <router-link to="/search">
            <img src="../../images/searchOut.png" alt="">
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import './header.css';
import { methods } from '../../../../common/utils/KfzJsBridge';
export default {
  components: {

  },
  name: 'HeaderComponent',
  data() {
    return {
      isTop: true,
      styleObject: {
        opacity: 1
      },
      version: 1,                //1是默认m站返回,3是app老框架返回,2是app新框架返回
      isApp: false
    }
  },
  props: {
    title: {
      type: String
    },
    show: {
      type: Boolean
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    handleScroll (e){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;   // 设备/屏幕高度
      let t = this.ScollPostion().top;
      if(t > 90){
        this.$data.isTop = false;
      }else {
        this.$data.styleObject = ' ';
        this.$data.isTop = true;
      }
    },
    ScollPostion (){
      var t, l, w, h;
      if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
      } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
      }
      return {
        top: t,
        left: l,
        width: w,
        height: h
      };
    },
    back() {
      this.$router.go(-1);
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
      if(userAgent.indexOf('ANDROID_KFZ_COM') != -1){
        this.$data.isApp = true;
        return;
        const version = userAgent.split('ANDROID_KFZ_COM_')[1].split('_')[0];
        const av= this.cpr_version(version,'2.0.38');
        this.isNewRoler(av);
      }else if(userAgent.indexOf('IOS_KFZ_COM') != -1){
        this.$data.isApp = true;
        return;
        const version = userAgent.split('IOS_KFZ_COM_')[1].split('_')[0];
        const iosv = this.cpr_version(version,'2.1.0');
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
    window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    this.checkAppVersion()
  },
  watch: {

  }
}
</script>
