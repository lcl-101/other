<template lang="html">
  <div class="app">
    <!-- search_box -->
    <div class="search_box">
      <div class="inner">
        <div class="input_box">
          <input type="text" placeholder="有问题？点这里搜一搜~" name="" v-model.trim="searchData" @keyup.enter="searchTo">
          <img src="../images/search@2x.png" alt="">
        </div>
        <div class="btn" @click="search"><span>搜索</span></div>
      </div>
    </div>
    <!-- list_box -->
    <div class="list_box" v-for="(item,index) in list" :key="item.id" :style="{'border-left-color': colorBorder[index] }">
      <div class="left" v-if="item.childList" :style="{'color': color[index] }">{{item.catName}}</div>
      <router-link class="left single" v-else :style="{'color': color[index] }" :to="'/list?'+item.queryString+'&catName='+item.catName">{{item.catName}}</router-link>
      <div class="right" v-if="item.childList && item.childList.length <= 2">
        <router-link class="link" v-for="(items,i) in item.childList" :key="i" :to="'/list?'+items.queryString+'&catName='+items.catName">{{items.catName}}</router-link>
      </div>
      <div class="rights" v-else>
        <router-link class="link" v-for="(items,i) in item.childList" :key="i" :to="'/list?'+items.queryString+'&catName='+items.catName">{{items.catName}}</router-link>
      </div>
    </div>
    <loading v-if='!list'></loading>
  </div>
</template>

<script>
import '../css/index.css';
import loading from '../../../common/components/loading';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
  components: {
    loading
  },
  data() {
      return {
        color: ['#aa5757','#329687','#7f961a','#834f19','#468a1d','#188f93','#25569c','#2b1cac','#a91889'],
        colorBorder: ['#dd6969','#2fc9b2','#b5d144','#ce8b47','#83c55c','#47c6cb','#4b86da','#7e72e7','#de53c0'],
        searchData: ''
      }
  },
  computed: {
    ...mapGetters({
      list:'Index/catAll',
      proGress: 'Index/proGress',
      froms: 'froms'
    })
  },
  mounted() {
    if(this.list){
      this.$Progress.finish();
    }
  },
  methods: {
    ...mapActions({
      catList: 'Index/catList'
    }),
    ...mapMutations({
      changHeader: 'changHeader'
    }),
    getCatList() {
      this.catList({
        type: "index",
        data: '?act=cat&type=json'
      });
    },
    searchTo(e) {
      if(e.keyCode === 13){
        this.search();
      }
    },
    search() {
      if(this.$data.searchData){
        this.$router.push('/list?act=list&helpTitle=' + this.$data.searchData + '&type=json');
      }
    }
  },
  created() {
    this.changHeader({
      title:'帮助中心'
    });
    document.title = '帮助中心';
    window.scrollTo(0,0);
    if(this.froms.indexOf('list') != -1 && this.list){
      this.$Progress.finish();
      return;
    }
    this.getCatList();
  },
  watch: {
    proGress (val, oldVal){
      if(!val){
        this.$Progress.finish();
      }
    }
  }
}
</script>
