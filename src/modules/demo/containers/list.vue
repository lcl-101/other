<template lang="html">
  <div class="">
    <div id="list_box" v-if="list && list != 'noData'">
      <router-link class="list" v-for="(item,index) in list" :key="index" :to="'/detail?'+item.queryString">
        <div class="item">
          <div class="" v-html="item.helpTitle">{{item.helpTitle}}</div>
          <div class=""><img src="../images/more.png" alt=""></div>
        </div>
      </router-link>
    </div>
    <div class="nodata" v-if="list == 'noData' && !proGress">暂无数据</div>
    <loading v-if="!list"></loading>
  </div>
</template>

<script>
import '../css/list.css';
import loading from '../../../common/components/loading';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  components: {
    loading
  },
  data() {
    return {
      params:'',
      isSlide: true
    }
  },
  computed: {
    ...mapGetters({
      list:'List/allList',
      proGress: 'List/proGress',
      froms: 'froms',
      titles: 'List/titles'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      catList: 'List/catList'
    }),
    ...mapMutations({
      clearList: 'List/clearList',
      changHeader: 'changHeader'
    }),
    getCatList() {
      this.catList({
        type: 'list',
        data: this.$data.params
      });
    }
  },
  created() {
    let title = "";
    if(this.$route.query.helpTitle){
      this.$data.params = '?act=list&helpTitle=' + this.$route.query.helpTitle + '&type=json';
    }else {
      this.$data.params = '?act=list&catId=' + this.$route.query.catId + '&type=json';
    }
    if(this.$route.query.helpTitle){
      title = this.$route.query.helpTitle;
    }else {
      title = this.$route.query.catName?this.$route.query.catName:'帮助中心'
    }
    this.changHeader({
      title: title
    });
    document.title = title;
    window.scrollTo(0,0);
    if(this.froms.indexOf('detail') != -1 && this.list){
      this.$data.isSlide = false;
      this.$Progress.finish();
      return;
    }
    this.clearList();
    this.getCatList();
  },
  watch: {
    proGress:  function(val, oldVal){
      if(!val){
        this.$Progress.finish();
      }
    },
    //titles(val, oldVal) {
      // this.changHeader({
      //   title: val?val:'帮助中心'
      // });
      // document.title = val?val:'帮助中心';
      // this.$data.title = val?val:'帮助中心';
    //}
  }
}
</script>
