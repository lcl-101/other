<template lang="html">
  <div class="">
    <div class="details_box" v-if="details">
      <div class="title">{{details.helpTitle}}</div>
      <div class="inner">
        <DetailData :data="details.content"></DetailData>
      </div>
    </div>
    <loading v-else></loading>
  </div>
</template>

<script>
import '../css/detail.css';
import loading from '../../../common/components/loading';
import DetailData from '../components/detailData/detailData.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  components: {
    loading,
    DetailData
  },
  data() {
    return {
      params:''
    }
  },
  computed: {
    ...mapGetters({
      details:'Detail/details',
      proGress: 'Detail/proGress',
      titles: 'Detail/titles'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      catList: 'Detail/catList'
    }),
    ...mapMutations({
      clearList: 'Detail/clearList',
      changHeader: 'changHeader'
    }),
    getCatList() {
      this.catList({
        type: 'list',
        data: this.$data.params
      });
    },
    reReload() {
      this.$data.params = '?act=detail&contentId=' + this.$route.query.contentId + '&type=json';
      window.scrollTo(0,0);
      this.changHeader({
        title: '帮助详情'
      });
      document.title = '帮助详情';
      this.clearList();
      this.getCatList();
    },
    imgpre() {
      console.log(243)
    }
  },
  created() {
    this.reReload();
  },
  watch: {
    proGress:  function(val, oldVal){
      if(!val){
        this.$Progress.finish();
      }
    },
    // titles(val, oldVal) {
    //   this.changHeader({
    //     title: val
    //   });
    //   document.title = val;
    // },
    $route (to, from){
      this.reReload();
    }
  }
}
</script>
