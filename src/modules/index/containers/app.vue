<template lang="html">
  <div>
    <!-- HeaderComponent -->
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
  </div>
</template>

<script>
import '../../../common/css/base.css';
import '../css/app.css';
import flexible from '../../../common/utils/flexible';
import HeaderComponent from '../components/header/header.vue';
export default {
  components: {
    HeaderComponent
  },
  created() {
    flexible(750,750);
  }
}
</script>
