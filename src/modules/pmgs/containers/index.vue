<template lang="html">
  <div class="union">
    <!-- banner -->
    <div class="banner">
      <div class="action">-  AUCTION  UNION  -</div>
      <div class="title" id='top'>拍卖公司联盟</div>
    </div>
    <!-- pre_show -->
    <div class="pre_show">
      <div class="title">— 拍卖预展 —</div>
      <div class="list" v-for="(item,index) in previewList" :key="item.id">
        <router-link :to="'/company?comId='+item.comId+'&catId='+item.catId">
          <div class="img_box">
            <img v-lazy="item.img" alt="">
            <div class="tip">{{item.catName}}</div>
            <div class="bg"></div>
          </div>
          <div class="content">
            <div class="list_b" v-if="item.previewTime">
              <img src="../images/time.png" alt="">
              <div class="text">预展：{{item.previewTime}}</div>
            </div>
            <div class="list_b">
                <img src="../images/yl.png" alt="">
              <div class="text">{{item.previewAddr}}</div>
            </div>
            <div class="list_b" v-if="item.auctionTime">
              <img src="../images/bidding.png" alt="">
              <div class="text">拍卖：{{item.auctionTime}}</div>
            </div>
            <div class="list_b">
                <img src="../images/yl.png" alt="">
              <div class="text">{{item.auctionAddr}}</div>
            </div>
            <div class="line"></div>
          </div>
        </router-link>
        <div class="content">
          <div class="list_l" v-for="(items,i) in item.specialList" :key="items.speId">
            <router-link :to="'/special?speId='+items.speId">
              {{items.speName}}
            </router-link>
          </div>
          <div class="more">
            <router-link :to="'/auction?comId='+item.comId+'&catId='+item.catId">查看更多</router-link>
          </div>
        </div>
      </div>
      <div class="line_gray"></div>
      <div class="title">— 拍卖公司 —</div>
      <div class="inner">
        <div class="t">北京地区</div>
        <div class="logo_box">
          <div class="logo_list" v-for="(item,i) in comListBj" :key="i">
            <router-link :to="'/company?comId='+item.comId">
              <div class="img_box">
                <img v-lazy="logoUrl + item.comId + '.jpg'" alt="">
              </div>
              <div class="name">{{item.comName}}</div>
            </router-link>
          </div>
        </div>
        <div class="t">其他地区</div>
        <div class="logo_box">
          <div class="logo_list" v-for="(item,i) in comListOth" :key="i">
            <router-link :to="'/company?comId='+item.comId+'&catId='+item.catId">
              <div class="img_box">
                <img v-lazy="logoUrl + item.comId + '.jpg'" alt="">
              </div>
              <div class="name">{{item.comName}}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <loading v-if='!previewList'></loading>
  </div>
</template>
<script>
import '../css/index.css';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import loading from '../../../common/components/loading';
export default {
  components: {
    loading
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      previewList :'Index/previewList',        //拍卖预展
      comListBj :'Index/comListBj',            //北京地区
      comListOth :'Index/comListOth',          //其他地区
      logoUrl: "Index/logoUrl",
      recruitScrollY: "Index/recruitScrollY",
      froms: 'froms'
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      indexData: 'Index/indexData'
    }),
    ...mapMutations({
      changHeader: 'changHeader',
      changeRecruitScrollY: 'Index/changeRecruitScrollY'
    })
  },
  created() {
    if(this.$route.query.load){
      this.$router.replace(this.$route.fullPath.replace(/load=1/, ""));
    }
    this.changHeader({
      title:'拍卖公司联盟'
    });
    if(!this.$route.meta.keepAlive  || !this.previewList){
      this.changeRecruitScrollY(0);
      this.indexData();
    }else {
      this.$nextTick(() => {
        var t = setTimeout(() => {
          window.scrollTo(0,this.recruitScrollY);
          clearTimeout(t)
        }, 100)
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if(/company|special|auction/.test(from.name) && !to.query.load){
      to.meta.keepAlive=true;
      //判断是从哪个路由过来的，
    }else {
      to.meta.keepAlive=false;
    }
    next();
  },
  beforeRouteLeave(to, from, next){
    let position = window.scrollY  //记录离开页面的位置
    if (position == null) position = 0;
    this.changeRecruitScrollY(position);
    next();
  },
  watch: {

  }
}
</script>
